// StudyPilot AI — progress.js
// Renders the streak badge (in the Today screen header) and the calendar
// heatmap (embedded at the bottom of the Today screen). Reads exclusively
// from window.Store's aggregation functions — no data logic lives here.

const ProgressScreen = (function () {
  function render() {
    renderStreakBadge();
    renderHeatmap();
  }

  function renderStreakBadge() {
    const badge = document.getElementById('streak-badge');
    if (!badge) return;
    const streak = window.Store.getCurrentStreak();
    badge.textContent = `\uD83D\uDD25 ${streak}-day streak`;
  }

  function renderHeatmap() {
    const root = document.getElementById('heatmap-root');
    if (!root) return;

    const data = window.Store.getHeatmapData(13); // 13 weeks = ~91 days
    const maxCount = Math.max(1, ...data.map((d) => d.count));

    // Pad the front so the grid's first column aligns to a Sunday.
    const firstDate = new Date(data[0].date);
    const leadingPad = firstDate.getDay(); // 0 = Sunday
    const cells = [];
    for (let i = 0; i < leadingPad; i++) cells.push(null);
    data.forEach((d) => cells.push(d));

    const columns = Math.ceil(cells.length / 7);

    let html = `<div style="display:grid; grid-auto-flow:column; grid-template-rows:repeat(7, 12px); gap:3px; overflow-x:auto; padding-bottom:4px;">`;
    cells.forEach((cell) => {
      if (!cell) {
        html += `<div style="width:12px; height:12px;"></div>`;
      } else {
        const shade = shadeForCount(cell.count, maxCount);
        html += `<div title="${cell.date}: ${cell.count} completed" style="width:12px; height:12px; border-radius:2px; background:${shade};"></div>`;
      }
    });
    html += `</div>`;

    root.innerHTML = `
      <div class="screen-title" style="font-size:16px; margin-top:var(--space-6);">Progress</div>
      ${html}
    `;
  }

  function shadeForCount(count, maxCount) {
    if (count === 0) return 'var(--bg-surface)';
    const ratio = count / maxCount;
    if (ratio > 0.75) return 'var(--teal)';
    if (ratio > 0.5) return '#22a396';
    if (ratio > 0.25) return '#1c8177';
    return 'var(--teal-deep)';
  }

  return { render };
})();

window.ProgressScreen = ProgressScreen;
