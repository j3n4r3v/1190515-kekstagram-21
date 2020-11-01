'use strict';
(function () {
  const effectLevel = window.overlay.filterScale.querySelector(`.effect-level__value`); // Поле уровня эффекта
  const EFFECTS = {
    chrome: `effects__preview--chrome`,
    sepia: `effects__preview--sepia`,
    marvin: `effects__preview--marvin`,
    phobos: `effects__preview--phobos`,
    heat: `effects__preview--heat`,
  };

  const EFFECTS_ACTION = {
    'effects__preview--chrome': {
      filter: `grayscale`,
      unit: ``,
      min: 0,
      max: 1,
    },
    'effects__preview--sepia': {
      filter: `sepia`,
      unit: ``,
      min: 0,
      max: 1,
    },
    'effects__preview--marvin': {
      filter: `invert`,
      unit: `%`,
      min: 0,
      max: 100,
    },
    'effects__preview--phobos': {
      filter: `blur`,
      unit: `px`,
      min: 0,
      max: 3,
    },
    'effects__preview--heat': {
      filter: `brightness`,
      unit: ``,
      min: 1,
      max: 3,
    }
  };
  const effectChangeHandler = function (evt) {
    if (evt.target.matches(`input[type='radio']`)) {
      effectLevel.value = 100;
      if (evt.target.value in EFFECTS) {
        window.overlay.filterScale.classList.remove(`hidden`);
        window.overlay.imgPreview.removeAttribute(`style`);
        window.overlay.imgPreview.className = EFFECTS[evt.target.value];
      } else if (evt.target.value === `none`) {
        window.overlay.filterScale.classList.add(`hidden`);
        window.overlay.imgPreview.className = ``;
        window.overlay.imgPreview.style.filter = ``;
      }
    }
  };

  const getValueRange = function (value, min, max) {
    return value * (max - min) + min;
  };

  const getFilter = function (effect, value) {
    value = getValueRange(value, effect.min, effect.max);
    return `${effect.filter}(${value}${effect.unit})`;
  };

  const effectLevelHandler = function () {
    const value = parseInt(effectLevel.value, 10);
    if (window.overlay.imgPreview.className in EFFECTS_ACTION) {
      window.overlay.imgPreview.style.filter = getFilter(EFFECTS_ACTION[window.overlay.imgPreview.className], value);
      return;
    }
    window.overlay.imgPreview.style.filter = ``;
  };

  window.effects = {
    effectLevelHandler,
    effectChangeHandler
  };

})();
