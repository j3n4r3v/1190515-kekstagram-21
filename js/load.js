'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;
  const TIMEOUT = 10000;
  const StatusCode = {
    OK: 200,
  };
  let dataArray = [];

  window.load = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, URL);

    xhr.addEventListener(`load`, function () {
      const dataServerArr = xhr.response;
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        for (let i = 0; i < dataServerArr.length; i++) {
          dataArray.push(dataServerArr[i]);
        }
      } else {
        onError(`Статус ответа` + xhr.status + ` ` + xhr.statusText);
      }
      window.load = {
        dataServerArr,
        dataArray
      };
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT;

    xhr.send();

  };
})();
