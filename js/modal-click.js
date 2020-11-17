'use strict';
(function () {
  const bigPhoto = window.bigPicture.bigPhoto;
  const commentsLoader = window.bigPicture.commentsLoader;
  const renderBigPhoto = window.bigPicture.renderBigPhoto;
  const commentsGetMoreHandler = window.bigPicture.commentsGetMoreHandler;
  const closeModal = bigPhoto.querySelector(`.big-picture__cancel`);
  const body = window.overlay.body;
  const picturesContainer = window.data.PICTURES_CONTAINER;

  const modalOpen = (evt) => {
    const targetId = evt.target.closest(`.picture`).getAttribute(`id`);
    const targetObject = window.main.picturesList.find((item) =>
      item.id === targetId);
    renderBigPhoto(targetObject);
    bigPhoto.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    commentsLoader.addEventListener(`click`, commentsGetMoreHandler);
  };

  const modalClose = () => {
    bigPhoto.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
    commentsLoader.classList.remove(`hidden`);
    document.removeEventListener(`keydown`, onModalEscPush);
    closeModal.removeEventListener(`click`, modalClose);
    commentsLoader.removeEventListener(`click`, commentsGetMoreHandler);
  };

  const onModalEscPush = (evt) => {
    if (evt.key === window.utils.KEYDOWN.esc) {
      evt.preventDefault();
      modalClose();
    }
  };

  const closeModalButton = () => {
    modalClose();
  };

  const addCloseHandlers = () => {
    closeModal.addEventListener(`click`, closeModalButton);
    document.addEventListener(`keydown`, onModalEscPush);
  };

  const picturesContainerClickHandler = (evt) => {
    if (evt.target.classList.contains(`picture`) || evt.target.classList.contains(`picture__img`)) {
      modalOpen(evt);
      addCloseHandlers();
    }
  };

  picturesContainer.addEventListener(`click`, picturesContainerClickHandler);

  window.modalClick = {
    modalOpen
  };

})();
