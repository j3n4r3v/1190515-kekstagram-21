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

  const upload = document.querySelector(`#upload-file`);
  const uploadOverlay = document.querySelector(`.img-upload__overlay`);
  const uploadCancel = uploadOverlay.querySelector(`#upload-cancel`);

  const body = document.querySelector(`body`);
  const commentsText = form.querySelector(`.text__description`);

  const onOverlayEscPush = (evt) => {
    if (window.form.hashtagsText === document.activeElement || commentsText === document.activeElement) {
      return;
    }
    if (evt.key === window.utils.KEYDOWN.esc) {
      closeOverlay();
    }
    return;
  };

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

  const openOverlay = function () {
    uploadOverlay.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    window.effects.filterScale.classList.add(`hidden`);
    document.addEventListener(`keydown`, onOverlayEscPush);
    window.form.hashtagsText.addEventListener(`input`, window.form.onTextHashtagsInput);
    window.effects.effectLevelPin.addEventListener(`mouseup`, window.effects.effectLevelHandler);
    form.addEventListener(`change`, window.effects.effectChangeHandler);
    form.addEventListener(`submit`, window.form.formSubmit);
  };

  const closeOverlay = function () {
    uploadOverlay.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onOverlayEscPush);
    scaleDecrease.removeEventListener(`click`, decreaseScale);
    scaleIncrease.removeEventListener(`click`, increaseScale);
    window.form.hashtagsText.removeEventListener(`input`, window.form.onTextHashtagsInput);
    window.effects.effectLevelPin.removeEventListener(`mouseup`, window.effects.effectLevelHandler);
    form.removeEventListener(`change`, window.effects.effectChangeHandler);
    form.removeEventListener(`submit`, window.form.formSubmit);
    upload.value = ``;
    imgPreview.style.transform = `scale(1)`;
    imgPreview.style.filter = ``;
    imgPreview.className = ``;
    window.form.hashtagsText.value = ``;
    window.overlay.form.reset();
  };

  upload.addEventListener(`change`, function () {
    openOverlay();
  });

  uploadCancel.addEventListener(`click`, function () {
    closeOverlay();
  });

  window.overlay = {
    imgPreview,
    uploadCancel,
    form,
    closeOverlay,
    body
  };

})();
