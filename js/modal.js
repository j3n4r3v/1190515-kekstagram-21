'use strict';
(function () {
  const photosFragment = document.createDocumentFragment();
  const bigPicture = document.querySelector(`.big-picture`);
  const closeBigPicture = bigPicture.querySelector(`.big-picture__cancel`);
  const socialCommentText = bigPicture.querySelector(`.social__footer-text`);
  const socialCommentCount = document.querySelector(`.social__comment-count`);
  const commentLoader = bigPicture.querySelector(`.comments-loader`);
  // const massivePhotos = window.mock.massivePhotos;

  socialCommentCount.classList.add(`hidden`);
  commentLoader.classList.add(`hidden`);

  const onBigPictureEscPush = function (evt) {
    if (evt.key === window.utils.KEYDOWN.esc) {
      evt.preventDefault();
      closeModalOpen();
    }
  };

  const pictures = document.querySelector(`.pictures`);
  const indexPhoto = (picture) => {
    const photoList = pictures.querySelectorAll(`.picture`);
    return Array.from(photoList).indexOf(picture);
  };


  const modalOpenHandler = (evt) => {
    for (let i = 0; i < window.data.PHOTOS_AMOUNT; i++) {
      const ChoosenPhoto = evt.target.closest(`.picture`);
      if (ChoosenPhoto) {
        const photoId = indexPhoto(ChoosenPhoto);
        window.bigPicture.renderBigPicture(photoId);
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

  window.overlay.uploadCancel.addEventListener(`keydown`, (evt) => {
    if (evt.key === window.utils.KEYDOWN.ent) {
      window.overlay.closeOverlay();
    }
  });

  document.querySelectorAll(`.picture`).forEach((elm) => {
    elm.addEventListener(`click`, modalOpenHandler);
  });

  closeBigPicture.addEventListener(`click`, closeModalOpen);

  // Добавил поведение в случае успеха/ошибки

  const successHandler = function (array) {
    for (let i = 0; i < array.length; i++) {
      photosFragment.append(window.mock.renderPhoto(array[i]));
    }
    window.data.PICTURE_CONTAINER.append(photosFragment);
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.load(successHandler, errorHandler);

})();
