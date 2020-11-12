'use strict';
(function () {
  const bigPicture = document.querySelector(`.big-picture`);
  const closeBigPicture = bigPicture.querySelector(`.big-picture__cancel`);
  const socialCommentText = bigPicture.querySelector(`.social__footer-text`);
  const socialCommentCount = document.querySelector(`.social__comment-count`);
  const commentLoader = bigPicture.querySelector(`.comments-loader`);

  socialCommentCount.classList.add(`hidden`);
  commentLoader.classList.add(`hidden`);

  const onBigPictureEscPush = function (evt) {
    if (evt.key === window.utils.KEYDOWN.esc) {
      evt.preventDefault();
      closeModalOpen();
    }
  };

  const onBigPictureEntPush = function (evt) {
    if (evt.key === window.utils.KEYDOWN.ent) {
      modalOpenHandler();
    }
  };

  const modalOpenHandler = (evt) => {
    for (let i = 0; i < window.modal.picturesList.length; i++) {
      const targetId = parseInt(evt.target.closest(`.picture__img`).id, 10);
      const targetObject = window.modal.picturesList[i].id;
      if (targetId === targetObject) {
        window.bigPicture.renderBigPicture(window.modal.picturesList[i]);
        bigPicture.classList.remove(`hidden`);
        document.addEventListener(`keydown`, onBigPictureEscPush);
      }
    }
  };

  const closeModalOpen = () => {
    bigPicture.classList.add(`hidden`);
    socialCommentText.value = ``;
    document.removeEventListener(`keydown`, onBigPictureEscPush);
  };

  closeBigPicture.addEventListener(`click`, closeModalOpen);

  window.overlay.uploadCancel.addEventListener(`keydown`, (evt) => {
    if (evt.key === window.utils.KEYDOWN.ent) {
      window.overlay.closeOverlay();
    }
  });

  const createPicturesArray = function (data) {
    const xhrResponseNewArr = data.map((item, index) => {
      item.id = index;
      return item;
    });
    return xhrResponseNewArr;
  };

  const addUsersPictures = function (pictures) {
    const photosFragment = document.createDocumentFragment();
    for (let i = 0; i < pictures.length; i++) {
      photosFragment.append(window.mock.renderPhoto(pictures[i], i));
    }
    window.data.PICTURE_CONTAINER.append(photosFragment);
  };
  const successHandler = function (response) {
    const picturesList = createPicturesArray(response);
    addUsersPictures(picturesList);


    document.querySelectorAll(`.picture`).forEach((elm) => {
      elm.addEventListener(`click`, modalOpenHandler);
      elm.addEventListener(`keydown`, onBigPictureEntPush);
    });

    window.modal = {
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

  window.load(successHandler, errorHandler);

  window.modal = {
    modalOpenHandler,
    addUsersPictures
  };

})();
