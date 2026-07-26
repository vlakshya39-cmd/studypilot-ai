// StudyPilot AI — goals.js
// Renders the Goals screen: goal list view and goal detail (task) view.
// Reads/writes exclusively through window.Store (store.js).

const GoalsScreen = (function () {
  let activeGoalId = null; // null = showing goal list; otherwise showing detail

  function render() {
    const root = document.getElementById('goals-root');
    if (!root) return;
    root.innerHTML = activeGoalId ? renderGoalDetail(activeGoalId) : renderGoalList();
    attachEvents(root);
  }

  // ---------- Goal List View ----------

  function renderGoalList() {
    const goals = window.Store.getGoals();

    const newGoalForm = `
      <div class="card" style="margin-bottom:var(--space-5);">
        <form id="new-goal-form" style="display:flex; gap:var(--space-2);">
          <input type="text" id="new-goal-input" placeholder="e.g. Python + DSA"
            style="flex:1; padding:var(--space-2) var(--space-3); border-radius:var(--radius); border:1px solid var(--border); background:var(--bg-surface); color:var(--text-primary); font-family:var(--font-body); font-size:14px;" />
          <button type="submit" class="button button--primary">+ New Goal</button>
        </form>
      </div>
    `;

    if (goals.length === 0) {
      return `
        ${newGoalForm}
        <div class="empty-state">
          <div class="empty-state__title">You haven't created a goal yet.</div>
          <p>Add your first goal above — e.g. "Python + DSA" or a college subject.</p>
        </div>
      `;
    }

    const cards = goals
      .map((goal) => {
        const total = goal.tasks.length;
        const done = goal.tasks.filter((t) => t.status === 'done').length;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        return `
          <div class="card goal-card" data-goal-id="${goal.id}" style="margin-bottom:var(--space-3); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-weight:600; font-size:16px; margin-bottom:4px;">${escapeHtml(goal.title)}</div>
              <div style="color:var(--text-muted); font-size:13px;">${done}/${total} tasks done &middot; ${pct}%</div>
            </div>
            <div style="display:flex; gap:var(--space-2);">
              <button class="button open-goal-btn" data-goal-id="${goal.id}">Open</button>
              <button class="button delete-goal-btn" data-goal-id="${goal.id}">Delete</button>
            </div>
          </div>
        `;
      })
      .join('');

    return `${newGoalForm}<div>${cards}</div>`;
  }

  // ---------- Goal Detail View ----------

  function renderGoalDetail(goalId) {
    const goal = window.Store.getGoalById(goalId);
    if (!goal) {
      activeGoalId = null;
      return renderGoalList();
    }

    const taskRows =
      goal.tasks.length === 0
        ? `<div class="empty-state"><p>Add your first task above to get going.</p></div>`
        : goal.tasks
            .map(
              (task) => `
          <div class="card task-row" data-task-id="${task.id}" style="margin-bottom:var(--space-2); display:flex; align-items:center; gap:var(--space-3);">
            <input type="checkbox" class="task-checkbox" data-task-id="${task.id}" ${task.status === 'done' ? 'checked' : ''} style="width:18px; height:18px;" />
            <div style="flex:1; ${task.status === 'done' ? 'color:var(--text-muted); text-decoration:line-through;' : ''}">
              ${escapeHtml(task.title)}
              ${task.scheduledDate ? `<span style="color:var(--teal); font-size:12px; margin-left:8px; font-family:var(--font-mono);">📅 ${task.scheduledDate}</span>` : ''}
            </div>
            <button class="button delete-task-btn" data-task-id="${task.id}">Delete</button>
          </div>
        `
            )
            .join('');

    return `
      <button class="button" id="back-to-goals-btn" style="margin-bottom:var(--space-4);">&larr; Back to Goals</button>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-4);">
        <h2 style="font-family:var(--font-body); font-size:20px; margin:0;">${escapeHtml(goal.title)}</h2>
        <button class="button button--primary" id="organize-ai-btn" data-goal-id="${goal.id}">✨ Organize with AI</button>
      </div>
      <div id="organize-ai-status" style="margin-bottom:var(--space-3); font-size:13px; color:var(--text-muted);"></div>

      <div class="card" style="margin-bottom:var(--space-5);">
        <form id="new-task-form" style="display:flex; gap:var(--space-2);">
          <input type="text" id="new-task-input" placeholder="Add a task..."
            style="flex:1; padding:var(--space-2) var(--space-3); border-radius:var(--radius); border:1px solid var(--border); background:var(--bg-surface); color:var(--text-primary); font-family:var(--font-body); font-size:14px;" />
          <button type="submit" class="button button--primary">Add</button>
        </form>
      </div>

      <div>${taskRows}</div>
    `;
  }

  // ---------- Event wiring ----------

  function attachEvents(root) {
    const newGoalForm = root.querySelector('#new-goal-form');
    if (newGoalForm) {
      newGoalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = root.querySelector('#new-goal-input');
        const created = window.Store.addGoal(input.value);
        if (created) render();
      });
    }

    root.querySelectorAll('.open-goal-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeGoalId = btn.dataset.goalId;
        render();
      });
    });

    root.querySelectorAll('.goal-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        activeGoalId = card.dataset.goalId;
        render();
      });
    });

    root.querySelectorAll('.delete-goal-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Delete this goal and all its tasks?')) {
          window.Store.deleteGoal(btn.dataset.goalId);
          render();
        }
      });
    });

    const backBtn = root.querySelector('#back-to-goals-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        activeGoalId = null;
        render();
      });
    }

    const newTaskForm = root.querySelector('#new-task-form');
    if (newTaskForm) {
      newTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = root.querySelector('#new-task-input');
        const created = window.Store.addTask(activeGoalId, input.value);
        if (created) render();
      });
    }

    root.querySelectorAll('.task-checkbox').forEach((box) => {
      box.addEventListener('change', () => {
        const newStatus = box.checked ? 'done' : 'todo';
        window.Store.editTask(box.dataset.taskId, { status: newStatus });
        render();
      });
    });

    root.querySelectorAll('.delete-task-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (confirm('Delete this task?')) {
          window.Store.deleteTask(btn.dataset.taskId);
          render();
        }
      });
    });

    const organizeBtn = root.querySelector('#organize-ai-btn');
    if (organizeBtn) {
      organizeBtn.addEventListener('click', async () => {
        const statusBox = root.querySelector('#organize-ai-status');
        organizeBtn.disabled = true;
        organizeBtn.textContent = 'Organizing...';
        statusBox.textContent = 'Asking AI to schedule your tasks...';

        const goal = window.Store.getGoalById(organizeBtn.dataset.goalId);
        const result = await window.organizeGoalWithAI(goal);

        if (result.success) {
          statusBox.textContent = '✅ Tasks scheduled! Check the Today screen.';
          render();
        } else {
          statusBox.textContent = '⚠️ ' + result.error;
          organizeBtn.disabled = false;
          organizeBtn.textContent = '✨ Organize with AI';
        }
      });
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  return { render };
})();

window.GoalsScreen = GoalsScreen;
