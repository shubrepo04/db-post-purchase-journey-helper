# Roamwell presentation and interview guide

## The core story

**Thesis:** Post-purchase disruption is a high-value traveller problem because uncertainty is urgent, journey-specific and costly to resolve incorrectly. Roamwell turns booking context, live operations and policy evidence into understandable alternatives while preserving traveller control.

**Portfolio choice:** The prototype covers many post-purchase scenarios. Missed connection is the deep dive because it combines high customer stress, live-data dependency, policy interpretation, constrained alternatives, financial risk and a clear human fallback.

**Product boundary:** A fixed formula determines connection feasibility. A bounded agent retrieves missing evidence, checks policy and compares usable alternatives. It cannot change the monitored journey without explicit traveller consent.

## Product strategy: why post-purchase matters

### The strategic role

Search and booking create a transaction. Post-purchase determines whether the traveller trusts the platform with the next complex journey. That matters most when the original plan breaks: the carrier may cause the disruption, but the customer judges the platform through which they bought and manage the trip.

Roamwell should become the trusted orchestration layer across fragmented carriers. Its advantage is not operating trains. It is combining the customer's complete booking context with carrier operations, policies and customer preferences, then turning those inputs into a clear next step.

### The company flywheel

1. More reassurance after purchase reduces uncertainty and avoidable support contact.
2. Better disruption resolution increases trust in booking connecting and cross-carrier journeys.
3. Greater trust improves repeat booking and willingness to choose higher-value itineraries.
4. More managed journeys create better outcome and failure data.
5. Better data improves journey detection, alternative quality and portfolio prioritisation.
6. Stronger outcomes improve customer retention and give carrier partners clearer operational feedback.

The long-term asset is a structured understanding of what happened after booking: which disruption occurred, which evidence was available, what action was possible, what the traveller chose and whether the journey was ultimately completed.

### Who benefits

| Stakeholder | Benefit | Measure |
|---|---|---|
| Traveller | Less uncertainty and effort during disruption | Time to confidence, resolved journey, later support contact |
| Company | Higher trust and lower avoidable service cost | Repeat booking, containment, cost per resolution |
| Support | Better context and fewer repetitive investigations | Handling time, transfer completeness, repeat contact |
| Carrier partner | Clearer issue classification and fewer misdirected contacts | Carrier handoff quality, data mismatch rate |
| Product teams | Reusable booking, policy, evaluation and consent capabilities | Time to launch the next post-purchase use case |

### Portfolio strategy

Prioritise each problem using five dimensions:

- Prevalence: how often the problem occurs.
- Severity: time pressure, financial exposure and risk of being stranded.
- Controllability: whether the product can produce a materially better outcome.
- Evidence readiness: whether booking, operational and policy inputs are available and reliable.
- Action risk: the harm caused by a wrong answer or unwanted action.

Start with explain-and-monitor experiences because they create value and learning with limited action risk. Expand to reversible actions after journey binding and consent controls are proven. Introduce consequential automation only when exact-service data, policy coverage, evaluation and operational ownership meet the release bar.

### Agent strategy

Use one bounded orchestrator with explicit tools and gates rather than a collection of autonomous personalities:

| Layer | Responsibility | Why it belongs there |
|---|---|---|
| Deterministic services | Identity matching, time arithmetic, freshness and consent state | Repeatable, testable and auditable |
| Retrieval and tools | Booking, live operations, alternatives and versioned policy | Provides current and journey-specific evidence |
| Agent reasoning | Determine missing evidence, reconcile context and explain viable choices | Handles variable, incomplete and conflicting context |
| Product controls | Claim limits, alternative-quality gates and escalation | Defines acceptable customer and business risk |
| Human operations | Resolve unsupported, high-risk and ambiguous cases | Preserves service when automation reaches its boundary |

The agent should optimize for successful journey resolution, not conversation completion. A short answer that safely routes an unclear case is better than a fluent answer built on weak evidence.

## Executive narrative

> Travel marketplaces have largely optimized discovery and booking, but the customer's relationship with the platform is tested after payment. A booking confirmation is not the final outcome; arrival at the destination is. During disruption, the traveller must combine fragmented carrier updates, ticket conditions, passenger rights and practical alternatives while under time pressure.
>
> My product thesis is that a multi-carrier platform can create durable value by becoming the trusted post-purchase orchestration layer. It already knows the full itinerary and commercial context. By combining that context with live carrier data and grounded policy, it can reduce uncertainty, preserve customer control and help complete the journey.
>
> I treated this as a portfolio rather than a chatbot feature. I mapped the major post-purchase states and selected missed connection for the deep dive because it combines severe customer anxiety, cross-leg reasoning, live-data dependency, policy risk and a measurable operational outcome.
>
> The architecture separates responsibilities. A deterministic service decides whether the transfer still works. A bounded agent identifies missing evidence, retrieves the correct sources and compares realistic alternatives. Product guardrails reject stale evidence, poor alternatives and unsupported money claims. Nothing consequential happens without consent, and ambiguous cases arrive in human support with the journey context attached.
>
> I would launch progressively. First, validate the workflow on historical journeys. Then run it in shadow mode and support-assist mode. Customer-facing explain-and-monitor follows only after the real-journey evaluation bar is met. More consequential actions remain off until exact journey binding, policy coverage and incident ownership are proven.
>
> The strategic return is larger than support savings. A customer who is helped when the journey breaks is more likely to trust the platform with the next complex itinerary. Each managed disruption also creates structured outcome data that improves product quality and makes the next post-purchase use case cheaper to build. That creates a flywheel of reassurance, repeat use, better data and broader journey coverage.

## A 12-15 minute presentation

### 0:00-0:45 - Frame the portfolio

Open **Mental map**.

Say:

> I explored a portfolio of post-purchase problems and built customer states for each. Today I will go deep on missed connection because it best tests whether an AI-enabled experience can create meaningful value while remaining reliable. I will show the customer experience first, then the exact system, evaluation, economics and launch boundary behind it.

Do not explain every mental-map box. Use it only to establish breadth, depth and the order of the presentation.

### 0:45-3:00 - Show the customer problem

Select **Missed connection**.

Show:

1. The disruption alert and changed arrival context.
2. The available alternative and its relevant facts.
3. The consent boundary: nothing changes until the traveller chooses.
4. **No viable alternative** or **Human support** as the failure path.

Say:

> The customer wants to know whether the connection still works, what realistic alternatives exist, whether the ticket remains usable and whether more money is required. The experience answers only what the available evidence supports. When evidence or an acceptable alternative is missing, it monitors or passes the case to a person.

### 3:00-7:00 - Explain the system

Open **Behind the scenes**, then **Workflow** and **Live evidence**.

Use this sequence:

1. Read booking RW-8F42QK and identify the exact legs and ticket scope.
2. Match live operational events to the booked services.
3. Run the deterministic connection calculation.
4. Retrieve the applicable versioned policy rule.
5. Filter alternatives for reachability, arrival, ticket scope, cost and accessibility.
6. Present reality and alternatives; wait for consent.
7. Log the decision trace or pass the case to support.

Say:

> AI is useful in evidence selection, resolving incomplete journey context and comparing alternatives across several constraints. It does not own the numeric missed-connection decision or bypass product controls. This is one bounded workflow with tools and fixed gates; the labels describe responsibilities, not six independent models.

Be explicit about current evidence:

> The DB adapter and policy evidence are inspectable. The current alternative decision is simulated. The next proof step is to bind one exact booked service to its exact live payload and generate the trace from that input.

### 7:00-9:30 - Show evaluation and failure design

Open **Product eval**. Run one answerable and one deliberately unanswerable case.

Say:

> These 25 cases show the evaluation design, not production performance. Product and Support Operations own coverage; policy and carrier experts own reference answers; Data Science and Engineering own execution. The production version needs a frozen holdout, journey and language slices, grader agreement and release-linked thresholds.

Explain the two scores:

- Raw capability shows whether the agent produced the correct grounded response.
- Post-control safety shows whether unsafe output was blocked or passed to a human before reaching the traveller.

### 9:30-11:30 - Show value and metrics

Open **Economics**.

Say:

> This is a funnel, not full human-cost replacement. Some cases are resolved without a person; every unresolved case retains human handling cost. Agent operating cost is charged across affected journeys. The inputs are visible placeholders until Finance and Operations provide real values.

The metric contract to state verbally:

| Outcome | Primary measure | Guardrail |
|---|---|---|
| Traveller confidence | Median time to a clear next step | Later support contact and option reversal |
| Connection quality | Correct missed/possible state | False AtRisk and missed-warning rate |
| Agent quality | Answerable accuracy | Safe abstention for unsupported cases |
| Operations | Resolution without human | Human route completion; zero dropped cases |
| Economics | Cost per resolved case | Wrong-money-claim incidents |
| Experience | First useful answer latency | Under 3 seconds is a target placeholder |

### 11:30-13:00 - Close with judgment

Open **Trade offs**, **Ready to launch** and the roadmap only as needed.

Say:

> I favour trust while evidence is limited. The system begins in explain-and-monitor mode. Automated rights claims remain off until real-journey evaluation meets the agreed bar. I would expand next where traveller value, evidence availability and action risk support it.

Close with:

> The point of the prototype is not that every component is production-ready. It demonstrates how I move from a valuable traveller problem to a bounded AI system, expose uncertainty, define proof, and decide what must be true before launch.

## What to keep in reserve for questions

Do not tour every tab. Keep these as evidence:

- **Why AI** for the rules-versus-agent challenge.
- **Live evidence** for grounding and freshness.
- **Product eval** for quality, failure taxonomy and ownership.
- **Economics** for business impact and assumptions.
- **Trade offs** for product judgment.
- **Ready to launch** for release boundaries.
- **After launch** for learning loops and drift.

## Independent benchmark result

Current score: **6.5-7/10 as a senior AI product presentation**.

What already passes:

- High-value traveller problem and clear consent boundary.
- Fixed logic for a money-sensitive state.
- Stale-data, unsupported-case and no-alternative paths.
- Editable containment economics with human routing retained.
- Tradeoffs, evaluation design and post-launch learning loop.

What prevents a launch-evidence claim:

1. The displayed DB records are not yet visibly bound to the exact booked service and resulting decision.
2. Evaluation results are simulated examples rather than output from a runnable evaluation system.
3. Launch labels must distinguish implemented, verified by test and pending production validation.
4. Metrics need real baselines, targets, sources and owners.
5. Governance needs a concrete RACI, incident owner, kill switch and change approval path.

## Questions a principal product manager may ask

### 1. Why did you choose missed connection?

It scores highly across customer severity, urgency and AI learning value. A traveller must combine live delays, transfer feasibility, ticket scope, passenger rights and practical alternatives under time pressure. It also has strong safety boundaries: monitor when data is stale, pass unclear policy to a person, and require consent before changing the monitored plan. That makes it a useful deep dive for both value and reliability.

### 2. Why does this need AI instead of rules and APIs?

The numeric connection decision does not need AI; it uses a fixed formula. AI becomes useful when the system must identify missing evidence, interpret booking and policy context, compare alternatives across conflicting constraints, explain uncertainty and adapt to traveller needs. The design uses each approach where it is strongest.

### 3. What exactly is live, derived and simulated?

The DB server adapter and policy evidence are inspectable. Connection feasibility is designed as a deterministic derived value. The current booking-to-live-record binding, alternative search, agent decisions and carrier actions are simulated. I would never present those as production proof.

### 4. How will you prove the displayed alternative is valid for this traveller?

The production trace must bind the booking's service IDs and stops to exact live DB records, verify ticket scope and carrier rules, then filter candidates for reachability, same-day arrival, transfer margin, reservation impact, accessibility and additional cost. If any required field is absent, the alternative is withheld or reviewed by support.

### 5. What is the most dangerous failure?

A confident but unsupported money, ticket-validity or journey-action claim. It can cause financial loss or strand the traveller. Those claims require named evidence and versioned rule IDs, and actions require consent. Missing evidence triggers safe abstention or human handling.

### 6. Who creates the evaluation questions and reference answers?

Product and Support Operations define representative coverage from real customer cases. Policy/legal and carrier operations experts approve reference answers. Data Science and Engineering implement the runner and graders. A frozen holdout and slice reporting reduce the risk of authoring to the test.

### 7. What pass bar would you use?

I would set it by risk class using real journeys. Unsupported money and rights claims require zero unblocked critical errors and very high safe abstention. Connection-state accuracy needs separate thresholds for false alarms and missed warnings. We should agree the exact values only after baseline measurement and expert review, then connect them to the release gate.

### 8. How do you measure customer value?

The primary customer outcome is time to a clear, usable next step. I would pair it with alternative-choice rate, unresolved rate, option reversal and later support contact. Those measures distinguish fast wording from actual resolution and expose when customers do not trust the answer.

### 9. How do you measure business value without overstating automation?

Use a resolution funnel. Start with affected journeys, estimate how many would contact support, measure cases resolved without a person, retain human cost for everything passed to support, and subtract agent operating cost across all affected journeys. Add fixed build and monitoring costs, handoff overhead and false-alarm downside before making an investment decision.

### 10. What data do you collect after launch?

Decision inputs, retrieved sources and versions, state, confidence, customer-facing output, traveller choice, escalation reason and human outcome, source freshness, predicted versus actual delay, final journey outcome and later support contact. Collection is purpose-limited, minimizes personal data, has a defined retention period and role-based access.

### 11. How does the product improve from that data?

Wrong or missing evidence changes retrieval or workflow. Unsafe or confusing wording changes the prompt or presentation. Systematic prediction error changes the model or deterministic threshold. Repeated unsupported case types change product scope. Drift alarms detect degradation and can pause affected claims while routing cases to people.

### 12. How do you handle prompt injection from external sources?

Webpages, documents and API responses are treated as untrusted data. Embedded commands are ignored. Only approved domains, tools and response schemas enter the workflow. Unexpected instructions, secret requests or malformed data stop the action and create a security event.

### 13. Why not let the agent act automatically when the answer is obvious?

The cost of an unwanted change is high and traveller preferences are not fully captured by arrival time. Early versions should explain, monitor and ask. Automation can expand only for reversible, low-risk actions after observed behaviour and evaluation show that it improves outcomes without eroding trust.

### 14. What happens with separate tickets or another carrier?

The agent cannot infer protection from itinerary shape. It must verify ticket scope and operator coverage. Separate tickets or conflicting operator rules become a different policy state and may require a new ticket, customer choice or human handling.

### 15. How would you launch this?

Start with shadow evaluation on historical and live journeys, then an internal support-assist mode, followed by customer explain-and-monitor mode. Expand only after each stage meets its quality and operational gate. Keep automated rights claims and carrier actions off until exact journey binding, policy coverage and real-journey evaluation pass.

### 16. What would make you stop or narrow the product?

Persistent critical grounding errors, stale-data dependence, false alarms that create more contacts, poor human-route completion, or cost per resolved case above the support baseline. I would pause the affected claim or journey slice, inspect traces, and reopen only after the failure class passes the release test.

### 17. How did you use AI as a product manager while building this?

I used AI to accelerate prototyping, synthesize workflow variants, generate adversarial cases and expose assumptions. I independently checked policy claims, separated simulated from live evidence, defined deterministic boundaries and retained judgment over scope, metrics and launch decisions. That reflects the JD's expectation that AI increases range and speed without replacing product judgment.

### 18. What is the next most important proof step?

Produce one inspectable end-to-end trace from an exact booked service: booking snapshot, matched live DB records, policy rule version, deterministic calculation, candidate filters, customer output and consent event. That closes the largest credibility gap before expanding scope.

### 19. Why should a marketplace solve a problem caused by the carrier?

The marketplace owns the customer relationship around the itinerary it sold, even when it does not own the vehicle. Sending the traveller away at the moment of disruption breaks continuity, duplicates effort and loses the advantage of having the booking context. The marketplace should clarify and orchestrate the next step while keeping carrier responsibility and action boundaries explicit.

### 20. What is the durable strategic advantage here?

The durable advantage is the combination of multi-carrier itinerary context, commercial context, customer preferences and observed post-purchase outcomes. A carrier sees its own service. A general assistant may see public information. The booking platform can understand how several services, tickets and policies affect one customer's complete journey.

### 21. How does this improve the long-term customer relationship?

Trust is built when the platform remains useful after payment, especially when plans fail. A successful recovery creates evidence that the platform can handle complex journeys, not only sell them. I would test whether travellers who receive useful disruption support show higher repeat booking and greater willingness to book multi-leg itineraries, while controlling for route and disruption severity.

### 22. Could proactive alerts damage trust?

Yes. A false alarm can create anxiety, unnecessary support contact and distrust of later alerts. That is why AtRisk and Missed must be separate states, thresholds need calibration on real journeys, and messaging should reflect uncertainty. I would track false AtRisk rate, alert dismissal, later support contact and alert opt-out by journey type.

### 23. How do carrier relationships affect the strategy?

Coverage and permissible actions vary by carrier, market, ticket and distribution agreement. Product scope should be segmented by evidence and action capability rather than pretending every itinerary is equivalent. Carrier operations should receive structured mismatch and outcome data, while customer communication clearly distinguishes platform guidance from carrier-confirmed action.

### 24. How would you prioritize the portfolio with incomplete data?

Combine quantitative signals such as contact volume, repeat contacts, refunds and disruption frequency with qualitative evidence from conversations and support handling. Score prevalence, severity, controllability, evidence readiness and action risk. Use prototypes and historical replay to test the uncertain assumptions before committing to an integration-heavy roadmap.

### 25. What would you build as reusable platform capability?

Journey identity resolution, source freshness, policy versioning, consent state, alternative-quality checks, decision logging, evaluation infrastructure and human handoff should be reusable. Individual scenarios then become configurations of evidence, policy, actions and thresholds rather than separate assistants.

### 26. How do you prevent support containment from becoming the wrong goal?

Containment is useful only when the journey is correctly resolved. The primary outcome is a clear and usable next step; containment is secondary. Pair it with later support contact, option reversal, unresolved journeys, complaint rate and critical-incident review so the system cannot improve its score by blocking access to people.

### 27. How would you handle international and multimodal expansion?

Treat language, carrier, transport mode, market and ticket structure as evaluation slices. Expand only where operational data, policy coverage and human escalation exist. Retrieval must preserve the governing market and source version, while customer wording is localized and reviewed for legal and travel terminology rather than translated mechanically.

### 28. How do you align Engineering, Design, Data Science and Operations?

Align around one journey outcome and a shared release contract. Product owns problem selection, acceptable risk and outcome measures. Design owns comprehension and control. Engineering owns reliable tools, auditability and action boundaries. Data Science owns measurement and model behavior. Operations and policy experts own escalation readiness and reference truth. Disagreements are resolved against observed journey outcomes and the release gate.

### 29. What is your north-star measure?

The north star is the percentage of disrupted journeys that reach a clear, usable next step within the relevant time window. It must be paired with critical-error rate, false alarms, later support contact and journey completion. No single measure can safely represent both customer value and system risk.

### 30. What would the three-year product direction be?

Year one builds trustworthy understanding: booking questions, live status, disruption explanation and support assist. Year two expands controlled resolution across high-coverage carriers and reversible actions. Year three becomes cross-carrier journey orchestration, using accumulated outcome data to anticipate disruption, personalize alternatives and coordinate actions where commercial and technical agreements permit it.

## Final preparation checklist

- Practice the opening and closing until each takes under 45 seconds.
- Complete the customer flow in under two minutes without opening presenter material.
- Be able to state what is live and simulated in one sentence.
- Prepare one answerable and one unanswerable evaluation case.
- Memorize the five economics assumptions and identify each placeholder.
- Do not defend static evaluation percentages as measured production performance.
- Use the failure path to show judgment, not as an apology for incomplete automation.
- Stop after 13 minutes and invite questions.
