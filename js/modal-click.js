'use strict';
(function () {
  const bigPicture = window.bigPicture.bigPicture;
  const commentsLoader = window.bigPicture.commentsLoader;
  const renderBigPicture = window.bigPicture.renderBigPicture;
  const moreLoadComments = window.bigPicture.moreLoadComments;
  const closeModal = bigPicture.querySelector(`.big-picture__cancel`);

  // const body = window.overlay.body;

  const picturesContainer = window.data.PICTURE_CONTAINER;

  const modalOpen = (evt) => {
    const targetId = evt.target.closest(`.picture`).getAttribute(`id`);
    const targetObject = window.main.picturesList.find((item) =>
      item.id === targetId);
    renderBigPicture(targetObject);
    bigPicture.classList.remove(`hidden`);
    // body.classList.add(`modal-open`);
  };

  const modalClose = () => {
    bigPicture.classList.add(`hidden`);
    // body.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onModalEscPush);
    closeModal.removeEventListener(`click`, modalClose);
    commentsLoader.removeEventListener(`click`, moreLoadComments);
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
    if (evt.target.classList.contains(`picture__img`)) {
      modalOpen(evt);
      addCloseHandlers();
    }
  };

  picturesContainer.addEventListener(`click`, picturesContainerClickHandler);

  window.modalClick = {
    modalOpen
  };

})();
