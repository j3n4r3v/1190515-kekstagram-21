'use strict';
(function () {
  const modalOpenHandler = window.modal.modalOpenHandler;

  const imgFilters = document.querySelector(`.img-filters`);

  const guid = () => {
    return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0; const v = c === `x` ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const addListeners = () => {
    document.querySelectorAll(`.picture`).forEach((elm) => {
      elm.addEventListener(`click`, modalOpenHandler);
    });
    imgFilters.classList.remove(`img-filters--inactive`);
  };

  const successHandler = function (response) {
    const picturesList = response.map((photo) => {
      const obj = {id: guid()};
      Object.assign(photo, obj);
      return photo;
    });

    window.gallery.addServerPictures(picturesList);
    addListeners();

    window.main = {
      picturesList
    };
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: auto; text-align: center; background-color: green;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `50px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.server.load(successHandler, errorHandler);

  window.main = {
    addListeners
  };

})();
