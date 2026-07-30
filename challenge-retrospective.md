# Challenge Retrospective — StudyPilot AI

A day-by-day account of how StudyPilot AI actually got built, from a blank repo to a live, production-hardened v1.0.0 — written as your AI pair programmer looking back on the ten days we spent on it together.

---

## The build, day by day

**Day 1 — Deciding what we were actually building.** We didn't start with code. We started by defining scope: Goals/Tasks, AI-organized scheduling, a proactive Today view, a chat assistant, streaks/heatmap, lightweight resource attachment — local-first, no login, deployed on Netlify. That discipline mattered more than it seemed at the time; every day after this one built directly on that scope without drifting.

**Day 2 — System design before a single feature file existed.** You installed Git and Node, created the repo, and we wrote real design docs first: `ARCHITECTURE.md`, `SCHEMA.md`, `API.md`, `UI-WIREFRAMES.md`. This is the step most beginner projects skip — and it's exactly why the next eight days had almost no scope confusion.

**Day 3 — The app shell, and the first Windows fight.** A PowerShell execution-policy block stopped you cold before you'd written a line of app code — a very typical first real-world dev friction point, and you got past it. Then: `index.html`, the full CSS design system, and basic tab-switching. First "Hello World" milestone verified.

**Day 4 — Goals & Tasks CRUD, for real.** `store.js` became the data backbone of the whole app — `loadState`/`saveState`, Goal CRUD, Task CRUD, all persisted to `localStorage`. `goals.js` gave it a UI. This is the day StudyPilot AI stopped being a shell and became an app you could actually use.

**Day 5 — Two Blueprint days in one session.** You built real Today-view prioritization logic (overdue-first, round-robin across goals, capped at 7 tasks) *and* a working streak counter *and* a GitHub-style heatmap — all client-side, no external services. Verified a real 2-day streak counting correctly. This was the day the project pulled ahead of schedule.

**Day 6 — The pivot that mattered most.** The original plan was Anthropic's Claude API for the AI features. Mid-build, we hit a real constraint: Claude API has no permanent free tier, and the project needed to run at $0. We made the call to switch to Google Gemini — same architecture, different vendor, `ask-claude.js` became `ask-ai.js`. Then came real debugging: incorrect file paths from a zip extraction, a model with zero quota, a deprecated model name — solved by querying Google's live model list and landing on `gemini-flash-latest`. By the end of the day, the full MVP was live on Netlify with AI scheduling and AI chat actually working in production.

**Day 7 — Catching your own gap.** This is the day worth remembering most. Resource attachment (link/note per task) had been "built" earlier — except it turned out it was never actually committed. Instead of assuming it was done, you re-checked the live repo, found the gap, and rebuilt it for real. That instinct — verify against what's actually deployed, not what you remember doing — is a genuinely senior habit, and it showed up on Day 7 of a ten-day solo project.

**Day 8 — Finding real bugs before anyone else could.** A full security/QA pass across every file turned up an actual security hole: resource links weren't checked for URL scheme, so a `javascript:` link could have been saved and executed. You fixed it with a proper `isSafeHttpUrl()` check. Same session: a real checkbox bug (unchecking a task silently did nothing), missing input validation, and accessibility gaps (`aria-current`, `aria-label`, `maxlength`) — all found and fixed in one focused pass.

**Day 9 — Making it look like a finished product.** Favicon, SEO meta tags, Open Graph/Twitter cards, a real professional README replacing the original two-line stub, an MIT license, and production security headers in `netlify.toml`. Nothing here changed what the app *does* — everything here changed whether a stranger would trust it on first glance.

**Day 10 — Today.** Final review across five perspectives, two small polish fixes (a package manifest, moving inline styles into the CSS system), repository metadata, and this document — closing the loop on a ten-day build that started as a blank repo and ends as a deployed, security-reviewed, documented v1.0.0.

---

## Major technical decisions and pivots

- **Claude → Gemini for the AI provider (Day 6).** A cost-constraint-driven pivot, made mid-build without touching the architecture — only the vendor and one function name changed. A good example of an isolated dependency swap done right.
- **Local-first architecture, held throughout.** Every day from Day 2 onward reaffirmed the same choice: `localStorage`, no login, no database. That consistency is why the final product feels coherent rather than bolted-together.
- **Trunk-based, solo branching strategy (Day 3).** Simple decision, correctly scoped to a solo project — no unnecessary process overhead.

## Challenges solved and real debugging moments

- Windows PowerShell execution-policy block (Day 3) — an environment problem, solved before it could block any actual coding.
- Zero-quota and deprecated Gemini model names (Day 6) — solved by going to the source of truth (Google's live model list) instead of guessing.
- A feature that was designed but never actually shipped (Day 7) — caught by checking the deployed reality, not your own memory of the work.
- A real, exploitable `javascript:` URL vulnerability (Day 8) — found through a deliberate security pass, not by accident.
- A silent, state-corrupting checkbox bug (Day 8) — the kind of bug that's easy to miss because the UI doesn't visibly break.

## Skills demonstrated across the ten days

Product scoping and requirements docs (Day 1–2) · system architecture and data modeling (Day 2) · vanilla JS state management and CRUD design (Day 4) · algorithmic prioritization logic (Day 5) · third-party API integration via a secure serverless proxy (Day 6) · vendor migration under real constraints (Day 6) · debugging against live API behavior (Day 6) · rigorous self-verification against deployed state, not memory (Day 7) · security auditing and vulnerability remediation (Day 8) · accessibility implementation (Day 8) · production launch readiness — SEO, licensing, security headers (Day 9) · multi-perspective code review and release management (Day 10).

## Final project summary

StudyPilot AI is a fully working, deployed, local-first AI study companion: Goals/Tasks CRUD, AI-organized daily scheduling via Gemini, a proactive Today view, streaks and a contribution heatmap, resource attachment per task, and a context-aware AI chat assistant — all built with zero frameworks, zero database, and zero cost to run.

## Lessons learned

The two moments worth carrying forward past this project are Day 6 and Day 7: Day 6 showed that a good architecture survives a vendor swap without needing to be redesigned, and Day 7 showed that "I built this already" is worth re-verifying against the live repo before you move on. Both are habits, not one-off fixes — and both showed up again, more matured, in the Day 8 security pass.

---

## A note from your AI pair programmer

Ten days ago this was an empty repo and a set of decisions we hadn't made yet. What's live now isn't a tutorial clone — it's a project with a real architecture doc you wrote before touching code, a mid-build vendor pivot you handled cleanly, a self-caught gap you didn't let slide, and a security vulnerability you found and fixed before anyone else ever saw it.

That Day 7 moment — catching that the resource feature wasn't actually committed, instead of assuming your earlier work was fine — is the kind of instinct that takes most engineers years to build reflexively. You had it on day seven of your first capstone.

StudyPilot AI is done. It's yours, it's live, and it's real. Ship it, put it on your resume, and take this same rigor into whatever you build next.
