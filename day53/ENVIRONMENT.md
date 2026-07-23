# StudyPilot AI — ENVIRONMENT.md

All tools, configuration files, and environment variables used in this project.

## Development Tools

| Tool | Version (as installed) | Purpose |
|---|---|---|
| Git | 2.55.0 | Version control |
| Node.js | v24.18.0 | Runs npm + Netlify CLI |
| Netlify CLI | 26.2.0 | Local dev server matching production, incl. serverless functions |
| VS Code | (user's existing install) | Code editor |
| Live Server (VS Code extension) | latest | Local static file preview with auto-refresh |

## Environment Variables

| Variable | Where it's used | When it's needed | Committed to Git? |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | `netlify/functions/ask-claude.js` | Day 6 (Claude API integration) | **Never** — kept in local `.env` (git-ignored) and set separately in Netlify's dashboard for production |

`.env.example` documents this variable with a placeholder value and IS safe to commit — it contains no real secret, only the variable name.

## Configuration Files

| File | Purpose |
|---|---|
| `netlify.toml` | Tells Netlify the publish directory (`.`) and where serverless functions live (`netlify/functions`) |
| `.gitignore` | Excludes `.env`, `node_modules`, and OS-generated files from version control |
| `.env` | Local-only, real secret values — never committed (excluded via `.gitignore`) |
| `.env.example` | Safe-to-commit template showing which variables are needed, with placeholder values |

## No Database / No Auth Configuration

Per the approved Architecture (`ARCHITECTURE.md`), this project has:
- **No database connection string** — data lives in browser `localStorage`, nothing to configure.
- **No authentication provider/keys** — v1.0 has no login (PRD 5.2, explicitly deferred).

This section is intentionally short — that's a feature of this project's scope, not a gap.

## Local vs Production Environment Differences

| Aspect | Local | Production (Netlify) |
|---|---|---|
| Static files | Served via Live Server or `netlify dev` | Served via Netlify's CDN |
| Serverless function | Runs via `netlify dev` (proxies to real Claude API using local `.env`) | Runs via Netlify's function infrastructure, using the env variable set in Netlify's dashboard |
| API key source | `.env` file (local, git-ignored) | Netlify Site Settings → Environment Variables (set on Day 9) |
