'use strict';
(function () {
  const successHandler = function (response) {
    const xhrResponse = response;
    const xhrResponseNewArr = response.map((item, index) => {
      item.id = index;
      return item;
    });
    // eslint-disable-next-line no-console
    console.log(`xhrResponseNewArr`, xhrResponseNewArr);

    const photosFragment = document.createDocumentFragment();
    for (let i = 0; i < xhrResponseNewArr.length; i++) {
      photosFragment.append(window.mock.renderPhoto(xhrResponseNewArr[i], i));
    }
    window.data.PICTURE_CONTAINER.append(photosFragment);

    const picturesContainer = document.querySelector(`.pictures`);
    const picturesCollection = picturesContainer.querySelectorAll(`.picture`);
    picturesCollection.forEach((photo) => {
      photo.addEventListener(`click`, window.modal.modalOpenHandler);
    });
    window.main = {
      xhrResponseNewArr,
      xhrResponse
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

  window.load(successHandler, errorHandler);

})();
