# StudyPilot AI — SETUP.md

How to get this project running on a fresh machine, from zero.

## Prerequisites

| Tool | Purpose | Install from |
|---|---|---|
| **Git** | Version control | https://git-scm.com/download/win |
| **Node.js (LTS)** | Runs `npm` and the Netlify CLI | https://nodejs.org |
| **VS Code** | Code editor | https://code.visualstudio.com |
| **VS Code extension: Live Server** (by Ritwick Dey) | Runs `index.html` locally with auto-refresh | Install from VS Code's Extensions panel |
| **Netlify CLI** | Runs the project locally exactly like production, including serverless functions | `npm install -g netlify-cli` |

No framework CLI, database SDK, or authentication SDK is required — this project is intentionally a static site with one serverless function (see `ARCHITECTURE.md`).

## First-time setup

1. Clone the repository:
   ```
   git clone https://github.com/vlakshya39-cmd/studypilot-ai.git
   cd studypilot-ai
   ```
2. If Windows blocks npm scripts with an execution policy error, run this once (safe, standard developer setting):
   ```
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Install the Netlify CLI globally (only needs to be done once per machine):
   ```
   npm install -g netlify-cli
   ```
4. Copy the example environment file and fill in real values when needed (not required until Day 6):
   ```
   copy .env.example .env
   ```

## Running the project locally

**Option A — quick view (no AI features yet):**
1. Open the project folder in VS Code.
2. Right-click `index.html` → **"Open with Live Server"**.
3. The app opens at `http://127.0.0.1:5500/index.html`.

**Option B — full local environment (once Netlify Functions are implemented, Day 6+):**
```
netlify dev
```
This serves the static site *and* the serverless function together, exactly mirroring production.

## Verifying it works

- Browser shows the StudyPilot AI app shell with a **Today / Goals / Chat** sidebar.
- Clicking each tab switches the visible screen.
- Browser console (F12 → Console) shows: `StudyPilot AI — app shell loaded successfully.` with no red errors (a `favicon.ico 404` is expected and harmless).

## Deployment

Handled fully on Day 9 — connects this same GitHub repo to Netlify for automatic deploys on every push to `main`.
