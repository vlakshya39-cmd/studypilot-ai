// StudyPilot AI — app.js
// Entry point. Handles navigation between the three top-level screens
// (Today, Goals, Chat), and initializes the data layer on load.

document.addEventListener('DOMContentLoaded', () => {
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

    if (screenName === 'today') {
      if (window.TodayScreen) window.TodayScreen.render();
      if (window.ProgressScreen) window.ProgressScreen.render();
    }
    if (screenName === 'goals' && window.GoalsScreen) {
      window.GoalsScreen.render();
    }
    if (screenName === 'chat' && window.ChatScreen) {
      window.ChatScreen.render();
    }
  }

  navTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activateScreen(tab.dataset.screen);
    });
  });

  activateScreen('today');

  console.log('StudyPilot AI — app shell loaded successfully.');
});
