# Day 53 — StudyPilot AI Capstone: Day 3 (Project Setup & Foundation)

## What I Built Today
- Fully configured my local development environment: VS Code, the Live Server extension, and the Netlify CLI.
- Built the complete app shell for **StudyPilot AI** — a dark-themed, single-page layout with working navigation across three screens: Today, Goals, and Chat.
- Built a full CSS design system (colors, fonts, spacing) so every future screen stays visually consistent without hardcoded values.
- Wrote the navigation logic in `js/app.js`, with the Today screen set as the default landing view.
- Set up configuration groundwork for later AI integration (`netlify.toml`, a placeholder serverless function, and a safe `.env.example` template) — no real API logic yet, just the scaffolding in place.
- Verified the "Hello World" milestone: the app runs cleanly in-browser with zero console errors, and all three tabs switch correctly.

## Key Learnings
- **PowerShell execution policies** can silently block npm's global installs on Windows — solved with a one-time `Set-ExecutionPolicy` command. Good reminder that environment setup issues are often OS-level, not code-level.
- **Git requires a configured identity** (`user.name`/`user.email`) before your very first commit on a machine — easy to miss if you jump straight to `git commit`.
- Keeping the architecture **framework-free and backend-free** (per my own approved system design) made today's setup dramatically faster — no build tooling, no dependency graph to debug, just HTML/CSS/JS that runs immediately.
- Documenting environment variables and config **before** they're actually used (`.env.example` ahead of Day 6) makes the eventual AI integration step much lower-risk, since the plumbing is already verified.

## Screenshot
See `hello-world.png` in this folder — the working app shell (Today screen active, dark theme, sidebar navigation) running locally via VS Code Live Server.

## Repository
https://github.com/vlakshya39-cmd/studypilot-ai
