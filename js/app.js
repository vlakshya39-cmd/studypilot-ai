// StudyPilot AI — app.js
// Entry point. Handles navigation between the three top-level screens
// (Today, Goals, Chat), and initializes the data layer on load.

document.addEventListener('DOMContentLoaded', () => {
  // Load persisted data (or create default empty state) before anything renders.
  window.Store.loadState();

  const navTabs = document.querySelectorAll('.nav-tab');
  const screens = document.querySelectorAll('.screen');

  function activateScreen(screenName) {
    screens.forEach((screen) => {
      screen.classList.toggle('active', screen.id === `screen-${screenName}`);
    });
    navTabs.forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.screen === screenName);
    });

    // Re-render the Goals screen every time it becomes active, so it always
    // reflects the latest data.
    if (screenName === 'goals' && window.GoalsScreen) {
      window.GoalsScreen.render();
    }
  }

  navTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activateScreen(tab.dataset.screen);
    });
  });

  // Today is the default landing screen (per PRD — proactive by default).
  activateScreen('today');

  console.log('StudyPilot AI — app shell loaded successfully.');
});
