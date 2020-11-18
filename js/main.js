'use strict';
(function () {
  const imgFilters = document.querySelector(`.img-filters`);
  const guid = window.utils.guid;

  const onSuccess = (response) => {
    const picturesList = response.map((photo) => {
      const obj = {id: guid()};
      Object.assign(photo, obj);
      return photo;
    });

    window.gallery.addServerPictures(picturesList);
    imgFilters.classList.remove(`img-filters--inactive`);

    window.main = {
      picturesList
    };
  };

  const onError = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: auto; text-align: center; background-color: green;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `50px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.main = {
    imgFilters
  };

  window.server.load(onSuccess, onError);

})();
