'use strict';
(function () {
  const STEP = 25;
  const MIN_SCALE = 25;
  const MAX_SCALE = 100;
  const scaleDecrease = document.querySelector(`.scale__control--smaller`);
  const scaleIncrease = document.querySelector(`.scale__control--bigger`);
  const scaleValue = document.querySelector(`.scale__control--value`);
  const form = document.querySelector(`.img-upload__form`);
  const imgPreview = form.querySelector(`.img-upload__preview img`);
  const commentsText = form.querySelector(`.text__description`);

  const setScaleValue = (value) => {
    if (value - STEP < MIN_SCALE) {
      scaleValue.value = `${MIN_SCALE}%`;
      imgPreview.style.transform = `scale(${MIN_SCALE / 100})`;
    } else if (value + STEP > MAX_SCALE) {
      scaleValue.value = `${MAX_SCALE}%`;
      imgPreview.style.transform = `scale(${MAX_SCALE / 100})`;
    } else {
      scaleValue.value = `${value}%`;
      imgPreview.style.transform = `scale(${value / 100})`;
    }
  };

  const decreaseScale = () => {
    const currentValue = scaleValue.value;
    setScaleValue(parseInt(currentValue, 10) - STEP);
  };

  const increaseScale = () => {
    const currentValue = scaleValue.value;
    setScaleValue(parseInt(currentValue, 10) + STEP);
  };

  scaleDecrease.addEventListener(`click`, function () {
    decreaseScale();
  });

  scaleIncrease.addEventListener(`click`, function () {
    increaseScale();
  });

  window.scale = {
    imgPreview,
    form,
    commentsText,
    scaleDecrease,
    scaleIncrease,
    decreaseScale,
    increaseScale
  };

})();
