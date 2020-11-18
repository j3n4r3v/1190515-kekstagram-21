'use strict';
(function () {

  const form = window.scale.form;
  const onСlose = window.overlay.onСlose;
  const mainNode = document.querySelector(`main`);
  const uploadSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
  const uploadError = document.querySelector(`#error`).content.querySelector(`.error`);
  const createFragment = document.createDocumentFragment();

  const onUploadSuccess = () => {
    const successTemplate = uploadSuccess.cloneNode(true);
    createFragment.append(successTemplate);
    mainNode.append(createFragment);
    document.addEventListener(`click`, onRemoveSuccessUpload);
    document.addEventListener(`keydown`, onSuccessMessageEsc);
  };

  const onRemoveSuccessUpload = () => {
    document.querySelector(`.success`).remove();
    document.removeEventListener(`click`, onRemoveSuccessUpload);
    document.removeEventListener(`keydown`, onSuccessMessageEsc);
  };

  const onUploadError = () => {
    const errorTemplate = uploadError.cloneNode(true);
    createFragment.append(errorTemplate);
    mainNode.append(createFragment);
    document.addEventListener(`click`, onRemoveErrorUpload);
    document.addEventListener(`keydown`, onErrorMessageEsc);
  };

  const onRemoveErrorUpload = () => {
    document.querySelector(`.error`).remove();
    document.removeEventListener(`click`, onRemoveErrorUpload);
    document.removeEventListener(`keydown`, onErrorMessageEsc);
  };

  const onSuccessMessageEsc = (evt) => {
    if (evt.key === window.utils.KEYDOWN.esc) {
      onRemoveSuccessUpload();
    }
  };

  const onErrorMessageEsc = (evt) => {
    if (evt.key === window.utils.KEYDOWN.esc) {
      onRemoveErrorUpload();
    }
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    window.server.upload(new FormData(form), onUploadSuccess, onUploadError);
    onСlose();
  };

  form.addEventListener(`submit`, onSubmit);
})();
