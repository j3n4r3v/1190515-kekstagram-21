'use strict';
(function () {

  const upload = document.querySelector(`#upload-file`);
  const uploadOverlay = document.querySelector(`.img-upload__overlay`);
  const uploadCancel = uploadOverlay.querySelector(`#upload-cancel`);
  const body = document.querySelector(`body`);

  const imgPreview = window.scale.imgPreview;
  const form = window.scale.form;
  const commentsText = window.scale.commentsText;
  const scaleDecrease = window.scale.scaleDecrease;
  const scaleIncrease = window.scale.scaleIncrease;
  const decreaseScale = window.scale.decreaseScale;
  const increaseScale = window.scale.increaseScale;


  const onOverlayEscPush = (evt) => {
    if (window.form.hashtagsText === document.activeElement || commentsText === document.activeElement) {
      return;
    }
    if (evt.key === window.utils.KEYDOWN.esc) {
      closeOverlay();
    }
    return;
  };

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
    form,
    closeOverlay,
    body
  };

})();
