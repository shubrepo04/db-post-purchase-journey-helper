'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const DB_BASE = 'https://apis.deutschebahn.com/db-api-marketplace/apis/timetables/v1';
const responseCache = new Map();

function loadLocalEnv() {
  const file = path.join(__dirname, '.env');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}
loadLocalEnv();

function sendJson(response, status, value, method = 'GET') {
  const body = JSON.stringify(value);
  response.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
  response.end(method === 'HEAD' ? undefined : body);
}
function attributes(text) {
  const result = {};
  for (const match of text.matchAll(/([a-z][a-z0-9]*)="([^"]*)"/gi)) result[match[1]] = match[2];
  return result;
}
function parseStations(xml) {
  return [...xml.matchAll(/<station\b([^>]*)\/?\s*>/gi)].map(match => {
    const item = attributes(match[1]);
    return {name:item.name||'',eva:item.eva||'',ds100:item.ds100||''};
  }).filter(item => item.eva);
}
function parseTimetable(xml) {
  const stops = [];
  for (const match of xml.matchAll(/<s\b([^>]*)>([\s\S]*?)<\/s>/gi)) {
    const root = attributes(match[1]), body = match[2];
    const trainMatch = body.match(/<tl\b([^>]*)\/?\s*>/i);
    const train = trainMatch ? attributes(trainMatch[1]) : {};
    for (const eventMatch of body.matchAll(/<(ar|dp)\b([^>]*)[\s\S]*?<\/\1>/gi)) {
      const event = attributes(eventMatch[2]);
      stops.push({id:root.id||'',type:eventMatch[1].toLowerCase()==='ar'?'arrival':'departure',train:[train.c,train.n].filter(Boolean).join(' '),plannedTime:event.pt||null,changedTime:event.ct||null,plannedPlatform:event.pp||null,changedPlatform:event.cp||null,cancelled:event.cs==='c',plannedPath:event.ppth?event.ppth.split('|'):[],changedPath:event.cpth?event.cpth.split('|'):[],changedAt:event.clt||null});
    }
  }
  return stops;
}
function mergeTimetable(planned, changes) {
  const changedByKey = new Map(changes.map(item => [item.id+'|'+item.type, item]));
  return planned.map(item => ({...item,...changedByKey.get(item.id+'|'+item.type),train:item.train,plannedTime:item.plannedTime,plannedPlatform:item.plannedPlatform,plannedPath:item.plannedPath}));
}
async function fetchDb(resource, cacheSeconds = 30) {
  const cached = responseCache.get(resource);
  if (cached && cached.expires > Date.now()) return cached.value;
  if (!process.env.DB_CLIENT_ID || !process.env.DB_API_KEY) throw Object.assign(new Error('DB credentials are not configured.'), {code:'DB_NOT_CONFIGURED'});
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const result = await fetch(DB_BASE + resource, {headers:{'DB-Client-ID':process.env.DB_CLIENT_ID,'DB-Api-Key':process.env.DB_API_KEY,'Accept':'application/xml'},signal:controller.signal});
    if (!result.ok) {
      const message = result.status === 403
        ? 'DB rejected this application. Confirm that the application is subscribed to the Timetables usage plan and that both credentials belong to it.'
        : 'DB API returned '+result.status;
      throw Object.assign(new Error(message), {status:result.status});
    }
    const value = await result.text();
    responseCache.set(resource, {value,expires:Date.now()+cacheSeconds*1000});
    return value;
  } finally { clearTimeout(timeout); }
}
async function handleApi(request, response, url) {
  if (url.pathname === '/api/db/status') {
    const configured = Boolean(process.env.DB_CLIENT_ID && process.env.DB_API_KEY);
    sendJson(response, 200, {configured,provider:'DB Timetables API',mode:configured?'credentials-configured':'configuration-required',checkedAt:new Date().toISOString()}, request.method);
    return true;
  }
  if (url.pathname === '/api/db/stations') {
    const query=(url.searchParams.get('q')||'').trim();
    if (!query || query.length>80) { sendJson(response,400,{error:'Enter a station query.'},request.method); return true; }
    try { const xml=await fetchDb('/station/'+encodeURIComponent(query),300); sendJson(response,200,{source:'DB Timetables API',retrievedAt:new Date().toISOString(),stations:parseStations(xml)},request.method); }
    catch(error){ sendJson(response,error.code==='DB_NOT_CONFIGURED'?503:(error.status||502),{error:error.code||'DB_API_ERROR',message:error.message},request.method); }
    return true;
  }
  if (url.pathname === '/api/db/timetable') {
    const eva=url.searchParams.get('eva')||'', date=url.searchParams.get('date')||'', hour=url.searchParams.get('hour')||'';
    if (!/^\d{7}$/.test(eva)||!/^\d{6}$/.test(date)||!/^\d{2}$/.test(hour)) { sendJson(response,400,{error:'eva, date (YYMMDD), and hour (HH) are required.'},request.method); return true; }
    try {
      const [plan,changes]=await Promise.all([fetchDb('/plan/'+eva+'/'+date+'/'+hour,3600),fetchDb('/fchg/'+eva,30)]);
      const plannedStops=parseTimetable(plan), changedStops=parseTimetable(changes);
      sendJson(response,200,{source:'DB Timetables API',stationEva:eva,retrievedAt:new Date().toISOString(),freshForSeconds:30,planned:plannedStops,changes:changedStops,records:mergeTimetable(plannedStops,changedStops)},request.method);
    } catch(error){ sendJson(response,error.code==='DB_NOT_CONFIGURED'?503:(error.status||502),{error:error.code||'DB_API_ERROR',message:error.message},request.method); }
    return true;
  }
  if (url.pathname === '/api/grounding/policies') {
    fs.readFile(path.join(__dirname,'sources','policy-manifest.json'),'utf8',(error,content)=>{
      if(error){sendJson(response,500,{error:'POLICY_MANIFEST_UNAVAILABLE'},request.method);return}
      response.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
      response.end(request.method==='HEAD'?undefined:content);
    });
    return true;
  }
  return false;
}
const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, 'http://localhost:4173');
  const route = requestUrl.pathname;
  if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405, {Allow:'GET, HEAD'}); response.end(); return; }
  if (route === '/favicon.ico') { response.writeHead(204); response.end(); return; }
  if (route === '/journey-train.png') {
    fs.readFile(path.join(__dirname, 'journey-train.png'), (error, image) => {
      if (error) { response.writeHead(404); response.end('Not found'); return; }
      response.writeHead(200, {'Content-Type':'image/png','Cache-Control':'public, max-age=3600','X-Content-Type-Options':'nosniff'});
      response.end(request.method === 'HEAD' ? undefined : image);
    });
    return;
  }
  if (route.startsWith('/api/')) { handleApi(request,response,requestUrl).then(handled=>{if(!handled)sendJson(response,404,{error:'Not found'},request.method)}).catch(()=>sendJson(response,500,{error:'Unexpected API error'},request.method)); return; }
  if (route.startsWith('/sources/')) {
    const name = path.basename(decodeURIComponent(route));
    if (!/^[A-Za-z0-9._-]+\.pdf$/.test(name)) { response.writeHead(404); response.end('Not found'); return; }
    fs.readFile(path.join(__dirname, 'sources', name), (error, pdf) => {
      if (error) { response.writeHead(404); response.end('Not found'); return; }
      response.writeHead(200, {'Content-Type':'application/pdf','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
      response.end(request.method === 'HEAD' ? undefined : pdf);
    });
    return;
  }
  const pages = {'/':'index.html','/index.html':'index.html','/app':'app.html','/app.html':'app.html','/home':'home.html','/home.html':'home.html'};
  const page = pages[route];
  if (!page) { response.writeHead(404); response.end('Not found'); return; }
  fs.readFile(path.join(__dirname, page), (error, content) => {
    if (error) { response.writeHead(500); response.end('The page could not be loaded.'); return; }
    response.writeHead(200, {
      'Content-Type':'text/html; charset=utf-8', 'Cache-Control':'no-store',
      'X-Content-Type-Options':'nosniff', 'Referrer-Policy':'strict-origin-when-cross-origin',
      'Cross-Origin-Opener-Policy':'same-origin-allow-popups'
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  });
});
server.on('error', error => { console.error(error.code === 'EADDRINUSE' ? 'Port 4173 is already in use. Stop the other server before starting roamwell.' : 'Unable to start the local server.'); process.exitCode = 1; });
server.listen(4173, '127.0.0.1', () => console.log('roamwell is ready at http://localhost:4173'));

