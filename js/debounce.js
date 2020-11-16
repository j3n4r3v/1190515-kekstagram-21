'use strict';
(function () {
  const DEBOUNCE_INTERVAL = 500;

  window.debounce = (cb) => {
    let lastTimeout = null;

    return function (...parameters) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
