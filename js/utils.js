'use strict';
(function () {

  const KEYDOWN = {
    ent: `Enter`,
    esc: `Escape`,
  };

  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

  window.utils = {
    KEYDOWN,
    getRandom,
    getRandomFrom
  };

})();
