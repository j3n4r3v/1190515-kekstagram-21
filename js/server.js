'use strict';

const URL_LOAD = `https://21.javascript.pages.academy/kekstagram/data`;
const URL_UPLOAD = `https://21.javascript.pages.academy/kekstagram/`;
const STATUS_CODE = {
  OK: 200,
  REQUEST_ERROR: 400,
  ACCESS_ERROR: 403,
  NOT_FOUND_ERROR: 404,
  SERVER_ERROR: 500,
  RESPONSE_ERROR: 502,
  SERVICE_UNAVIALABLE: 503
};
const TIMEOUT = 10000;

const loadOrUpload = (method, url, data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === STATUS_CODE.OK) {
      onSuccess(xhr.response);
    } else {
      switch (xhr.status) {
        case STATUS_CODE.REQUEST_ERROR:
          onError(`Ошибка 400: Неверный запрос`);
          break;
        case STATUS_CODE.ACCESS_ERROR:
          onError(`Ошибка 403: Доступ запрещен`);
          break;
        case STATUS_CODE.NOT_FOUND_ERROR:
          onError(`Ошибка 404: Ничего не найдено`);
          break;
        case STATUS_CODE.SERVER_ERROR:
          onError(`Ошибка 500: Ошибка сервера`);
          break;
        case STATUS_CODE.RESPONSE_ERROR:
          onError(`Ошибка 502: Неверный ответ сервера`);
          break;
        case STATUS_CODE.SERVICE_UNAVIALABLE:
          onError(`Ошибка 503: Сервер временно недоступен`);
          break;
        default:
          onError(`Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText);
      }
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
  loadOrUpload(`GET`, URL_LOAD, null, onSuccess, onError);
};

const upload = (data, onSuccess, onError) => {
  loadOrUpload(`POST`, URL_UPLOAD, data, onSuccess, onError);
};

window.server = {
  load,
  upload
};
