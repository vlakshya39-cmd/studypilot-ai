// StudyPilot AI — today.js
// Renders the Today screen: a proactive, prioritized list of tasks pulled
// from getTodayTasks() in store.js. Checking a task off here updates the
// same shared data that Goals screen reads, via window.Store.

const TodayScreen = (function () {
  function render() {
    const root = document.getElementById('today-root');
    if (!root) return;
    const tasks = window.Store.getTodayTasks();
    root.innerHTML = tasks.length === 0 ? renderEmptyState() : renderTaskList(tasks);
    attachEvents(root);
  }

  function renderEmptyState() {
    const hasAnyGoals = window.Store.getGoals().length > 0;
    if (!hasAnyGoals) {
      return `
        <div class="empty-state">
          <div class="empty-state__title">Nothing scheduled yet.</div>
          <p>Add tasks to a goal to get started.</p>
          <button class="button button--primary" id="go-to-goals-btn">Go to Goals</button>
        </div>
      `;
    }
    return `
      <div class="empty-state">
        <div class="empty-state__title">All caught up!</div>
        <p>You've completed everything scheduled for today. Nice work.</p>
      </div>
    `;
  }

  function renderTaskList(tasks) {
    const rows = tasks
      .map(
        (task) => `
        <div class="card task-row" data-task-id="${task.id}" style="margin-bottom:var(--space-2); display:flex; align-items:center; gap:var(--space-3);">
          <input type="checkbox" class="today-task-checkbox" data-task-id="${task.id}"
            aria-label="Mark '${escapeHtml(task.title)}' as done" style="width:18px; height:18px;" />
          <div style="flex:1;">
            <div style="font-size:12px; color:var(--teal); font-family:var(--font-mono); margin-bottom:2px;">${escapeHtml(task.goalTitle)}</div>
            <div>${escapeHtml(task.title)}</div>
          </div>
        </div>
      `
      )
      .join('');

    return `
      <div>${rows}</div>
      <button class="button" id="refresh-today-btn" style="margin-top:var(--space-4);">Refresh priorities</button>
    `;
  }

  function attachEvents(root) {
    root.querySelectorAll('.today-task-checkbox').forEach((box) => {
      box.addEventListener('change', () => {
        // Bug fix (Day 8 QA pass): this used to always set status to 'done'
        // regardless of the checkbox's actual checked state, so unchecking
        // a task did nothing. Now it correctly mirrors the checkbox.
        const newStatus = box.checked ? 'done' : 'todo';
        window.Store.editTask(box.dataset.taskId, { status: newStatus });
        render(); // re-render Today
        if (window.ProgressScreen) window.ProgressScreen.render(); // keep streak/heatmap in sync
      });
    });

    const refreshBtn = root.querySelector('#refresh-today-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', render);
    }

    const goToGoalsBtn = root.querySelector('#go-to-goals-btn');
    if (goToGoalsBtn) {
      goToGoalsBtn.addEventListener('click', () => {
        document.querySelector('.nav-tab[data-screen="goals"]').click();
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

window.TodayScreen = TodayScreen;
