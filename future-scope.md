# Future Scope — StudyPilot AI

StudyPilot AI's v1.0.0 is a solid MVP: Goals/Tasks CRUD, AI-organized scheduling via Gemini, a prioritized Today view, streaks/heatmap, and an AI chat assistant — all running on vanilla JS + localStorage + a Netlify Function proxy. This document lays out how it could realistically grow over the next 3, 6, and 12 months, building on that exact foundation rather than starting over.

---

## Next 3 months — Solidify and go multi-device

The biggest limitation right now is that all data lives in `localStorage` on one browser, on one device. The first priority is removing that ceiling without throwing away the current architecture.

- **Real accounts + cloud sync** — add lightweight auth (e.g. Netlify Identity or Supabase Auth) and move `store.js`'s read/write layer behind a sync interface, so the same local-first UX still works, but data now persists across devices. `store.js` was already written as a single data-access module, which makes this a swap-the-backend job rather than a rewrite.
- **Offline-first sync** — keep localStorage as a cache layer and sync to the cloud in the background, so the app still works with no connection (important for students with patchy data/wifi).
- **Smarter AI scheduling** — extend `ai.js`'s "Organize with AI" call to factor in task difficulty, estimated time, and how consistently a goal is being worked on, rather than a single flat prompt each time.
- **Export/import** — a simple "export my data as JSON" button, both as a backup mechanism and a stepping stone toward the sync work above.
- **Mobile polish pass** — dedicated QA on small screens for the sidebar nav and Today view, since v1.0.0 was primarily built and tested desktop-first.

## Next 6 months — Depth and habit-formation features

With sync in place, the focus shifts to making the app something students actually keep opening every day.

- **Notifications/reminders** — daily nudges ("you haven't logged in today, your streak is at risk") via web push or email, tying directly into the existing streak/heatmap system.
- **Spaced repetition for recurring topics** — detect goals that repeat (e.g. "revise DSA") and suggest resurfacing them at increasing intervals, extending the existing Today-view prioritization logic rather than building a separate feature.
- **Richer resource handling** — right now a task can hold one link/note; expand to multiple attachments per task (files, multiple links, short notes) with a lightweight preview.
- **Study session timer** — a simple focus-timer view that logs time-on-task back into the existing progress data, so the heatmap reflects actual study time, not just completion.
- **Chat assistant memory** — let the Chat screen reference recent conversation history and goal context across sessions, not just the current session's messages.

## Next 12 months — Platform and community features

Once the core product is proven and sticky for individual students, the natural next step is expanding who it serves and how.

- **Native-feeling mobile app** — package the existing vanilla JS frontend as a PWA (installable, offline, home-screen icon) as a low-cost step before considering a full native rewrite.
- **Study groups / shared goals** — optional shared goal boards for students studying the same subject together, building on the sync layer from month 3.
- **Instructor/mentor view** — a read-only dashboard a tutor or mentor could use to see a student's progress (opt-in, privacy-respecting), relevant given Lakshya's own experience learning through structured mentorship during the 60-Day Challenge.
- **Usage-based AI insights** — weekly AI-generated summaries ("you're most productive on Tuesdays, DSA tasks take you 40% longer than estimated") using the accumulated progress data as the new AI feature's input.
- **Open-source community contributions** — with topics, license, and documentation already in place from v1.0.0, actively invite external contributors and first-time open-source contributors from the same student community StudyPilot AI was built for.

---

*This roadmap assumes StudyPilot AI continues as a free, local-first-by-default tool. Any monetization (if pursued) should come after the sync/cloud layer, not before — v1.0.0's zero-account, zero-cost model is a genuine strength worth preserving as long as possible.*
