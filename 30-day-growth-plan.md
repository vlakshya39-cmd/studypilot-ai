# 30-Day Growth Plan — StudyPilot AI

A day-by-day roadmap taking StudyPilot AI from v1.0.0 (local-first MVP) toward a genuinely more complete product. Each day is one achievable milestone, building on the previous day, using the existing stack (vanilla JS, Netlify Functions, Gemini) unless a day explicitly introduces something new. Skip a day if life happens — just resume in order; nothing here is date-locked.

Companion prompt: use `daily-build-prompt.md` each day, just changing the day number.

---

### Week 1 — Harden and polish what already exists
1. **Day 1:** Manual mobile QA pass on the live site (phone-width sidebar, Today view, Chat). Log every visual bug found — don't fix yet.
2. **Day 2:** Fix the top 3 mobile bugs from Day 1.
3. **Day 3:** Add a "last synced/saved" timestamp indicator so users trust that localStorage is actually persisting.
4. **Day 4:** Add a JSON export button (download all goals/tasks/progress as a `.json` file) — first step toward backup and future sync.
5. **Day 5:** Add a matching JSON import (restore from an exported file), with validation against `SCHEMA.md`.
6. **Day 6:** Write 5–10 manual test cases into a `TESTING.md` covering the core flows (add goal, complete task, Organize with AI, chat, streak) so regressions are catchable by hand each release.
7. **Day 7:** Run the full `TESTING.md` checklist end-to-end on production; fix anything it surfaces.

### Week 2 — Make the AI features smarter
8. **Day 8:** Extend the "Organize with AI" prompt in `ai.js` to factor in task difficulty (add a simple difficulty field to tasks first).
9. **Day 9:** Add estimated time per task; feed it into the AI scheduling prompt so daily plans respect realistic time budgets.
10. **Day 10:** Improve the Chat assistant's system prompt to reference the user's current streak and today's task list for more grounded answers.
11. **Day 11:** Add basic conversation memory to Chat (keep last N messages in state, not just the current render) so follow-up questions make sense.
12. **Day 12:** Add a "why this order?" tooltip/explanation on the Today view, generated once per day via a short AI call, explaining the day's prioritization in plain language.
13. **Day 13:** Rate-limit and cache repeated identical AI calls client-side to reduce unnecessary Gemini requests.
14. **Day 14:** Review and tighten `ask-ai.js` error messages so every failure mode (rate limit, bad key, empty response) has a distinct, user-readable message in the UI, not just the console.

### Week 3 — Start the cloud-sync foundation
15. **Day 15:** Research and pick one lightweight auth option (Netlify Identity vs. Supabase Auth) — document the decision and why.
16. **Day 16:** Set up the chosen auth provider in a test project; get login/signup working in isolation.
17. **Day 17:** Add auth screens (sign up / log in / log out) to StudyPilot AI, gated behind a feature flag so v1.0.0 behavior is untouched for now.
18. **Day 18:** Design the cloud data schema (mirrors `SCHEMA.md`, adapted for a real backend) and document it in `SCHEMA.md`.
19. **Day 19:** Build the sync write path — logged-in users' changes go to both localStorage and the cloud.
20. **Day 20:** Build the sync read path — on login, cloud data loads and merges with (or replaces) local data, with a clear conflict rule documented.
21. **Day 21:** End-to-end test the full sync loop across two different browsers/devices with the same account.

### Week 4 — Habit features and launch polish
22. **Day 22:** Add a study-session focus timer (start/stop, logs minutes against the active task) feeding into existing progress data.
23. **Day 23:** Wire the timer's logged minutes into the heatmap so shading reflects actual time studied, not just task completion.
24. **Day 24:** Add a basic PWA manifest + service worker so the site is installable and works offline for already-loaded data.
25. **Day 25:** Add a simple daily reminder mechanism (browser notification permission + a scheduled check) tied to streak risk.
26. **Day 26:** Full accessibility re-audit (keyboard-only navigation through all 3 screens + auth flow, screen-reader labels) now that new screens exist.
27. **Day 27:** Performance pass — check load time and bundle size now that auth/sync/timer code has been added; trim anything unused.
28. **Day 28:** Update `README.md`, `ARCHITECTURE.md`, and `SCHEMA.md` to reflect the auth/sync/timer additions — keep docs matching reality.
29. **Day 29:** Full regression test of every feature (v1.0.0's original 6 plus the month's additions) on the live production deploy.
30. **Day 30:** Tag and release **v1.1.0**, write a short changelog covering the month's work, and post an update alongside the original launch post.

---

**By Day 30, StudyPilot AI goes from:** a solid single-device MVP → a synced, multi-device, habit-forming study companion with a smarter AI layer — without ever abandoning the local-first, zero-cost principles it launched with.
