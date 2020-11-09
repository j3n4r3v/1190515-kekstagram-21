'use strict';
(function () {

  const form = window.overlay.form;
  const mainNode = document.querySelector(`main`);
  const uploadSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
  const uploadError = document.querySelector(`#error`).content.querySelector(`.error`);
  const createFragment = document.createDocumentFragment();

  const onUploadSuccess = () => {
    const successTemplate = uploadSuccess.cloneNode(true);
    createFragment.append(successTemplate);
    mainNode.append(createFragment);
    document.addEventListener(`click`, removeSuccessUpload);
    document.addEventListener(`keydown`, onSuccessMessageEscape);
  };

  const removeSuccessUpload = () => {
    document.querySelector(`.success`).remove();
    document.removeEventListener(`click`, removeSuccessUpload);
    document.removeEventListener(`keydown`, onSuccessMessageEscape);
  };

  const onUploadError = () => {
    const errorTemplate = uploadError.cloneNode(true);
    createFragment.append(errorTemplate);
    mainNode.append(createFragment);
    document.addEventListener(`click`, removeErrorUpload);
    document.addEventListener(`keydown`, onErrorMessageEscape);
  };

  const removeErrorUpload = () => {
    document.querySelector(`.error`).remove();
    document.removeEventListener(`click`, removeErrorUpload);
    document.removeEventListener(`keydown`, onErrorMessageEscape);
  };

  const onSuccessMessageEscape = (evt) => {
    if (evt.key === window.utils.KEYDOWN.esc) {
      removeSuccessUpload();
    }
  };

  const onErrorMessageEscape = (evt) => {
    if (evt.key === window.utils.KEYDOWN.esc) {
      removeErrorUpload();
    }
  };

  const submitHundler = (evt) => {
    evt.preventDefault();
    window.upload(new FormData(form), onUploadSuccess, onUploadError);
    window.overlay.closeOverlay();
  };

  form.addEventListener(`submit`, submitHundler);
})();
