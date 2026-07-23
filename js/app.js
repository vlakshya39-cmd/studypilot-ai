// StudyPilot AI — app.js
// Entry point. Handles navigation between the three top-level screens
// (Today, Goals, Chat). No routing library needed — this is a simple
// single-page app with three show/hide panels.
//
// Data model, CRUD logic, AI integration etc. are NOT wired up yet —
// this file only proves the app shell + navigation works end-to-end.
// Days 3 (data model), 4 (Today logic), 5 (progress), 6-7 (AI), 8 (resources)
// will each add their own dedicated files (store.js, goals.js, today.js, etc.)
// that this file will eventually import/call into.

document.addEventListener('DOMContentLoaded', () => {
  const navTabs = document.querySelectorAll('.nav-tab');
  const screens = document.querySelectorAll('.screen');

  function activateScreen(screenName) {
    screens.forEach((screen) => {
      screen.classList.toggle('active', screen.id === `screen-${screenName}`);
    });
    navTabs.forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.screen === screenName);
    });
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
