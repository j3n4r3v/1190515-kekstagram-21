'use strict';
(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram`;
  const TIMEOUT = 3000;

  window.upload = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response);
    });

    xhr.addEventListener(`error`, function () {
      onError();
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT;

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
