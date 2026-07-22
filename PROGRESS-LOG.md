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
