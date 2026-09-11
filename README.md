# roamwell account access

## Open the page

Run `node server.cjs` from this folder, then open http://localhost:4173.
Node.js is already installed on this computer. No npm install or build step is needed.
Keep the server running while using the page. Stop it with Ctrl+C.

### Deutsche Bahn timetable integration

The browser never receives DB credentials. Copy `.env.example` to `.env`, add `DB_CLIENT_ID` and `DB_API_KEY` from the DB API Marketplace, and restart the local server.

The server provides configuration status, station lookup, planned timetable plus current DB changes, and a versioned policy manifest under `/api/`.

The Timetables API returns station-centric XML. The server translates it to named JSON fields, timestamps every result, caches plans for one hour and live changes for 30 seconds, and returns bounded errors to the browser. The missed-connection delay remains a controlled prototype scenario until a real matching disrupted journey is available; live data must never be presented as proof of the simulated delay.

`index.html` contains all page HTML, CSS and application JavaScript. Real authentication loads the pinned Firebase SDK from Google's CDN and requires internet access. Opening the HTML with a file:// URL does not support real Google sign-in.

## Firebase configuration

- Project: roamwell (`roamwell-8972d`), on the Spark plan.
- Web app: roamwell web.
- Email/password and Google providers enabled.
- Public authentication name: roamwell.
- Localhost is an authorized authentication domain.
- Minimum password length: 8, enforced by Firebase.
- Optional Analytics and Gemini were disabled during project creation.
- No booking features, travel APIs, database, or paid plan was configured.

Console: https://console.firebase.google.com/project/roamwell-8972d/authentication/providers

The public Firebase configuration in index.html is intended for browser clients. There are no admin credentials or Google client secrets in this folder.

## Account behavior

Create an account with your name, email and password. Firebase sends a verification email. Open its link and return to the page to select "I've verified my email". Unverified accounts cannot reach the success view. Google accounts use Google's verified email.

Forgot password sends a Firebase recovery email. The recovery and verification links use Firebase's hosted action handler. Email delivery and completing those links still need an inbox test with your own account.

Remember me uses Firebase local persistence; otherwise the session is limited to this browser tab. Sign out ends the Firebase session. Passwords are never written to browser storage by the page. The former prototype credentials and profile-only session do not authenticate users.

After a verified sign-in, `/app` opens the second screen: a responsive post-booking scenario player. Its left rail contains thirteen simulated customer journeys covering the happy path, platform and seat changes, delays, carrier cancellation, missed connections, strikes, replacement trains, ticket recovery, customer-requested changes, customer-requested cancellation and refund tracking. Selecting a scenario changes the customer-facing alert, trip status, journey timeline and available actions. Carrier actions remain simulated. If a backend is added later, it must independently verify Firebase ID tokens and enforce authorization; hiding a browser view is not access control for a backend.

## Validation performed

- Real Google sign-in succeeded with the project owner's signed-in Google account.
- Refresh restored that session; sign-out and another refresh returned to sign-in.
- Former prototype credentials were rejected by live Firebase authentication.
- Empty and malformed fields, password visibility, Enter submission and pending controls checked in the browser.
- Account creation page checked at 390px with no horizontal overflow.
- No browser console errors were observed.
- Isolated JavaScript tests covered short/mismatched passwords, signup, duplicate submissions, verification gating, password clearing, remembered persistence selection, sign-out and network-error recovery using a mocked Firebase SDK.
- A live temporary email/password account test was not run because network permission was declined. Verification and reset email delivery have not been tested.

