# StudyPilot AI — Project Structure

This is the complete folder structure for the project, matching what's already been created in the local repo, plus what will be added on upcoming days.

```
studypilot-ai/
├── index.html                     # App shell — single entry point (Day 2)
├── netlify.toml                   # Netlify build + functions config (Day 6)
├── README.md                      # Project documentation (Day 10)
├── .gitignore                     # Excludes node_modules, .env, OS files
├── .env                           # LOCAL ONLY — Anthropic API key (never committed)
│
├── css/
│   ├── variables.css              # Design tokens: colors, fonts, spacing (Day 2)
│   ├── layout.css                 # App shell layout: nav, main content area (Day 2)
│   └── components.css             # Reusable UI pieces: cards, buttons, forms,
│                                   #   task rows, heatmap, chat bubbles (Days 2–8)
│
├── js/
│   ├── app.js                     # Entry point — tab switching, initial render (Day 2)
│   ├── store.js                   # Data model, localStorage, CRUD + query functions
│                                   #   (Days 3–5) — the single source of truth
│   ├── goals.js                   # Goals list + Goal Detail screen rendering (Day 3, 7, 8)
│   ├── today.js                   # Today screen rendering + prioritization UI (Day 4)
│   ├── progress.js                # Streak + heatmap rendering (Day 5)
│   ├── chat.js                    # Chat screen UI + conversation handling (Day 7)
│   └── ai.js                      # Claude API client-side helper functions (Day 6–7)
│
├── netlify/
│   └── functions/
│       └── ask-claude.js          # Serverless proxy to the Claude API (Day 6)
│
└── assets/
    └── screenshots/                # Showcase screenshots for README/LinkedIn (Day 10)
```

## Folder Responsibilities

| Folder/File | Responsibility | Why structured this way |
|---|---|---|
| `index.html` | Single HTML entry point; loads all CSS/JS | One-page app — no router needed, keeps setup trivial |
| `css/` | All styling, split by concern | `variables.css` (tokens) is loaded first so every other file can reference the same design system consistently |
| `js/store.js` | The only file that touches `localStorage` | Centralizing data access here means every screen shares one consistent, tested data layer — prevents the "each screen has its own copy of the data" bug class |
| `js/*.js` (screen files) | One file per screen, matching the 3-tab + 1-detail navigation map | Keeps each file focused and easy to hand off to a fresh AI chat on a given day without needing to understand the whole app |
| `netlify/functions/` | Netlify's required convention for serverless functions | Netlify auto-detects this exact folder path — no custom build config needed |
| `assets/` | Static, non-code files | Keeps binary/image assets separate from source code |
| `.env` | Local-only secret (Claude API key) | Never committed; production key is set via Netlify's dashboard instead (Day 9) |

## Where Future Code Will Live

- **Day 3** (Goals/Tasks CRUD): `js/store.js` (data functions) + `js/goals.js` (UI)
- **Day 4** (Today view): `js/store.js` (query function) + `js/today.js` (UI)
- **Day 5** (Streaks/heatmap): `js/store.js` (aggregation functions) + `js/progress.js` (UI)
- **Day 6** (AI plumbing): `netlify/functions/ask-claude.js` + `js/ai.js`
- **Day 7** (AI features): `js/ai.js` (extended) + `js/chat.js` (new)
- **Day 8** (Resources + polish): edits across `js/goals.js`, `js/today.js`, `css/components.css`
- **Day 9–10**: no new source files — testing, deployment config, and `README.md`

## Why This Structure

1. **No build tools, no bundler** — every file is plain HTML/CSS/JS loaded directly via `<script>`/`<link>` tags. Zero configuration to break or debug, which matters given the 1.5–2 hr/day budget.
2. **One file per concern** — makes it possible for a fresh AI conversation on any given day to open exactly the 1–2 files relevant to that day's work, per the Blueprint's "fresh chat each day" model.
3. **`store.js` as a strict boundary** — every screen file calls into `store.js` rather than reading `localStorage` directly, so the data layer can be tested/reasoned about independently of any UI screen.
4. **Matches Netlify's conventions exactly** — the `netlify/functions/` path is not arbitrary; it's what Netlify expects out of the box, avoiding extra deployment configuration on Day 9.
