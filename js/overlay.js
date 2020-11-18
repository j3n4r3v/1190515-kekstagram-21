'use strict';
(function () {

  const upload = document.querySelector(`#upload-file`);
  const uploadOverlay = document.querySelector(`.img-upload__overlay`);
  const uploadCancel = uploadOverlay.querySelector(`#upload-cancel`);
  const body = document.querySelector(`body`);

  const imgPreview = window.scale.imgPreview;
  const form = window.scale.form;
  const commentsText = window.scale.commentsText;
  const sizeDecrease = window.scale.sizeDecrease;
  const sizeIncrease = window.scale.sizeIncrease;
  const onDecrease = window.scale.onDecrease;
  const onIncrease = window.scale.onIncrease;


  const onOverlayEscPush = (evt) => {
    if (window.form.textHashtags === document.activeElement || commentsText === document.activeElement) {
      return;
    }
    if (evt.key === window.utils.KEYDOWN.esc) {
      onСlose();
    }
  };

  const onOpen = () => {
    uploadOverlay.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    window.effects.filterScale.classList.add(`hidden`);
    document.addEventListener(`keydown`, onOverlayEscPush);
    sizeDecrease.addEventListener(`click`, onDecrease);
    sizeIncrease.addEventListener(`click`, onIncrease);
    window.form.textHashtags.addEventListener(`input`, window.form.onTextHashtagsInput);
    window.effects.onLevelPin.addEventListener(`mouseup`, window.effects.onLevel);
    window.form.textDescription.addEventListener(`input`, window.form.onTextDescriptionInput);
    form.addEventListener(`change`, window.effects.onChange);
    form.addEventListener(`submit`, window.form.onSubmit);
  };

  const onСlose = () => {
    uploadOverlay.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onOverlayEscPush);
    sizeDecrease.removeEventListener(`click`, onDecrease);
    sizeIncrease.removeEventListener(`click`, onIncrease);
    window.form.textHashtags.removeEventListener(`input`, window.form.onTextHashtagsInput);
    window.effects.onLevelPin.removeEventListener(`mouseup`, window.effects.onLevel);
    window.form.textDescription.removeEventListener(`input`, window.form.onTextDescriptionInput);
    form.removeEventListener(`change`, window.effects.onChange);
    form.removeEventListener(`submit`, window.form.onSubmit);
    upload.value = ``;
    imgPreview.style.transform = `scale(1)`;
    imgPreview.style.filter = ``;
    imgPreview.className = ``;
    window.form.textHashtags.value = ``;
    window.scale.form.reset();
  };

  upload.addEventListener(`change`, onOpen);

  uploadCancel.addEventListener(`click`, onСlose);

  window.overlay = {
    onСlose,
    body
  };

})();
