'use strict';

const URL_LOAD = `https://21.javascript.pages.academy/kekstagram/data`;
const URL_UPLOAD = `https://21.javascript.pages.academy/kekstagram/`;
const STATUS_CODE = {
  OK: 200
};
const TIMEOUT = 10000;

const ajax = (method, url, data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === STATUS_CODE.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполнится за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT;

  xhr.open(method, url);
  xhr.send(data);
};

const load = (onSuccess, onError) => {
  ajax(`GET`, URL_LOAD, null, onSuccess, onError);
};

const upload = (data, onSuccess, onError) => {
  ajax(`POST`, URL_UPLOAD, data, onSuccess, onError);
};

window.server = {
  load,
  upload
};
