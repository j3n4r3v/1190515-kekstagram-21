'use strict';
(function () {
  const photo = window.bigPicture.photo;
  const commentsLoader = window.bigPicture.commentsLoader;
  const renderPhoto = window.bigPicture.renderPhoto;
  const onCommentsGetMore = window.bigPicture.onCommentsGetMore;
  const closeModal = photo.querySelector(`.big-picture__cancel`);
  const body = window.overlay.body;
  const picturesContainer = window.data.PICTURES_CONTAINER;

  const onModalOpen = (evt) => {
    const targetId = evt.target.closest(`.picture`).getAttribute(`id`);
    const targetObject = window.main.picturesList.find((item) =>
      item.id === targetId);
    renderPhoto(targetObject);
    photo.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    commentsLoader.addEventListener(`click`, onCommentsGetMore);
  };

  const onModalClose = () => {
    photo.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
    commentsLoader.classList.remove(`hidden`);
    document.removeEventListener(`keydown`, onModalEscPush);
    closeModal.removeEventListener(`click`, onModalClose);
    commentsLoader.removeEventListener(`click`, onCommentsGetMore);
  };

  const onModalEscPush = (evt) => {
    if (evt.key === window.utils.KEYDOWN.esc) {
      evt.preventDefault();
      onModalClose();
    }
  };

  const onModalCloseButton = () => {
    onModalClose();
  };

  const addClosePhoto = () => {
    closeModal.addEventListener(`click`, onModalCloseButton);
    document.addEventListener(`keydown`, onModalEscPush);
  };

  const onClickPicturesContainer = (evt) => {
    if (evt.target.classList.contains(`picture`) || evt.target.classList.contains(`picture__img`)) {
      onModalOpen(evt);
      addClosePhoto();
    }
  };

  picturesContainer.addEventListener(`click`, onClickPicturesContainer);

  window.modalClick = {
    onModalOpen
  };

})();
