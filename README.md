# DB Travel Post-Purchase Journey Helper

An independent product prototype showing how a travel platform can help a traveller after booking, especially when a Deutsche Bahn disruption breaks an onward connection.

It combines journey context, live DB timetable evidence, passenger-policy sources, fixed calculations and bounded conversational AI patterns. It does not represent an official Deutsche Bahn product and does not change a carrier booking.

## The problem

A booking confirmation does not mean the customer’s problem is finished. During disruption, the traveller must quickly work out:

- what changed;
- whether the rest of a multi-leg journey still works;
- whether the ticket remains usable;
- which alternatives are realistic; and
- when human support is necessary.

Carrier information is often distributed across operational feeds, booking details and policy pages. A stressed traveller must assemble that context while time is running out. Traditional support usually begins only after the customer searches for help and repeats the journey details.

## Why proactive post-purchase support

The product monitors the booked journey and responds when verified evidence crosses a defined decision threshold. In the missed-connection example, DB publishes an expected Munich arrival of 13:52 while the booked onward train leaves at 13:18. A fixed calculation confirms the connection cannot be made. The experience then explains the situation, presents an available journey for review and keeps the traveller in control.

This approach can reduce:

- time spent discovering and explaining a disruption;
- avoidable support contacts and repeated conversations;
- uncertainty caused by disconnected sources; and
- unsupported claims about tickets, seats, money or carrier actions.

Cases that lack fresh data, policy evidence or a suitable alternative are monitored or passed to human support with the journey context attached.

## Company value

Post-purchase disruption is a moment when the customer tests whether the platform remains useful after receiving booking revenue. A clear and reliable response can protect trust, improve the chance of another booking and reduce support effort.

The prototype models value through:

- verified resolution without repeat support;
- faster time to a clear next step;
- lower human-support volume through early resolution;
- complete handoffs for cases that need human judgement;
- cost per verified resolution; and
- guardrails for unsupported or stale claims.

## What the prototype demonstrates

- A post-purchase scenario player covering normal travel, disruptions and traveller requests.
- A Berlin–Munich–Salzburg missed-connection deep dive.
- Live DB Timetables API inspection through a server-side adapter.
- Versioned DB policy evidence used for grounded answers.
- Fixed logic for time-sensitive decisions and LLM-shaped interaction where interpretation is useful.
- Customer consent before the displayed journey is updated.
- Failure handling for stale data, unavailable alternatives and unsupported questions.
- Product evaluation, journey metrics, traceability and an adjustable cost funnel.
- Email/password and Google authentication through Firebase.

Agent decisions, the disrupted booking and carrier actions are simulated. The live DB panel displays real station-level operational data, but it is not presented as evidence for the simulated missed connection.

## Run locally

1. Copy `.env.example` to `.env`.
2. Add the DB credentials described below.
3. Run `node server.cjs`.
4. Open [http://localhost:4173](http://localhost:4173).

No package installation or build step is required. Real authentication and live API calls require internet access.

## Required credentials

Create an application in the DB API Marketplace and subscribe it to the **Timetables** product:

```env
DB_CLIENT_ID=your_db_client_id
DB_API_KEY=your_db_api_key
```

The browser never receives these values. The local `.env` file is excluded from Git.

Firebase’s public browser configuration is already present in `index.html`. Email/password and Google authentication must remain enabled in the Firebase project, and each deployed hostname must be added to Firebase Authorized Domains. No Firebase administrator key or Google client secret is stored in this repository.

## Implementation

- `index.html`: authentication and account creation.
- `app.html`: post-purchase scenarios, missed-connection deep dive and product-system views.
- `home.html`: flight, train and bus comparison entry page.
- `server.cjs`: static server, DB adapter and policy endpoints.
- `sources/`: saved policy evidence and its versioned manifest.

The server converts DB’s station-centric XML into bounded JSON fields, timestamps responses, caches planned data for one hour and current changes for 30 seconds, and returns controlled errors.

## Validation completed

- Google sign-in, session restoration and sign-out.
- Empty and malformed input handling, password visibility and Enter submission.
- Responsive account creation at approximately 390 px.
- Scenario navigation and contextual missed-connection chat.
- Live DB adapter responses and controlled API failures.
- Interactive economics calculations.
- JavaScript syntax and normal browser use without console errors.

Verification-email and password-reset delivery still require end-to-end testing with a real inbox. A production backend would also need to verify Firebase ID tokens and enforce authorization independently.
