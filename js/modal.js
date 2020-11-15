'use strict';
(function () {
  const bigPicture = document.querySelector(`.big-picture`);
  const closeBigPicture = bigPicture.querySelector(`.big-picture__cancel`);
  const socialCommentText = bigPicture.querySelector(`.social__footer-text`);
  const commentLoader = bigPicture.querySelector(`.comments-loader`);
  const socialCommentCount = document.querySelector(`.social__comment-count`);
  const containerPictures = document.querySelector(`.pictures`);
  const imgFilters = document.querySelector(`.img-filters`);
  const uploadCancel = window.overlay.uploadCancel;
  const closeOverlay = window.overlay.closeOverlay;
  // const getComments = window.bigPicture.getComments;
  // const commentsLoader = window.bigPicture.commentsLoader;

  socialCommentCount.classList.add(`hidden`);
  commentLoader.classList.add(`hidden`);

  const onBigPictureEscPush = function (evt) {
    if (evt.key === window.utils.KEYDOWN.esc) {
      evt.preventDefault();
      closeModalOpen();
    }
  };

  const modalOpenHandler = (evt) => {
    const targetId = evt.target.closest(`.picture`).getAttribute(`id`);
    const targetObject = window.modal.picturesList.find((item) =>
      item.id === targetId);
    window.bigPicture.renderBigPicture(targetObject);
    bigPicture.classList.remove(`hidden`);
    // commentsLoader.addEventListener(`click`, getComments);
    document.addEventListener(`keydown`, onBigPictureEscPush);
  };

  const closeModalOpen = () => {
    bigPicture.classList.add(`hidden`);
    socialCommentText.value = ``;
    document.removeEventListener(`keydown`, onBigPictureEscPush);
  };

  closeBigPicture.addEventListener(`click`, closeModalOpen);

  uploadCancel.addEventListener(`keydown`, (evt) => {
    if (evt.key === window.utils.KEYDOWN.ent) {
      closeOverlay();
    }
  });
  const guid = () => {
    return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0; const v = c === `x` ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const addServerPictures = function (pictures) {
    const photosFragment = document.createDocumentFragment();
    for (let i = 0; i < pictures.length; i++) {
      photosFragment.appendChild(window.mock.renderPhoto(pictures[i]));
    }
    window.data.PICTURE_CONTAINER.appendChild(photosFragment);
  };

  const removeUsersPictures = function () {
    const shownPictures = containerPictures.querySelectorAll(`.picture`);
    shownPictures.forEach(function (picture) {
      containerPictures.removeChild(picture);
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

    addServerPictures(picturesList);
    addListeners();

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
    addServerPictures,
    removeUsersPictures,
    addListeners
  };

})();
