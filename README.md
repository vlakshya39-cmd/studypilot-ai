# StudyPilot AI

**An AI-powered study companion that helps students plan, prioritize, and stay consistent.**

🔗 **Live demo:** https://studypilot-ai-lakshya.netlify.app/
📦 **Repo:** https://github.com/vlakshya39-cmd/studypilot-ai

Built solo as a 10-day capstone project for the [AB Talks 60-Day Claude AI Challenge](https://abtalks.in).

---

## What it does

StudyPilot AI turns a messy list of study goals into a clear, prioritized daily plan:

- **Goals & Tasks** — create study goals (e.g. "Python + DSA"), break them into tasks, and track completion.
- **AI-powered organization** — click "Organize with AI" and Gemini schedules your tasks across upcoming days based on what's realistic.
- **Today view** — a focused, auto-prioritized list of what to work on right now, pulled from all your goals.
- **Resource attachment** — attach a link or note directly to any task, so the material you need is one click away.
- **Streaks & heatmap** — a GitHub-style contribution heatmap and daily streak counter to build consistency.
- **AI chat assistant** — ask "what should I study today?" or "help me re-plan this goal" and get answers grounded in your actual tasks and progress.

## Tech stack

- **Frontend:** Vanilla HTML, CSS, and JavaScript — no frameworks, no build step.
- **AI:** Google Gemini API, called through a Netlify serverless function so the API key never reaches the browser.
- **Data:** Stored locally in the browser via `localStorage` — no backend database, no account required, no data ever leaves your device except the specific text sent to Gemini for AI features.
- **Hosting:** Netlify (free tier), with Netlify Functions for the AI proxy.

## Getting started locally

1. Clone the repo:
   ```
   git clone https://github.com/vlakshya39-cmd/studypilot-ai.git
   cd studypilot-ai
   ```
2. Get a free Gemini API key at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) (no credit card required).
3. Copy `.env.example` to `.env` and add your key:
   ```
   GEMINI_API_KEY=your-key-here
   ```
4. Install the Netlify CLI if you don't have it:
   ```
   npm install -g netlify-cli
   ```
5. Run it locally:
   ```
   netlify dev
   ```
6. Open the URL it prints (usually `http://localhost:8888`).

No other setup, no database, no build step.

## Project structure

See [`PROJECT-STRUCTURE.md`](PROJECT-STRUCTURE.md) for a full breakdown, [`ARCHITECTURE.md`](ARCHITECTURE.md) for how the pieces fit together, and [`SCHEMA.md`](SCHEMA.md) for the data model.

## Development log

This project was built in public over 10 days, with a full day-by-day log of what was built, what broke, and what was learned in [`PROGRESS-LOG.md`](PROGRESS-LOG.md).

## License

MIT — see [`LICENSE`](LICENSE) for details.

## Author

Lakshya Vaishnav — first-year B.Tech CSE student, building in public as part of the #60DayClaudeChallenge.
[LinkedIn](https://linkedin.com/in/lakshya-vaishnav-b82797303)
