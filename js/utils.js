'use strict';
(function () {
  const MAX_RANDOM_ELEMENTS_AMOUNT = 10;

  const KEYDOWN = {
    ent: `Enter`,
    esc: `Escape`,
  };

  const guid = () => {
    return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0; const v = c === `x` ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const shuffleArr = (array) => {
    const arrayCopy = array.slice();
    const iterations = MAX_RANDOM_ELEMENTS_AMOUNT < arrayCopy.length ? MAX_RANDOM_ELEMENTS_AMOUNT : arrayCopy.length - 1;

    for (let i = 0; i < iterations; i++) {
      const randomIndex = Math.floor(Math.random() * (arrayCopy.length - i)) + i;
      const currentElement = arrayCopy[i];
      arrayCopy[i] = arrayCopy[randomIndex];
      arrayCopy[randomIndex] = currentElement;
    }
    return arrayCopy;
  };

  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

  window.utils = {
    KEYDOWN,
    getRandom,
    getRandomFrom,
    guid,
    shuffleArr,
    MAX_RANDOM_ELEMENTS_AMOUNT
  };

})();
