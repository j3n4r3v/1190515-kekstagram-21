'use strict';
(function () {
  const bigPicture = document.querySelector(`.big-picture`);
  const closeBigPicture = bigPicture.querySelector(`.big-picture__cancel`);
  const socialCommentText = bigPicture.querySelector(`.social__footer-text`);
  const socialCommentCount = document.querySelector(`.social__comment-count`);
  const commentLoader = bigPicture.querySelector(`.comments-loader`);
  const pictures = document.querySelectorAll(`.picture__img`);

  socialCommentCount.classList.add(`hidden`);
  commentLoader.classList.add(`hidden`);

  const onBigPictureEscPush = function (evt) {
    if (evt.key === window.utils.KEYDOWN.esc) {
      evt.preventDefault();
      closeModalOpen();
    }
  };

  const indexPhoto = (picture) => {
    const photoList = pictures;
    return Array.from(photoList).indexOf(picture);
  };

  const modalOpenHandler = (evt) => {
    for (let i = 0; i < window.data.PHOTOS_AMOUNT; i++) {
      const evtTarget = evt.target.classList.contains(`.picture__img`);
      if (evtTarget) {
        const currentIndex = indexPhoto(evtTarget);
        window.bigPicture.renderBigPicture(currentIndex);
        bigPicture.classList.remove(`hidden`);
        document.addEventListener(`keydown`, onBigPictureEscPush);
      }
    }
  };

  pictures.forEach((elm) => {
    elm.addEventListener(`click`, modalOpenHandler);
  });

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

  // Добавил поведение в случае успеха/ошибки

  const successHandler = function (response) {
    const dataServerArr = response;
    const photosFragment = document.createDocumentFragment();
    for (let i = 0; i < dataServerArr.length; i++) {
      photosFragment.append(window.mock.renderPhoto(dataServerArr[i], i));
    }
    window.data.PICTURE_CONTAINER.append(photosFragment);
    window.modal = {
      dataServerArr
    };
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: green;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `50px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.load(successHandler, errorHandler);

})();
