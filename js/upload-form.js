'use strict';
(function () {

  const form = window.overlay.form;
  const mainNode = document.querySelector(`main`);
  const uploadSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
  const uploadError = document.querySelector(`#error`).content.querySelector(`.error`);
  const createFragment = document.createDocumentFragment();

  const onUploadSuccess = () => {
    const successTemplate = uploadSuccess.cloneNode(true);
    createFragment.appendChild(successTemplate);
    mainNode.appendChild(createFragment);
    document.addEventListener(`click`, removeWindowSuccessUpload);
    document.addEventListener(`keydown`, onWindowSuccessMessageButtonEscape);
  };

  const removeWindowSuccessUpload = () => {
    document.querySelector(`.success`).remove();
    document.removeEventListener(`click`, removeWindowSuccessUpload);
    document.removeEventListener(`keydown`, onWindowSuccessMessageButtonEscape);
  };

  const onUploadError = () => {
    const errorTemplate = uploadError.cloneNode(true);
    createFragment.appendChild(errorTemplate);
    mainNode.appendChild(createFragment);
    document.addEventListener(`click`, removeWindowErrorUpload);
    document.addEventListener(`keydown`, onWindowErrorMessageButtonEscape);
  };

  const removeWindowErrorUpload = () => {
    document.querySelector(`.error`).remove();
    document.removeEventListener(`click`, removeWindowErrorUpload);
    document.removeEventListener(`keydown`, onWindowErrorMessageButtonEscape);
  };

  const onWindowSuccessMessageButtonEscape = (evt) => {
    if (evt.keyCode === window.utils.KEYDOWN.esc) {
      removeWindowSuccessUpload();
    }
  };

  const onWindowErrorMessageButtonEscape = (evt) => {
    if (evt.keyCode === window.utils.KEYDOWN.esc) {
      removeWindowErrorUpload();
    }
  };

  const submitHundler = (evt) => {
    evt.preventDefault();
    window.upload(new FormData(form), onUploadSuccess, onUploadError);
    window.effects.closeEditWindow();
  };

  form.addEventListener(`submit`, submitHundler);
})();
