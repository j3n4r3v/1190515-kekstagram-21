'use strict';
(function () {
  const successHandler = function (response) {
    window.xhrResponse = response;
    const photosFragment = document.createDocumentFragment();
    for (let i = 0; i < window.xhrResponse.length; i++) {
      photosFragment.append(window.mock.renderPhoto(window.xhrResponse[i]));
    }
    window.data.PICTURE_CONTAINER.append(photosFragment);
    window.main = {
      response
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
