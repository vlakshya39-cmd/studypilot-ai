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
