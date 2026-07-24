// StudyPilot AI — store.js
// The single source of truth for all app data. No other file touches
// localStorage directly. Every screen calls the functions exported here.

const STORAGE_KEY = 'studypilot_v1';

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

// ---------- Query helpers (used by later days too) ----------

function getTodayTasks() {
  // Placeholder-safe minimal version — full prioritization logic arrives Day 4 (Blueprint numbering)/Day 5 (capstone).
  const todos = [];
  getGoals().forEach((goal) => {
    goal.tasks
      .filter((t) => t.status === 'todo')
      .forEach((t) => todos.push({ ...t, goalTitle: goal.title }));
  });
  return todos;
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
  getTodayTasks,
};
