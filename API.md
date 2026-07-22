# StudyPilot AI — API Design

**Design note (not a scope change):** StudyPilot AI has no traditional REST backend — this was decided in the PRD and reconfirmed in today's tech stack. So "API" here means two things, both documented below:
1. **The one external HTTP endpoint** — the Netlify Function that proxies Claude API calls.
2. **The internal data-layer API** — the function contract in `store.js` that every UI screen uses instead of HTTP calls, since Goals/Tasks/Today/Progress never leave the browser.

Documenting the internal API matters just as much here, since it's the actual interface implementation will be built against on Days 3–5.

---

## Part A — External HTTP Endpoint

### `POST /.netlify/functions/ask-claude`

**Purpose:** Securely proxy a prompt to the Claude API without exposing the API key client-side. Used by both AI Plan Customization and Chat Guidance (Day 6–7).

**Request**
```json
{
  "prompt": "string, required, the fully-assembled prompt text",
  "maxTokens": 1024
}
```
| Field | Type | Required | Notes |
|---|---|---|---|
| `prompt` | string | yes | Built client-side in `ai.js`; already includes any context (task lists, goal titles, etc.) |
| `maxTokens` | integer | no | Defaults to a sane value server-side if omitted |

**Response — success (200)**
```json
{
  "text": "string — Claude's raw text response"
}
```

**Response — error**
```json
{
  "error": "string — human-readable message"
}
```

| Status | Case |
|---|---|
| 200 | Success |
| 400 | Missing/empty `prompt` in request body |
| 401 | API key missing or invalid on the server (misconfiguration, not a user error) |
| 429 | Rate limited by Anthropic — surfaced as "please try again in a moment" client-side |
| 500 | Unexpected server/function error |

**Validation**
- `prompt` must be a non-empty string, reasonable max length (e.g. 8,000 chars) to avoid runaway requests.
- No user-supplied HTML/script is ever rendered unescaped from this response (chat messages render as plain text).

**Authentication**
- None on this endpoint itself (v1.0 has no user accounts — see PRD 5.2). The Claude API key is a **server-side secret** (Netlify environment variable), never exposed to the browser. This endpoint is effectively public in the sense that anyone with your deployed URL could technically call it — acceptable for a free-tier personal capstone project; documented here as a known v1.0 limitation, not something to solve today.

**Error handling on the client (`ai.js`)**
- Network failure or non-200 response → caught, surfaced as a friendly in-UI message ("AI is temporarily unavailable — you can still manage your goals and tasks manually"), never a raw crash. This directly satisfies the PRD's Resilience requirement.

---

## Part B — Internal Data-Layer API (`store.js`)

This is the contract every screen (`goals.js`, `today.js`, `progress.js`, `chat.js`) programs against. No screen touches `localStorage` directly.

### State access
| Function | Purpose | Returns |
|---|---|---|
| `loadState()` | Read + parse persisted state, with safe fallback | `AppState` |
| `saveState(state)` | Persist state | `void` |
| `getState()` | Get current in-memory state (after load) | `AppState` |

### Goal operations
| Function | Purpose | Validation | Error case |
|---|---|---|---|
| `addGoal(title)` | Create a new goal | `title` non-empty, ≤80 chars | Throws/returns `null` on invalid title; UI shows inline message |
| `deleteGoal(goalId)` | Remove a goal + its tasks | `goalId` must exist | No-op + console warning if not found |
| `getGoals()` | List all goals | — | Returns `[]` if none |
| `getGoalById(goalId)` | Fetch one goal | — | Returns `undefined` if not found — UI must handle this |

### Task operations
| Function | Purpose | Validation | Error case |
|---|---|---|---|
| `addTask(goalId, title)` | Add task to a goal | `goalId` exists, `title` non-empty ≤140 chars | Returns `null` on invalid input |
| `editTask(taskId, updates)` | Update any task fields | Merges into existing task, doesn't overwrite untouched fields | Returns `null` if `taskId` not found |
| `deleteTask(taskId)` | Remove a task | — | No-op if not found |
| `getTodayTasks()` | Prioritized list for Today view | — | Returns `[]` if nothing eligible (empty state) |

### Progress operations
| Function | Purpose | Returns |
|---|---|---|
| `getCompletionsByDate()` | Aggregate completions by day | `{ "YYYY-MM-DD": count }` |
| `getCurrentStreak()` | Consecutive-day streak count | integer |

### AI operations (`ai.js`, calls Part A internally)
| Function | Purpose | Returns |
|---|---|---|
| `askClaude(prompt)` | Low-level call to the Netlify Function | `Promise<string>` (text) or throws |
| `organizeGoalWithAI(goal)` | Builds prompt, calls `askClaude`, parses JSON, applies via `editTask` | `Promise<{success, error?}>` |
| `getChatResponse(userMessage)` | Builds context-aware prompt, calls `askClaude` | `Promise<string>` |

**Convention used throughout:** every function that mutates state calls `saveState()` internally before returning — callers never need to remember to persist manually. Every read function tolerates an empty/missing dataset without throwing.
