# StudyPilot AI — Progress Log

## Day 1 — Product Discovery & Sprint Planning
- Interviewed to discover the project: StudyPilot AI, an AI-powered study companion.
- Finalized v1.0 scope: Goals/Tasks, AI plan customization, proactive Today view, chat guidance, streaks + heatmap, lightweight resource attachment. Local-first (localStorage), no login, deployed on Netlify.
- Deliverables produced: PRD, Day 2–10 Implementation Blueprint, Pitch Deck.

## Day 2 — System Design
- Installed Git and Node.js locally.
- Created GitHub repository `vlakshya39-cmd/studypilot-ai` and cloned it locally.
- Created initial project folder structure: `css/`, `js/`, `assets/screenshots/`, `netlify/functions/`.
- Finalized tech stack: vanilla HTML/CSS/JS, localStorage, Anthropic Claude API via a Netlify Function proxy, Netlify hosting, Google Fonts.
- Produced full technical design docs:
  - `ARCHITECTURE.md` — component diagram, data flow, request lifecycles (standard + AI), external services
  - `SCHEMA.md` — full data model (Goal/Task/Resource), validated against every PRD user story
  - `API.md` — the one external endpoint (`/ask-claude`) + internal `store.js` data-layer API contract
  - `UI-WIREFRAMES.md` — user flow, screen flow, low-fidelity wireframes for all 4 screens
  - `PROJECT-STRUCTURE.md` — full folder layout and rationale
- Day 3 readiness check: on track, no scope changes, no Blueprint updates needed.
- Committed and pushed all Day 2 docs to GitHub (`d3db62b..07217d6`).

**Status:** On schedule. Implementation begins Day 3.

## Day 3 — Project Setup & Foundation
- Installed VS Code Live Server extension and Netlify CLI; fixed a Windows PowerShell execution-policy block.
- Built the app shell: `index.html`, full CSS design system (`variables.css`, `layout.css`, `components.css`), and `js/app.js` tab-switching logic.
- Added `netlify.toml`, a placeholder `netlify/functions/ask-claude.js`, and `.env.example` ahead of Day 6's AI integration.
- Verified "Hello World" milestone: app runs via Live Server, all 3 tabs switch correctly, clean console output.
- Confirmed GitHub connection (already cloned Day 2) and decided on a trunk-based branching strategy (solo build, Netlify auto-deploys from `main`).
- Produced: `SETUP.md`, `ENVIRONMENT.md`, `DAY3-SUMMARY.md`, updated `PROJECT-STRUCTURE.md`.
- No Implementation Blueprint changes required — today's work matches the Blueprint's original "Day 2" foundation section exactly.

**Status:** On schedule. First user-facing feature (Goals & Tasks CRUD) begins next session.

## Day 4 — Core Feature Implementation (Goals & Tasks CRUD)
- Built `js/store.js`: the full data layer — `loadState`/`saveState`, Goal CRUD (`addGoal`, `deleteGoal`), Task CRUD (`addTask`, `editTask`, `deleteTask`), all persisted to `localStorage` under key `studypilot_v1`.
- Built `js/goals.js`: Goals list view (create/delete goals, progress %) and Goal Detail view (add/check off/delete tasks), fully wired to `store.js`.
- Updated `js/app.js` to load state on startup and re-render the Goals screen on every tab switch.
- Updated `index.html` to load the new scripts in the correct order (`store.js` → `goals.js` → `app.js`) and added the `#goals-root` mount point.
- Verified end-to-end: goal creation, task creation, checkbox toggling, progress % calculation, and full data persistence across page refresh.
- This completes the Blueprint's "Day 3 — Goals & Tasks Data Model + CRUD UI" section in full.

**Status:** On schedule. Today (Blueprint's Day 4 — Today View & Prioritization Logic) begins next session.

## Day 5 — Continue Core Feature Development (Today View + Progress Tracking)
- Upgraded `js/store.js`: real `getTodayTasks()` prioritization (overdue-first, then round-robin across goals, capped at 7), plus `getCompletionsByDate()`, `getCurrentStreak()`, `getHeatmapData()`.
- Built `js/today.js`: proactive Today screen — prioritized task list, checkbox toggling synced with Goals screen, empty states ("Nothing scheduled" / "All caught up!").
- Built `js/progress.js`: real streak badge (replacing the Day 4 placeholder) and a 13-week GitHub-style calendar heatmap with hover tooltips.
- Updated `app.js`/`index.html` to wire both new screens into the existing navigation, load order, and default Today landing view.
- Verified end-to-end: Today prioritization, checkbox sync between Today/Goals, streak counting (confirmed 2-day streak), heatmap rendering and shading — plus a full regression check confirming Goals/Tasks CRUD from Day 4 still works unchanged.
- No paid APIs or external services used — 100% client-side, consistent with the whole project so far.
- This completes the Blueprint's "Day 4 — Today View & Prioritization Logic" and "Day 5 — Streaks & Calendar Heatmap" sections in one session.

**Status:** Ahead of schedule (two Blueprint days completed in one session). AI integration (Claude API via Netlify Function) begins next session.

## Day 6 — Complete the MVP & Deliver a Working Demo
- **Design change (approved):** switched AI provider from Anthropic Claude API to Google Gemini API, since Claude API has no permanent free tier and today's requirements mandated $0-cost tools only. Architecture unchanged — only the vendor and function name (`ask-claude.js` → `ask-ai.js`) changed.
- Got a free Gemini API key (aistudio.google.com), configured locally via `.env` and in Netlify's dashboard for production.
- Built `netlify/functions/ask-ai.js`: secure serverless proxy to Gemini, with input validation and error handling.
- Built `js/ai.js`: client helper plus two real AI features — `organizeGoalWithAI()` (schedules a goal's tasks across days) and `getChatResponse()` (context-aware chat grounded in real user data).
- Built `js/chat.js`: full chat UI with conversation history, loading states, and graceful error handling.
- Updated `js/goals.js` with a working "✨ Organize with AI" button.
- Added the required footer: "Built with Claude as part of the AB Talks 60-Day Claude AI Challenge."
- Debugged through several real issues: incorrect local file paths from zip extraction, an initial zero-quota model, and a deprecated model name — resolved by querying Google's live model list and switching to the `gemini-flash-latest` alias.
- **Deployed the full MVP live to Netlify**: https://studypilot-ai-lakshya.netlify.app/
- Verified the complete user flow works on the live production site: Goals CRUD, AI plan organization, Today prioritization, streaks/heatmap, and AI chat — all confirmed working with the production environment variable.
- This completes the Blueprint's Day 6 (AI connection) and Day 7 (AI features) sections, plus an early version of Day 9 (deployment), in one session.

**Status:** MVP complete and live. Remaining work: resource attachment (link/note per task), full UI polish pass, and final testing/documentation — originally Blueprint Days 8 and 10.

## Day 7 — Product Refinement & User Experience
- Built the resource attachment feature (link/note per task): added `setTaskResource()` and `removeTaskResource()` to `js/store.js`, with validation matching `SCHEMA.md`'s constraints, plus a full UI in `js/goals.js` (inline add/edit form, badge display, remove control).
- **Caught and fixed a real gap:** this feature was designed and "delivered" in an earlier session, but it was never actually committed to GitHub — the live `goals.js`/`store.js` had no trace of it. Re-verified against the live repo files before rebuilding it for real, confirmed working locally and in production this time.
- Completed a full UI/UX refinement pass on `css/components.css`: hover states on cards/tasks/buttons, smoother transitions, a springy checkbox interaction, a fade-in animation for chat bubbles, mobile overflow fixes (task rows, resource links, chat bubble width), and keyboard-accessible focus-visible outlines on all interactive elements.
- Wired a loading spinner into the "✨ Organize with AI" button so async AI calls have a real visual loading state, not just changed button text.
- Verified every existing feature still works after all changes: Chat (AI reply + animation), Organize with AI (spinner + reschedule), adding/deleting goals, adding/removing task resources, and the Today/Progress views.
- Renamed the day-folder from the Blueprint's internal `day07` naming to `Day57` to correctly match the running 60-Day Challenge day count.
- This completes the Blueprint's Day 8 section (Resource Attachment + Full Polish Pass) in full, including the accessibility and loading-state items that were initially missed.

**Status:** On schedule. Remaining: final full testing pass and documentation cleanup (Blueprint Day 10) before the capstone closes.

## Day 8 — Testing, Debugging & Production Optimization
- Performed a full QA/security/performance review of every file in the project
  (`store.js`, `goals.js`, `today.js`, `chat.js`, `ai.js`, `progress.js`, `app.js`,
  `index.html`, `ask-ai.js`, both CSS files) before making any changes.
- **Security fix:** resource links were rendered as clickable `<a href>` without
  checking the URL scheme, allowing a `javascript:` URL to be saved as a "link"
  resource and execute when clicked. Added `isSafeHttpUrl()` in `js/goals.js` —
  only genuine `http`/`https` URLs are ever rendered as clickable links; anything
  else is rejected with a clear error message.
- **Bug fix:** the Today screen's checkbox always set a task to "done" regardless
  of whether it was being checked or unchecked, so unchecking a task silently did
  nothing. Fixed in `js/today.js` to correctly mirror the checkbox's actual state
  (matching the already-correct logic in `js/goals.js`).
- **UX fix:** adding a goal or task with an empty or over-length title failed
  silently with no feedback. Both forms in `js/goals.js` now show a clear error
  message explaining the valid input range.
- **Accessibility fixes:** added `aria-current="page"` to the active nav tab in
  `js/app.js`, and `aria-label`/`maxlength` attributes to all title inputs and
  checkboxes across `js/goals.js` and `js/today.js`.
- Performed a full end-to-end walkthrough on the live production site: Today
  (checkbox fix verified), Goals (validation + resource security fix verified),
  Organize with AI (spinner + scheduling), and Chat (AI reply) — all confirmed
  working with zero console errors (one harmless, purely cosmetic favicon 404
  noted and left as a known minor item, not a functional issue).
- This completes the Blueprint's Day 10 section — final testing, debugging, and
  production-readiness pass — ahead of the capstone's official close.

**Status:** Application reviewed and verified production-ready. No blocking issues
remain. Remaining before formal launch: optional favicon addition (cosmetic only).

## Day 9 — Launch & Production Readiness
- Added a branded SVG favicon (`favicon.svg`), closing out the cosmetic 404 noted
  on Day 8.
- Added SEO meta description, Open Graph tags, and Twitter card tags to
  `index.html` so shared links (LinkedIn, WhatsApp, etc.) show a proper title
  and description instead of a blank preview.
- Replaced the 2-line README stub with a full professional `README.md`: what
  the app does, live demo link, tech stack, local setup instructions, and links
  to the existing architecture/schema docs.
- Added an `LICENSE` file (MIT) — the repo had no license before this.
- Updated `netlify.toml`: removed a stale comment left over from before the AI
  function was built, and added basic production security headers
  (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).
- Performed a final end-to-end walkthrough on the live production site after
  each deploy: favicon/title verified live, all network requests returning
  200/304, Today/Goals/resources/Organize with AI/Chat all confirmed working,
  zero console errors.
- Confirmed the deployed version matches the local version at every step.
- This completes the Blueprint's Day 9 section — Launch & Production Readiness.

**Status:** Application is publicly launch-ready. Repository has a real README,
a license, working SEO/social metadata, a favicon, and basic security headers
in production. No blocking issues remain.
