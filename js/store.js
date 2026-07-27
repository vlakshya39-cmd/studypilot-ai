// StudyPilot AI — store.js
// The single source of truth for all app data. No other file touches
// localStorage directly. Every screen calls the functions exported here.

const STORAGE_KEY = 'studypilot_v1';
const TODAY_TASK_LIMIT = 7; // keep the Today list focused, not overwhelming

let state = null; // in-memory cache, populated by loadState()

// ---------- State access ----------

function defaultState() {
  return { schemaVersion: '1', goals: [] };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      state = defaultState();
      return state;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.goals)) {
      state = defaultState();
      return state;
    }
    state = parsed;
    return state;
  } catch (err) {
    console.warn('StudyPilot: failed to load state, resetting.', err);
    state = defaultState();
    return state;
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('StudyPilot: failed to save state.', err);
  }
}

function getState() {
  if (!state) loadState();
  return state;
}

function makeId() {
  return crypto.randomUUID();
}

// ---------- Date helpers (local-date-string based, to avoid timezone bugs) ----------

function todayDateString() {
  return dateToLocalString(new Date());
}

function dateToLocalString(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// ---------- Goal operations ----------

function getGoals() {
  return getState().goals;
}

function getGoalById(goalId) {
  return getState().goals.find((g) => g.id === goalId);
}

function addGoal(title) {
  const trimmed = (title || '').trim();
  if (!trimmed || trimmed.length > 80) return null;
  const goal = {
    id: makeId(),
    title: trimmed,
    createdAt: new Date().toISOString(),
    tasks: [],
  };
  getState().goals.push(goal);
  saveState();
  return goal;
}

function deleteGoal(goalId) {
  const s = getState();
  const idx = s.goals.findIndex((g) => g.id === goalId);
  if (idx === -1) {
    console.warn('StudyPilot: deleteGoal - goal not found', goalId);
    return false;
  }
  s.goals.splice(idx, 1);
  saveState();
  return true;
}

// ---------- Task operations ----------

function addTask(goalId, title) {
  const goal = getGoalById(goalId);
  const trimmed = (title || '').trim();
  if (!goal || !trimmed || trimmed.length > 140) return null;
  const task = {
    id: makeId(),
    goalId,
    title: trimmed,
    status: 'todo',
    order: goal.tasks.length,
    scheduledDate: null,
    resource: null,
    completedAt: null,
  };
  goal.tasks.push(task);
  saveState();
  return task;
}

function findTaskAndGoal(taskId) {
  const goals = getGoals();
  for (const goal of goals) {
    const task = goal.tasks.find((t) => t.id === taskId);
    if (task) return { task, goal };
  }
  return { task: null, goal: null };
}

function editTask(taskId, updates) {
  const { task } = findTaskAndGoal(taskId);
  if (!task) {
    console.warn('StudyPilot: editTask - task not found', taskId);
    return null;
  }
  // Keep completedAt in sync with status automatically.
  if (updates.status) {
    if (updates.status === 'done' && task.status !== 'done') {
      updates.completedAt = new Date().toISOString();
    } else if (updates.status === 'todo') {
      updates.completedAt = null;
    }
  }
  Object.assign(task, updates);
  saveState();
  return task;
}

function deleteTask(taskId) {
  const { task, goal } = findTaskAndGoal(taskId);
  if (!task || !goal) {
    console.warn('StudyPilot: deleteTask - task not found', taskId);
    return false;
  }
  goal.tasks = goal.tasks.filter((t) => t.id !== taskId);
  saveState();
  return true;
}

// ---------- Resource operations ----------

function setTaskResource(taskId, resource) {
  const { task } = findTaskAndGoal(taskId);
  if (!task) {
    console.warn('StudyPilot: setTaskResource - task not found', taskId);
    return null;
  }
  const type = resource && resource.type;
  const value = resource && (resource.value || '').trim();
  if ((type !== 'link' && type !== 'note') || !value || value.length > 500) {
    console.warn('StudyPilot: setTaskResource - invalid resource', resource);
    return null;
  }
  task.resource = { type, value };
  saveState();
  return task;
}

function removeTaskResource(taskId) {
  const { task } = findTaskAndGoal(taskId);
  if (!task) {
    console.warn('StudyPilot: removeTaskResource - task not found', taskId);
    return false;
  }
  task.resource = null;
  saveState();
  return true;
}

// ---------- Today View — Prioritization Logic ----------

function getTodayTasks() {
  const today = todayDateString();
  const goals = getGoals();

  const dueTasks = [];
  const unscheduledByGoal = [];

  goals.forEach((goal) => {
    const unscheduledForThisGoal = [];
    goal.tasks.forEach((task) => {
      if (task.status !== 'todo') return;
      if (task.scheduledDate && task.scheduledDate <= today) {
        dueTasks.push({ ...task, goalTitle: goal.title });
      } else if (!task.scheduledDate) {
        unscheduledForThisGoal.push({ ...task, goalTitle: goal.title });
      }
    });
    if (unscheduledForThisGoal.length > 0) {
      unscheduledByGoal.push({ tasks: unscheduledForThisGoal });
    }
  });

  dueTasks.sort((a, b) => (a.scheduledDate < b.scheduledDate ? -1 : 1));

  const roundRobin = [];
  let anyLeft = true;
  while (anyLeft) {
    anyLeft = false;
    for (const group of unscheduledByGoal) {
      if (group.tasks.length > 0) {
        roundRobin.push(group.tasks.shift());
        anyLeft = true;
      }
    }
  }

  const combined = [...dueTasks, ...roundRobin];
  return combined.slice(0, TODAY_TASK_LIMIT);
}

// ---------- Progress — Streaks & Heatmap ----------

function getCompletionsByDate() {
  const map = {};
  getGoals().forEach((goal) => {
    goal.tasks.forEach((task) => {
      if (task.status === 'done' && task.completedAt) {
        const dateStr = dateToLocalString(new Date(task.completedAt));
        map[dateStr] = (map[dateStr] || 0) + 1;
      }
    });
  });
  return map;
}

function getCurrentStreak() {
  const completions = getCompletionsByDate();
  let streak = 0;
  const cursor = new Date();

  // If today has no completions yet, don't break an existing streak —
  // just start counting from yesterday instead.
  const todayStr = dateToLocalString(cursor);
  if (!completions[todayStr]) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (true) {
    const dStr = dateToLocalString(cursor);
    if (completions[dStr] && completions[dStr] > 0) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

// Returns an array of { date, count } for the last `weeks` weeks (default 13),
// oldest first, suitable for rendering a GitHub-style heatmap grid.
function getHeatmapData(weeks = 13) {
  const completions = getCompletionsByDate();
  const days = weeks * 7;
  const result = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() - (days - 1));

  for (let i = 0; i < days; i++) {
    const dStr = dateToLocalString(cursor);
    result.push({ date: dStr, count: completions[dStr] || 0 });
    cursor.setDate(cursor.getDate() + 1);
  }
  return result;
}

// ---------- Exports (attached to window since this is plain script, no modules/bundler) ----------

window.Store = {
  loadState,
  saveState,
  getState,
  getGoals,
  getGoalById,
  addGoal,
  deleteGoal,
  addTask,
  editTask,
  deleteTask,
  setTaskResource,
  removeTaskResource,
  getTodayTasks,
  todayDateString,
  getCompletionsByDate,
  getCurrentStreak,
  getHeatmapData,
};
