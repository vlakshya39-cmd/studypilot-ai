# Day 56 — StudyPilot AI Capstone: Day 6 (Complete the MVP & Deliver a Working Demo)

## What I Built Today
- **Switched AI provider from Claude to Gemini** — a deliberate, approved change to keep the entire project on genuinely free tools, since Claude API has no permanent free tier.
- **Secure AI proxy** (`netlify/functions/ask-ai.js`) — a serverless function that safely calls the Gemini API server-side, keeping the API key out of the browser entirely.
- **AI Plan Customization** — an "✨ Organize with AI" button on each goal that sends its task list to Gemini and gets back a realistic day-by-day schedule, applied automatically.
- **AI Chat Guidance** — a real, working chat screen where I can ask things like "what should I study today?" and get answers grounded in my actual goals, tasks, and streak — not generic advice.
- **Required footer** — "Built with Claude as part of the AB Talks 60-Day Claude AI Challenge," visible on every screen of the live app.
- **Full deployment** — the complete app is now live and publicly accessible at **https://studypilot-ai-lakshya.netlify.app/**, with the Gemini API key safely configured as a Netlify environment variable.

## Verified Working (on the LIVE deployed site, not just locally)
- Goal and task creation ✅
- "Organize with AI" scheduling tasks correctly ✅
- Today view showing AI-scheduled tasks ✅
- Chat giving grounded, relevant answers ✅
- Streaks and heatmap still working from previous days ✅
- Footer visible on the live site ✅

## Key Learnings
- **Free-tier API models can change without notice** — I hit three different errors in a row (zero quota on one model, a fully retired model, then a timeout) before landing on `gemini-flash-latest`, a stable alias that always points to Google's current recommended model rather than a specific version that might get deprecated.
- **Querying a provider's live model list directly** (via a simple API call) was far more reliable than guessing model names from documentation that might be outdated.
- **Testing the deployed environment variable is not optional** — a feature working locally doesn't guarantee it's configured correctly in production; I explicitly re-tested every AI feature on the live URL, not just localhost.
- Keeping the **AI layer completely separate and optional** (Goals/Tasks/Today/Progress all work with zero AI dependency) meant that even while debugging the Gemini connection for a while, the rest of the app was never at risk of being "broken."

## Live Demo
**https://studypilot-ai-lakshya.netlify.app/**

## Repository
https://github.com/vlakshya39-cmd/studypilot-ai
