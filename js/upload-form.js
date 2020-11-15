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
    document.addEventListener(`keydown`, onSuccessMessageEsc);
  };

  const removeSuccessUpload = () => {
    document.querySelector(`.success`).remove();
    document.removeEventListener(`click`, removeSuccessUpload);
    document.removeEventListener(`keydown`, onSuccessMessageEsc);
  };

  const onUploadError = () => {
    const errorTemplate = uploadError.cloneNode(true);
    createFragment.append(errorTemplate);
    mainNode.append(createFragment);
    document.addEventListener(`click`, removeErrorUpload);
    document.addEventListener(`keydown`, onErrorMessageEsc);
  };

  const removeErrorUpload = () => {
    document.querySelector(`.error`).remove();
    document.removeEventListener(`click`, removeErrorUpload);
    document.removeEventListener(`keydown`, onErrorMessageEsc);
  };

  const onSuccessMessageEsc = (evt) => {
    if (evt.key === window.utils.KEYDOWN.esc) {
      removeSuccessUpload();
    }
  };

  const onErrorMessageEsc = (evt) => {
    if (evt.key === window.utils.KEYDOWN.esc) {
      removeErrorUpload();
    }
  };

  const submitHundler = (evt) => {
    evt.preventDefault();
    window.server.upload(new FormData(form), onUploadSuccess, onUploadError);
    window.overlay.closeOverlay();
  };

  form.addEventListener(`submit`, submitHundler);
})();
