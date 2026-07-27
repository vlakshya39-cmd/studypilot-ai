# StudyPilot AI — Implementation Blueprint (Days 2–10)

**This is the single source of truth for the rest of the capstone.** Every remaining day begins with a fresh AI conversation — paste that day's section (plus the "Project Context" block below) at the start of the chat, and the assistant should be able to continue building without re-planning or re-deciding architecture.

Build pace assumption: **1.5–2 hours/day.**

---

## 📌 Project Context (paste this into every new day's chat)

```
Project: StudyPilot AI
What it is: A local-first AI study companion for college students. Students create
goals (e.g. "Python + DSA", "Subject X"), add their own tasks under each goal, and
AI organizes those tasks into a daily plan. A proactive "Today" view shows what to
study right now. A chat interface gives on-demand guidance and re-planning. Progress
is tracked via checkboxes, streaks, and a GitHub-style calendar heatmap. One link or
note can be attached per task. No login — all data lives in browser localStorage.

Tech stack: Vanilla HTML, CSS, JavaScript (single-page app, no framework, no backend).
AI integration: Anthropic Claude API (added Day 6-7), called client-side.
Design language: Dark theme, premium feel. Fonts: JetBrains Mono (code/data),
Inter or Space Grotesk (UI text). Accent colors: teal (#2DD4BF / #0F766E),
amber (#F59E0B), violet (#A78BFA). Background: near-black (#0B1220 / #111827).
Deployment target: Netlify, connected to a GitHub repo, auto-deploy on push.

Full v1.0 scope (in/out), user stories, and success criteria live in the PRD
(StudyPilot_AI_PRD.docx) — refer to it if anything is unclear.
```

---

## 🗺️ Roadmap Overview

| Day | Focus | Outcome |
|---|---|---|
| 2 | Project setup + folder structure + design system | Empty but styled app shell, running locally |
| 3 | Goals & Tasks data model + CRUD UI | Can create goals, add/edit/delete tasks, saved to localStorage |
| 4 | Today View + prioritization logic | Proactive daily screen works with static (non-AI) logic |
| 5 | Progress tracking: checkboxes, streaks, heatmap | Visual progress system fully working |
| 6 | Claude API integration (basic) | AI can respond to a single prompt from the app |
| 7 | AI Plan Customization + Chat guidance | AI organizes tasks into a plan; chat can answer "what should I study today" |
| 8 | Resource attachment + UI polish pass | Feature-complete app, visually polished |
| 9 | Testing + bug fixing + deployment | Live on Netlify, tested end-to-end |
| 10 | Final QA, documentation, demo prep | Polished v1.0 shipped, ready to showcase |

---

## Day 2 — Project Setup & Design System

### 🎯 Objective
Set up the project repository and build a styled, empty application shell — the visual foundation every later feature will slot into.

### 📖 What I'll learn
- Structuring a clean single-page app (SPA) without a framework
- Building a reusable CSS design system (variables, typography, layout grid)
- Git/GitHub basics for a new project

### 🛠 Features to build
- Static layout shell: sidebar/nav (Goals, Today, Chat), main content area
- Design system: CSS custom properties for colors, fonts, spacing
- Empty-state placeholders for each screen (Goals, Today, Chat)

### 📝 Step-by-step implementation plan
1. Create project folder `studypilot-ai/` with subfolders: `css/`, `js/`, `assets/`.
2. Create `index.html` with a basic layout: header/nav, a `<main id="app">` container, and script/style links.
3. Create `css/variables.css` defining CSS custom properties:
   - Colors: `--bg-primary: #0B1220`, `--bg-surface: #111827`, `--card: #1B2536`, `--teal: #2DD4BF`, `--teal-deep: #0F766E`, `--amber: #F59E0B`, `--violet: #A78BFA`, `--text-primary: #F8FAFC`, `--text-muted: #94A3B8`, `--border: #263042`.
   - Fonts: `--font-mono: 'JetBrains Mono', monospace`, `--font-body: 'Inter', 'Space Grotesk', sans-serif`.
   - Spacing scale: `--space-1` through `--space-8`.
4. Create `css/layout.css` for the app shell: sidebar nav (Goals / Today / Chat tabs), main content area, responsive breakpoints.
5. Create `css/components.css` for reusable pieces: cards, buttons, badges, empty states — to be reused across all future screens.
6. Create `js/app.js` as the entry point — for now, just handles simple tab switching between three empty screens (Goals, Today, Chat) using basic DOM show/hide (no router needed).
7. Load Google Fonts (Inter, Space Grotesk, JetBrains Mono) via `<link>` in `index.html`.
8. Add a simple top-level app title/logo area: "StudyPilot AI".
9. Initialize Git: `git init`, create `.gitignore` (ignore `.DS_Store`, `node_modules` if any), first commit.
10. Create a GitHub repository and push the initial commit.

### 📂 Files and folders to create or modify
```
studypilot-ai/
├── index.html
├── css/
│   ├── variables.css
│   ├── layout.css
│   └── components.css
├── js/
│   └── app.js
├── assets/
└── .gitignore
```

### 🔗 APIs, libraries, services, or tools to integrate
- None yet. Google Fonts CDN link only.

### 🧪 Testing tasks
- Open `index.html` directly in browser — confirm no console errors.
- Resize browser window — confirm layout doesn't break (basic responsiveness).
- Switch between the three empty tabs — confirm switching works.

### 🐞 Common issues and debugging tips
- **Fonts not loading**: check the Google Fonts `<link>` tag is inside `<head>` and the font-family names in CSS exactly match (case-sensitive).
- **CSS variables not applying**: ensure `variables.css` is linked *before* `layout.css`/`components.css` in `index.html`.
- **Blank page**: open browser dev tools console (F12) and check for JS errors before debugging CSS.

### ✅ End-of-day checklist
- [ ] Repo created and pushed to GitHub
- [ ] App shell renders with sidebar/nav + 3 empty tabs
- [ ] Design system CSS variables defined and visibly applied (dark background, correct fonts)
- [ ] No console errors

### 📸 Expected project state and screenshots to capture
- Screenshot of the empty app shell showing the dark theme, nav, and font styling.

### ➡️ Handoff notes for Day 3
The app shell exists with working tab navigation and a design system in place. Day 3 will build the actual data model (Goals → Tasks) and CRUD UI inside the "Goals" tab, using the `.card`, `.button`, and spacing variables already defined in `components.css`/`variables.css`.

---

## Day 3 — Goals & Tasks Data Model + CRUD UI

### 🎯 Objective
Build the core data structure and UI for creating, editing, and deleting Goals and Tasks, with everything persisted to localStorage.

### 📖 What I'll learn
- Designing a simple client-side data model (JSON shape)
- CRUD operations in vanilla JS
- localStorage read/write patterns with safe JSON parsing

### 🛠 Features to build
- Data model for Goals and Tasks
- "Goals" screen: list of goals, create new goal, open a goal to see its tasks
- Add/edit/delete tasks within a goal
- Persist everything to localStorage on every change

### 📝 Step-by-step implementation plan
1. Design the data shape in `js/store.js`:
   ```js
   {
     goals: [
       {
         id: "goal_xxx",
         title: "Python + DSA",
         createdAt: "ISO date",
         tasks: [
           {
             id: "task_xxx",
             title: "Arrays & Strings basics",
             status: "todo" | "done",
             order: 0,
             scheduledDate: null, // filled in Day 4/7
             resource: { type: "link" | "note", value: "" } | null,
             completedAt: null
           }
         ]
       }
     ],
     progress: { /* built Day 5 */ }
   }
   ```
2. In `js/store.js`, implement:
   - `loadState()` — reads from `localStorage.getItem('studypilot_v1')`, safely `JSON.parse`s with try/catch, returns a default empty state if missing/corrupt.
   - `saveState(state)` — `JSON.stringify` and `localStorage.setItem`.
   - CRUD helper functions: `addGoal(title)`, `deleteGoal(id)`, `addTask(goalId, title)`, `editTask(taskId, updates)`, `deleteTask(taskId)`.
   - Always call `saveState()` at the end of every mutating function.
3. In `js/goals.js`, build the Goals screen UI:
   - Goal list view: cards showing goal title + task count + progress %.
   - "+ New Goal" button opens a simple inline form (title input only).
   - Clicking a goal opens its detail view: task list with checkboxes (status toggle wired in Day 5), "+ Add Task" input, edit/delete icons per task.
4. Wire delete actions with a simple confirm step (`confirm()` browser dialog is fine for v1.0).
5. Render task lists sorted by `order`; allow basic reordering later if time permits (not required for v1.0).
6. Use ids via a simple helper: `crypto.randomUUID()` (supported in all modern browsers) instead of an external UUID library.

### 📂 Files and folders to create or modify
```
js/
├── store.js       (new — data model + localStorage logic)
├── goals.js       (new — Goals screen rendering + event handlers)
└── app.js         (modified — wire Goals tab to goals.js render function)
css/
└── components.css (modified — goal card, task row, form input styles)
```

### 🔗 APIs, libraries, services, or tools to integrate
- None external. Uses native `localStorage` and `crypto.randomUUID()`.

### 🧪 Testing tasks
- Create 2–3 goals, add several tasks to each, refresh the page — confirm everything persists.
- Delete a task and a goal — confirm they're removed and don't reappear on refresh.
- Test with an empty state (clear localStorage) — confirm the app doesn't crash and shows a sensible empty view.
- Open browser dev tools → Application → Local Storage — confirm the `studypilot_v1` key contains valid JSON.

### 🐞 Common issues and debugging tips
- **Data disappears on refresh**: confirm `saveState()` is actually called after every mutation, not just on page unload.
- **JSON parse errors on load**: wrap `loadState()` in try/catch and log the raw string to console to inspect corruption.
- **Duplicate IDs**: confirm `crypto.randomUUID()` is available (all modern browsers) — don't hand-roll ID generation.
- **UI not updating after add/delete**: confirm you're re-rendering the goal/task list after every state mutation, not just mutating the in-memory array silently.

### ✅ End-of-day checklist
- [ ] Goals can be created, viewed, and deleted
- [ ] Tasks can be added, edited, and deleted within a goal
- [ ] All data persists correctly across page refresh
- [ ] No console errors during any CRUD action

### 📸 Expected project state and screenshots to capture
- Screenshot of Goals list with 2–3 goals.
- Screenshot of one goal's detail view with several tasks listed.

### ➡️ Handoff notes for Day 4
Goals and Tasks are fully CRUD-able and persisted. The data model is defined in `js/store.js` with `goal.tasks[].status` currently unused beyond storage (checkbox interactivity comes Day 5). Day 4 will read from this same `store.js` state to build the Today view's prioritization logic — no data model changes should be needed, only new read/query functions.

---

## Day 4 — Today View & Prioritization Logic

### 🎯 Objective
Build the proactive "Today" screen — the app's hero feature — using static prioritization logic (no AI yet).

### 📖 What I'll learn
- Designing prioritization/sorting algorithms
- Translating a "what matters most right now" decision into deterministic code logic
- Building a focused, single-purpose UI screen

### 🛠 Features to build
- Today screen showing a prioritized list of tasks pulled from all active goals
- Basic prioritization rules (overdue-aware, streak-aware placeholder, balanced across goals)
- Empty state ("Nothing scheduled — add tasks to a goal to get started")

### 📝 Step-by-step implementation plan
1. In `js/store.js`, add a query function `getTodayTasks(state)`:
   - Pull all tasks with `status: "todo"` across all goals.
   - For v1.0 (pre-AI), treat any task without a `scheduledDate` as eligible "any day" and any task with a past/today `scheduledDate` as due.
   - Priority order: (1) tasks with `scheduledDate` = today or earlier (overdue first), (2) then unscheduled tasks, one from each goal in rotation (round-robin) so no single goal dominates the list.
   - Cap the Today list at a reasonable number (e.g. top 5–7 tasks) so it stays focused, not overwhelming.
2. In `js/today.js`, build the Today screen UI:
   - Header: today's date + current overall streak (streak logic itself lands Day 5 — for now, render a placeholder "🔥 0 day streak").
   - List of prioritized tasks, each showing: goal name (small label), task title, a checkbox (functional toggle to `status: "done"`, wired to `store.js`).
   - Empty state message if no tasks exist yet.
3. Wire the checkbox directly to `editTask(taskId, { status: 'done', completedAt: new Date().toISOString() })` from Day 3's store functions.
4. Make the Today tab the default/landing tab when the app opens (this is the proactive part — the user should never have to navigate to see what to do).
5. Add a small "Refresh priorities" affordance (button) that just re-runs `getTodayTasks()` and re-renders — useful once tasks are checked off mid-session.

### 📂 Files and folders to create or modify
```
js/
├── store.js   (modified — add getTodayTasks query function)
├── today.js   (new — Today screen rendering + checkbox handlers)
└── app.js     (modified — set Today as default tab on load)
css/
└── components.css (modified — Today screen task row + streak badge styles)
```

### 🔗 APIs, libraries, services, or tools to integrate
- None. Pure client-side logic.

### 🧪 Testing tasks
- With tasks across 2+ goals, confirm the Today list shows a reasonable mix (not all from one goal).
- Check off a task from Today — confirm it disappears from the list and its status updates in the Goals screen too.
- Test the empty state with zero tasks.
- Manually set a task's `scheduledDate` (via dev tools/localStorage edit) to yesterday — confirm it's prioritized to the top.

### 🐞 Common issues and debugging tips
- **Today list empty despite having tasks**: check the filter logic isn't accidentally excluding all tasks (e.g. comparing dates incorrectly — use date-only comparison, not full timestamp, to avoid time-of-day mismatches).
- **One goal dominates the list**: confirm the round-robin logic actually interleaves goals rather than processing them sequentially.
- **Checkbox doesn't sync with Goals screen**: confirm both screens read from the same shared `store.js` state rather than keeping separate local copies.

### ✅ End-of-day checklist
- [ ] Today screen is the default view on app load
- [ ] Prioritized task list renders correctly, capped to a focused number of items
- [ ] Checking off a task updates state consistently across both Today and Goals screens
- [ ] Empty state handled gracefully

### 📸 Expected project state and screenshots to capture
- Screenshot of the Today screen with a populated, prioritized task list.
- Screenshot after checking off a task (showing updated list).

### ➡️ Handoff notes for Day 5
The Today view uses static, deterministic prioritization (no AI). `getTodayTasks()` in `store.js` is the key function to know about. Day 5 adds the visible progress system (streaks, heatmap) — it will read `completedAt` timestamps already being set by today's checkbox logic, so no data model changes are needed, only new aggregation/rendering logic.

---

## Day 5 — Progress Tracking: Streaks & Calendar Heatmap

### 🎯 Objective
Build the visible progress system: streak counters and a GitHub-style calendar heatmap, using the `completedAt` data already being recorded.

### 📖 What I'll learn
- Date-based aggregation logic (grouping completions by day)
- Building a calendar heatmap UI from scratch with CSS Grid/SVG
- Streak-calculation algorithms

### 🛠 Features to build
- Overall streak counter (consecutive days with at least one completed task)
- Per-goal streak counters (optional stretch if time allows — overall streak is the must-have)
- GitHub-style calendar heatmap showing daily completion activity for the last ~3 months

### 📝 Step-by-step implementation plan
1. In `js/store.js`, add `getCompletionsByDate(state)`:
   - Iterate all tasks across all goals, filter `status: 'done'`, group by the date portion of `completedAt` (YYYY-MM-DD), return a map of `{ date: count }`.
2. Add `getCurrentStreak(completionsByDate)`:
   - Starting from today, walk backward day by day; count consecutive days present in the map with count > 0; stop at the first gap. Handle "today has no completions yet" gracefully (don't break an existing streak until the day actually passes).
3. In `js/progress.js`, build the heatmap renderer:
   - Render a grid of ~13 weeks × 7 days (91 cells) using CSS Grid, each cell a small square (`div`) colored by completion count that day (use 4–5 shades of teal, from `--bg-surface` for zero up to `--teal` for high activity).
   - Add a simple tooltip (native `title` attribute is sufficient for v1.0) showing the date and count on hover.
4. Wire the real streak count into the Today screen's placeholder streak badge (built Day 4).
5. Add a small "Progress" section (can live inside the Today screen or its own tab — recommend embedding at the bottom of Today to avoid adding a 4th nav tab) showing: streak count + the heatmap.
6. Re-render the heatmap and streak any time a task is checked/unchecked (hook into the same state-change flow used elsewhere).

### 📂 Files and folders to create or modify
```
js/
├── store.js     (modified — add getCompletionsByDate, getCurrentStreak)
├── progress.js  (new — heatmap rendering + streak display logic)
└── today.js     (modified — embed progress section, replace placeholder streak)
css/
└── components.css (modified — heatmap grid + cell shading styles)
```

### 🔗 APIs, libraries, services, or tools to integrate
- None. Pure CSS Grid + vanilla JS date logic.

### 🧪 Testing tasks
- Complete tasks on "today" (real device date) — confirm streak shows 1 and today's heatmap cell lights up.
- Manually edit a task's `completedAt` in localStorage to simulate a few consecutive past days — confirm streak count reflects the consecutive run correctly.
- Simulate a gap (complete something 3 days ago, nothing yesterday or today) — confirm streak resets to 0, not counted from the old activity.
- Confirm heatmap doesn't break with zero completions (all cells render as empty/zero state).

### 🐞 Common issues and debugging tips
- **Streak off-by-one errors**: be careful with timezone handling — always compare using local date strings (YYYY-MM-DD), not raw `Date` object equality, to avoid UTC/local mismatches.
- **Heatmap misaligned columns**: confirm the grid starts on the correct day-of-week offset for the first cell (pad with empty cells if the 13-week window doesn't start on a Sunday/Monday consistently).
- **Streak breaks even with today's completion**: make sure "today" is treated as an active continuation, not a required condition — the walk-back logic should tolerate today being empty so far without ending the streak from yesterday.

### ✅ End-of-day checklist
- [ ] Streak count calculates correctly across multiple test scenarios (consecutive, gapped, zero activity)
- [ ] Heatmap renders ~91 days of activity with visibly differentiated shading
- [ ] Progress section updates immediately after checking off a task
- [ ] No console errors

### 📸 Expected project state and screenshots to capture
- Screenshot of the Today screen showing a real streak count and populated heatmap.

### ➡️ Handoff notes for Day 6
Core app (Goals, Tasks, Today, Progress) is fully functional without any AI dependency — this is intentional and matches the PRD's resilience requirement. Day 6 begins AI integration: wiring the first basic call to the Claude API. No existing files should need architectural changes; AI logic will live in new, isolated files (`js/ai.js`) that read from — but don't restructure — the existing `store.js` state.

---

## Day 6 — Claude API Integration (Basic Connection)

### 🎯 Objective
Get a working, minimal connection to the Claude API from the app — proving the plumbing works before building real AI features on top of it.

### 📖 What I'll learn
- Basics of calling a hosted LLM API from client-side JavaScript
- Handling API keys safely for a static, no-backend app
- Structuring prompts and parsing API responses

### 🛠 Features to build
- A minimal, isolated `js/ai.js` module that can send one prompt to Claude and return the text response
- A simple temporary test UI (e.g. a debug button) to confirm the connection works before building real features on Day 7

### 📝 Step-by-step implementation plan
1. **Important architecture note**: Since this is a static, no-backend app, calling the Claude API directly from client-side JS would expose an API key publicly. For a learning-focused capstone, the simplest safe approach is to use a small serverless function as a lightweight proxy. Recommended: a single Netlify Function (`netlify/functions/ask-claude.js`) that receives a prompt from the front-end, attaches the API key (stored as a Netlify environment variable, never in the repo), calls the Claude API server-side, and returns the response. This still keeps the project "no traditional backend" (no server to manage) while keeping the key safe.
2. Create `netlify/functions/ask-claude.js`:
   - Accepts a POST request with `{ prompt: string }`.
   - Calls the Anthropic Messages API (`https://api.anthropic.com/v1/messages`) using the API key from `process.env.ANTHROPIC_API_KEY`.
   - Returns the model's text response as JSON.
3. Create a `netlify.toml` config file pointing to the `netlify/functions` directory (needed for local dev + deployment).
4. In `js/ai.js`, create `async function askClaude(prompt)` that `fetch()`s the local function endpoint (`/.netlify/functions/ask-claude`) and returns the parsed text.
5. Add a temporary "Test AI Connection" debug button somewhere unobtrusive (can be removed Day 8) that calls `askClaude("Say hello in one short sentence.")` and displays the result in an alert or console log.
6. Document in a `README.md` section how to set the `ANTHROPIC_API_KEY` environment variable locally (using Netlify CLI `netlify dev`) and in the Netlify dashboard for deployment (this will be walked through step-by-step on Day 9 during actual deployment).

### 📂 Files and folders to create or modify
```
netlify/
└── functions/
    └── ask-claude.js   (new — serverless proxy to Claude API)
js/
└── ai.js               (new — client-side helper to call the function)
netlify.toml             (new — Netlify functions config)
README.md                 (new/modified — env variable setup notes)
```

### 🔗 APIs, libraries, services, or tools to integrate
- Anthropic Claude API (Messages endpoint) — model: use the latest available Claude model at integration time.
- Netlify Functions (serverless, free tier) — acts as the secure proxy.
- Netlify CLI (`netlify dev`) — for local testing of the function before deployment.

### 🧪 Testing tasks
- Run locally with `netlify dev` (this requires local Netlify CLI setup — will be guided step-by-step if this is your first time).
- Click the debug "Test AI Connection" button — confirm a real Claude-generated response appears (not an error).
- Test with the API key intentionally removed/wrong — confirm the app fails gracefully with a clear error message rather than crashing.

### 🐞 Common issues and debugging tips
- **CORS or 404 errors calling the function**: confirm the fetch URL matches exactly `/.netlify/functions/ask-claude` and that `netlify dev` (not a plain static server) is running, since plain `index.html` file-opening won't serve functions.
- **"API key not found" errors**: confirm the environment variable name matches exactly between `.env`/Netlify dashboard and the code (`process.env.ANTHROPIC_API_KEY`).
- **Function times out or errors silently**: check the Netlify Functions log output in the terminal running `netlify dev` for the actual error detail.
- **Never commit the API key to GitHub** — confirm `.env` is in `.gitignore` before any commit today.

### ✅ End-of-day checklist
- [ ] Netlify Function successfully calls the Claude API and returns a response
- [ ] Debug button in the app confirms end-to-end connectivity
- [ ] API key is stored as an environment variable, never committed to the repo
- [ ] Graceful error handling in place for failed/misconfigured API calls

### 📸 Expected project state and screenshots to capture
- Screenshot/terminal output showing a successful test response from Claude.

### ➡️ Handoff notes for Day 7
The AI plumbing (`js/ai.js` → Netlify Function → Claude API) is proven and working. Day 7 builds the two real AI features on top of this: (1) AI Plan Customization — organizing a goal's raw task list into a scheduled plan, and (2) Chat Guidance — a conversational interface. Both will call the same `askClaude()` helper with different, purpose-built prompts. The debug button from today can be removed once Day 7's real UI replaces it.

---

## Day 7 — AI Plan Customization + Chat Guidance

### 🎯 Objective
Build the two AI-powered features that make StudyPilot AI genuinely "AI-powered": automatic plan sequencing and conversational study guidance.

### 📖 What I'll learn
- Prompt engineering for structured, reliable outputs (JSON-formatted responses)
- Building a simple chat UI with conversation history
- Merging AI output back into an existing data model safely

### 🛠 Features to build
- "Organize with AI" action on a goal: sends its task list to Claude, receives a suggested schedule (which tasks for which days), and updates `scheduledDate` on each task
- Chat screen: a simple conversational UI where the student can ask "what should I study today?" or request re-planning, with the AI able to reference the student's actual current goals/tasks/progress

### 📝 Step-by-step implementation plan
1. **Plan Customization:**
   - In `js/ai.js`, add `async function organizeGoalWithAI(goal)`.
   - Build a prompt instructing Claude to act as a study planner: given a list of task titles (no invented tasks), assign each a `scheduledDate` over a reasonable number of upcoming days, considering realistic daily pacing (e.g. 1–3 tasks/day depending on count). **Critically instruct Claude to respond with ONLY valid JSON** in a fixed shape, e.g. `{ "schedule": [{ "taskId": "...", "scheduledDate": "YYYY-MM-DD" }] }`.
   - Parse the JSON response defensively (try/catch; if parsing fails, show a friendly error and let the user retry rather than corrupting task data).
   - On success, apply the returned `scheduledDate` values to the corresponding tasks via existing `editTask()` calls from `store.js`.
   - Add an "Organize with AI" button on each goal's detail view (built Day 3) that triggers this flow, with a loading state while waiting for the response.
2. **Chat Guidance:**
   - Build `js/chat.js` with a simple chat UI: message list + text input + send button, styled consistently with the rest of the app.
   - Maintain a lightweight in-memory conversation history array for the session (persisting full chat history to localStorage is a nice-to-have, not required for v1.0).
   - Before sending a user message to Claude, construct a context-aware prompt that includes a compact summary of the student's current goals, today's task list (from `getTodayTasks()`), and current streak — so the AI's answers are grounded in their real data, not generic advice.
   - Support at least two practical intents well: "what should I study today" (should reference actual Today-view tasks) and general re-planning/motivation questions.
   - Render Claude's response as a normal chat bubble; keep responses reasonably short via prompt instruction (e.g. "answer in 2-4 sentences unless asked for detail").
3. Remove the Day 6 debug "Test AI Connection" button now that real AI UI exists.

### 📂 Files and folders to create or modify
```
js/
├── ai.js     (modified — add organizeGoalWithAI, buildChatPrompt/context functions)
├── chat.js   (new — chat UI rendering + send/receive handlers)
├── goals.js  (modified — add "Organize with AI" button + loading state)
└── app.js    (modified — remove debug button, wire Chat tab to chat.js)
css/
└── components.css (modified — chat bubble, chat input bar, loading spinner styles)
```

### 🔗 APIs, libraries, services, or tools to integrate
- Existing Claude API connection from Day 6 (same Netlify Function, different prompts).

### 🧪 Testing tasks
- Run "Organize with AI" on a goal with 5–8 tasks — confirm scheduled dates are applied sensibly and Today view reflects them afterward.
- Test with a goal that has zero tasks — confirm graceful handling (button disabled or friendly message).
- Ask the chat "what should I study today?" — confirm the answer references actual current tasks, not generic filler.
- Test a malformed/unexpected AI response (can simulate by temporarily tweaking the prompt) — confirm the app doesn't crash and shows a clear error instead.

### 🐞 Common issues and debugging tips
- **AI returns extra text around the JSON** ("Here's your schedule: {...}"): strengthen the prompt to explicitly forbid any text outside the JSON object, and as a safety net, extract the first `{...}` substring via regex before parsing.
- **Scheduled dates land on unrealistic days** (e.g. all on one day): make the prompt explicit about pacing constraints (e.g. "no more than 2-3 tasks per day") rather than leaving it to the model's judgment alone.
- **Chat answers feel generic**: confirm the context summary (goals/tasks/streak) is actually being included in the prompt sent to Claude — log the full prompt to console during testing to verify.
- **Slow responses feel broken**: always show a visible loading indicator during any AI call so it's clear the app is working, not frozen.

### ✅ End-of-day checklist
- [ ] "Organize with AI" successfully schedules a goal's tasks and updates Today view accordingly
- [ ] Chat can answer "what should I study today" grounded in real data
- [ ] Errors (bad JSON, network failure) are handled gracefully, never crash the app
- [ ] Debug button removed

### 📸 Expected project state and screenshots to capture
- Screenshot of a goal before and after "Organize with AI".
- Screenshot of a chat conversation asking for today's guidance.

### ➡️ Handoff notes for Day 8
Both core AI features are functional. The app is now feature-complete per the PRD (F1–F8 all implemented, minus resource attachment). Day 8 adds the lightweight resource attachment feature (F7) and does a full UI/UX polish pass across every screen — no new architecture, just refinement.

---

## Day 8 — Resource Attachment + Full Polish Pass

### 🎯 Objective
Add the last missing feature (link/note attachment per task) and bring every screen up to a portfolio-ready visual standard.

### 📖 What I'll learn
- Adding a small feature to an existing data model without breaking it
- Doing a systematic design QA pass (consistency, spacing, contrast, responsiveness)
- Micro-interactions that make an app feel "premium" (transitions, hover states, empty states)

### 🛠 Features to build
- Attach one link or note per task (edit/view/remove)
- Full visual polish pass: consistent spacing, hover/active states, transitions, refined empty states, mobile responsiveness check

### 📝 Step-by-step implementation plan
1. Extend the task edit UI (from Day 3's `goals.js`) with a small "Add resource" affordance per task: a toggle between "Link" and "Note" input, saving into the existing `task.resource = { type, value }` field already defined in the Day 3 data model.
2. Display an icon or small badge on tasks that have a resource attached (in both Goals detail view and Today view), clicking it opens the link in a new tab or shows the note text in a small popover/tooltip.
3. Add ability to remove/edit an existing resource.
4. **Design polish checklist** — go screen by screen (Goals list, Goal detail, Today, Chat):
   - Consistent spacing using the `--space-*` variables from Day 2 (no ad-hoc pixel values).
   - Hover and active states on all buttons/cards (subtle scale, brightness, or border color shift).
   - Smooth transitions on state changes (task check-off, tab switching, AI loading states) — CSS `transition` on opacity/transform is sufficient, no animation library needed.
   - Refine every empty state (no goals yet, no tasks yet, Today empty, chat empty) with a friendly message and clear next action.
   - Test at common breakpoints (mobile ~375px, tablet ~768px, desktop) and fix any overflow/wrapping issues, particularly in the heatmap and chat UI.
   - Consistent icon usage (pick one simple approach — e.g. a small inline SVG icon set or Unicode glyphs consistently, don't mix styles).
5. Do a full manual click-through of every feature built Days 2–7 to catch anything visually broken or inconsistent before testing day.

### 📂 Files and folders to create or modify
```
js/
├── goals.js  (modified — add resource attach/edit/remove UI)
└── today.js  (modified — show resource badge on tasks)
css/
└── components.css (modified — resource badge/popover, refined hover/transition states, responsive breakpoints)
```

### 🔗 APIs, libraries, services, or tools to integrate
- None new.

### 🧪 Testing tasks
- Attach a link to a task, refresh, confirm it persists and opens correctly.
- Attach a note to a different task, confirm it displays correctly on hover/click.
- Remove a resource, confirm it's cleared from storage.
- Resize browser to mobile width and click through all four screens (Goals, Goal detail, Today, Chat) — confirm nothing overflows or overlaps.

### 🐞 Common issues and debugging tips
- **Resource data lost on edit**: confirm the resource field is preserved when other task fields are updated (don't accidentally overwrite the whole task object without merging).
- **Layout breaks on mobile**: check for fixed pixel widths that should be `%`/`max-width` instead, and confirm the sidebar nav collapses or adapts sensibly on narrow screens.
- **Inconsistent spacing**: search CSS for hardcoded `px` margin/padding values and replace with the `--space-*` variables where feasible.

### ✅ End-of-day checklist
- [ ] Resource attachment (link or note) works and persists correctly per task
- [ ] Every screen reviewed for spacing/hover/transition consistency
- [ ] All empty states are friendly and actionable
- [ ] App works cleanly at mobile, tablet, and desktop widths

### 📸 Expected project state and screenshots to capture
- Screenshot of a task with an attached resource badge.
- Screenshots of the app at mobile and desktop widths, side by side if possible.

### ➡️ Handoff notes for Day 9
The app is now fully feature-complete (F1–F8) and visually polished. Day 9 shifts to structured testing (functional + edge cases), bug fixing, and the actual deployment to Netlify with the live GitHub integration.

---

## Day 9 — Testing, Bug Fixing & Deployment

### 🎯 Objective
Systematically test the full app, fix any bugs found, and deploy a live, working v1.0 to the public internet via Netlify.

### 📖 What I'll learn
- Structured manual QA/test-case writing
- Deploying a static site with serverless functions to Netlify
- Managing environment variables/secrets in a deployed environment

### 🛠 Features to build
- No new features — this day is testing, fixing, and deployment only.

### 📝 Step-by-step implementation plan
1. **Write and run a manual test pass** covering the full user journey end-to-end:
   - Create a goal → add tasks → organize with AI → check Today view reflects the plan → complete a few tasks → confirm streak/heatmap update → attach a resource → ask the chat a guidance question → refresh browser and confirm everything persisted.
2. **Edge case testing**:
   - Empty states (brand-new user with zero data).
   - A goal with only 1 task, and a goal with 15+ tasks (does "Organize with AI" still behave sensibly?).
   - Rapid consecutive actions (checking multiple tasks quickly) — confirm no state corruption.
   - Simulated AI failure (temporarily break the endpoint URL) — confirm graceful error handling, and that the rest of the app (Goals/Today/Progress) still works without AI.
3. Log every bug found in a simple running list (a markdown checklist is fine), fix them one at a time, re-testing after each fix.
4. **Deployment — step-by-step (will be walked through live with screenshots)**:
   - Push the final code to GitHub (`git add . && git commit -m "v1.0 ready for deployment" && git push`).
   - Create a free Netlify account if not already done, connect it to the GitHub repository.
   - Configure the build: for a static site with a `netlify/functions` folder, Netlify should auto-detect functions; set publish directory to the project root (or wherever `index.html` lives).
   - Add the `ANTHROPIC_API_KEY` environment variable in Netlify's Site Settings → Environment Variables (never committed to the repo).
   - Trigger the first deploy and confirm the live URL works, including the AI features (this proves the environment variable and function are correctly configured in production, not just locally).
5. Test the live deployed URL on both desktop and a phone browser.

### 📂 Files and folders to create or modify
- No new files expected, only bug fixes across existing files based on what testing surfaces.
- Possibly a `TESTING.md` or checklist file documenting the test pass and results.

### 🔗 APIs, libraries, services, or tools to integrate
- Netlify (deployment + environment variables + serverless functions hosting) — free tier.
- GitHub (already connected from Day 2, now used as Netlify's deploy source).

### 🧪 Testing tasks
- Full end-to-end user journey test (see step 1 above).
- Cross-browser check (Chrome + at least one other browser if available).
- Mobile browser check on the live deployed URL.
- Confirm AI features work on the live URL, not just locally (this is the most common deployment failure point — environment variables not set correctly in production).

### 🐞 Common issues and debugging tips
- **Live site works but AI features fail**: almost always a missing/incorrect environment variable in Netlify's dashboard, or the function not deploying — check Netlify's function logs (Site → Functions tab) for the actual error.
- **Deploy succeeds but shows a blank page**: check the publish directory setting matches where `index.html` actually lives.
- **Works locally via `netlify dev` but not after deploy**: confirm there are no hardcoded `localhost` URLs anywhere in the fetch calls — always use relative paths (`/.netlify/functions/ask-claude`).
- **Old cached version showing**: hard-refresh (Ctrl/Cmd+Shift+R) or check Netlify's deploy log to confirm the latest commit actually deployed.

### ✅ End-of-day checklist
- [ ] Full end-to-end test pass completed with all found bugs fixed
- [ ] App deployed and live on a public Netlify URL
- [ ] AI features confirmed working on the live deployed site (not just local)
- [ ] Live site tested on both desktop and mobile

### 📸 Expected project state and screenshots to capture
- Screenshot of the live Netlify URL working in a browser (showing the actual `.netlify.app` domain).
- Screenshot of Netlify's deploy success screen.

### ➡️ Handoff notes for Day 10
The app is live, tested, and functioning end-to-end in production. Day 10 is a final QA/documentation/showcase day — no new bugs are expected, but a last careful look plus preparing the project for public presentation (README, LinkedIn post, demo).

---

## Day 10 — Final QA, Documentation & Showcase

### 🎯 Objective
Do a final quality pass, write proper project documentation, and prepare StudyPilot AI to be shown off — this is the finish line.

### 📖 What I'll learn
- Writing a clear, professional README for a public GitHub repo
- Preparing a project for demonstration (screenshots, walkthrough narrative)
- Reflecting on and articulating a shipped product's story for LinkedIn/interviews

### 🛠 Features to build
- No new product features — documentation, final polish, and showcase materials only.

### 📝 Step-by-step implementation plan
1. **Final QA pass**: repeat the Day 9 end-to-end test on the live URL one more time with fresh eyes (or ask someone else to try it) to catch anything missed.
2. **Write `README.md`** for the GitHub repo, including:
   - One-paragraph project description (can adapt directly from the PRD's Overview section).
   - Screenshot(s) of the app.
   - Feature list (from the PRD's Core Features table).
   - Tech stack summary.
   - Live demo link.
   - Setup instructions for running locally (clone, `netlify dev`, environment variable setup).
   - "Built as part of the AB Talks #60DayClaudeChallenge" mention, consistent with your existing GitHub/LinkedIn documentation pattern.
3. **Capture final showcase assets**:
   - Clean screenshots of Goals, Today (with real streak/heatmap data), and Chat screens.
   - Optional: a short screen recording (even 30-60 seconds) walking through creating a goal → Today view → checking off a task, useful for a LinkedIn post.
4. **Write the LinkedIn / GitHub capstone post**, following your established format (tags: @Anthropic, @ABTalksOnAI, @AnilBajpai; hashtag #60DayClaudeChallenge) — framing StudyPilot AI as the Day 10 capstone outcome of the challenge, with the live link and a short story of the problem → solution → what you learned about AI API integration.
5. Do a final repo cleanup: remove any leftover debug code/console.logs, confirm `.gitignore` correctly excludes secrets, confirm the final commit history is reasonably clean.
6. Step back and do a full demo run-through as if presenting to someone unfamiliar with the project — this surfaces any remaining rough edges better than testing your own familiar flow.

### 📂 Files and folders to create or modify
```
README.md          (new/finalized — full project documentation)
assets/screenshots/ (new — final showcase screenshots)
```

### 🔗 APIs, libraries, services, or tools to integrate
- None new — this day is documentation and final QA only.

### 🧪 Testing tasks
- Full fresh-eyes walkthrough of the live app, ideally by someone other than you, or after a break so you're not testing on autopilot.
- Confirm every link in the README (live demo, GitHub repo) actually works.
- Confirm the repo is public and viewable by others.

### 🐞 Common issues and debugging tips
- **README screenshots look inconsistent**: capture all final screenshots in one sitting, same browser window size, for visual consistency.
- **Forgot to remove debug code**: search the codebase for `console.log` and any leftover Day 6 debug button remnants before the final commit.
- **Live demo breaks right before showcase**: always do one last live-URL test immediately before sharing/posting, since free-tier services can occasionally have cold-start delays on first load — mention this is normal if the very first AI call feels slightly slow.

### ✅ End-of-day checklist
- [ ] Final QA pass completed with no known critical bugs
- [ ] README.md complete with screenshots, features, tech stack, and live link
- [ ] Repo cleaned up (no debug code, no committed secrets)
- [ ] Showcase post drafted, following established #60DayClaudeChallenge format
- [ ] Live app confirmed working one final time

### 📸 Expected project state and screenshots to capture
- Final polished screenshots of all core screens for the README and LinkedIn post.
- Screenshot of the completed GitHub repo page.

### ➡️ Capstone complete
StudyPilot AI v1.0 is live, documented, and ready to be showcased — a fully shipped product taking a real personal problem from idea to deployed AI-powered application in 10 days.

---

## 📎 Appendix: Data Model Reference (for quick lookup any day)

```js
{
  goals: [
    {
      id: "goal_xxx",
      title: "string",
      createdAt: "ISO date string",
      tasks: [
        {
          id: "task_xxx",
          title: "string",
          status: "todo" | "done",
          order: 0,
          scheduledDate: "YYYY-MM-DD" | null,
          resource: { type: "link" | "note", value: "string" } | null,
          completedAt: "ISO date string" | null
        }
      ]
    }
  ]
}
```

Stored under localStorage key: `studypilot_v1`.
