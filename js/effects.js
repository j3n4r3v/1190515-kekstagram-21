'use strict';

(function () {
  const EFFECTS = {
    chrome: `effects__preview--chrome`,
    sepia: `effects__preview--sepia`,
    marvin: `effects__preview--marvin`,
    phobos: `effects__preview--phobos`,
    heat: `effects__preview--heat`,
  };

  const filterScale = document.querySelector(`.img-upload__effect-level`);
  const effectLine = filterScale.querySelector(`.effect-level__depth`);
  const effectLevelPin = filterScale.querySelector(`.effect-level__pin`);
  const effectLevelValue = filterScale.querySelector(`.effect-level__value`);
  const effectLevel = document.querySelector(`.effect-level`);
  const effectLevelLine = effectLevel.querySelector(`.effect-level__line`);
  const effectLevelDepth = effectLevel.querySelector(`.effect-level__depth`);
  const imageUploadPreview = window.scale.imgPreview;

  const effectChangeHandler = (evt) => {
    if (evt.target.matches(`input[type='radio']`)) {
      effectLevelValue.value = MAX_INVERT_VALUE;
      effectLevelPin.style.left = MAX_PERCENT_VALUE + `%`;
      effectLine.style.width = MAX_PERCENT_VALUE + `%`;
      if (evt.target.value in EFFECTS) {
        filterScale.classList.remove(`hidden`);
        imageUploadPreview.removeAttribute(`style`);
        imageUploadPreview.className = EFFECTS[evt.target.value];
      } else if (evt.target.value === `none`) {
        filterScale.classList.add(`hidden`);
        imageUploadPreview.className = ``;
        imageUploadPreview.style.filter = ``;
      }
    }
  };

  const getValueRange = (value, min, max) => {
    return value * (max - min) + min;
  };

  const MAX_GRAYSCALE_VALUE = 1;
  const MAX_SEPIA_VALUE = 1;
  const MAX_INVERT_VALUE = 100;
  const MAX_BLUR_VALUE = 3;
  const MIN_BRIGHTNESS_VALUE = 1;
  const MAX_BRIGHTNESS_VALUE = 3;

  const effectLevelHandler = (levelValue) => {
    const proportion = levelValue / MAX_PERCENT_VALUE;
    if (imageUploadPreview.className.match(`effects__preview--`)) {
      switch (imageUploadPreview.className) {
        case `effects__preview--chrome`:
          imageUploadPreview.style.filter = `grayscale(` + (MAX_GRAYSCALE_VALUE * proportion) + `)`;
          break;
        case `effects__preview--sepia`:
          imageUploadPreview.style.filter = `sepia(` + (MAX_SEPIA_VALUE * proportion) + `)`;
          break;
        case `effects__preview--marvin`:
          imageUploadPreview.style.filter = `invert(` + (MAX_INVERT_VALUE * proportion) + `%)`;
          break;
        case `effects__preview--phobos`:
          imageUploadPreview.style.filter = `blur(` + (MAX_BLUR_VALUE * proportion) + `px)`;
          break;
        case `effects__preview--heat`:
          imageUploadPreview.style.filter = `brightness(` + getValueRange(proportion, MIN_BRIGHTNESS_VALUE, MAX_BRIGHTNESS_VALUE) + `)`;
          break;
        default:
          imageUploadPreview.style.filter = ``;
      }
    }
  };

  const MIN_PERCENT_VALUE = 0;
  const MAX_PERCENT_VALUE = 100;

  effectLevelPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      let pinCoordX = (effectLevelPin.offsetLeft - shift.x);
      const levelLineWidth = effectLevelLine.offsetWidth;
      if (!(pinCoordX < MIN_PERCENT_VALUE || pinCoordX > levelLineWidth)) {
        const pinPoint = pinCoordX / effectLevelLine.offsetWidth;
        effectLevelPin.style.left = pinCoordX + `px`;
        effectLevelValue.value = Math.round(pinPoint * MAX_PERCENT_VALUE);
        effectLevelDepth.style.width = Math.round(pinPoint * MAX_PERCENT_VALUE) + `%`;
        effectLevelHandler(effectLevelValue.value);
      }
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });


  window.effects = {
    effectLevelHandler,
    effectChangeHandler,
    effectLevelPin,
    filterScale
  };

})();
