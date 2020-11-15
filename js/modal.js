'use strict';
(function () {
  const bigPicture = document.querySelector(`.big-picture`);
  const closeBigPicture = bigPicture.querySelector(`.big-picture__cancel`);
  const socialCommentText = bigPicture.querySelector(`.social__footer-text`);

  const uploadCancel = window.overlay.uploadCancel;
  const closeOverlay = window.overlay.closeOverlay;

  const onBigPictureEscPush = function (evt) {
    if (evt.key === window.utils.KEYDOWN.esc) {
      evt.preventDefault();
      closeModalOpen();
    }
  };

  const modalOpenHandler = (evt) => {
    const targetId = evt.target.closest(`.picture`).getAttribute(`id`);
    const targetObject = window.main.picturesList.find((item) =>
      item.id === targetId);
    window.bigPicture.renderBigPicture(targetObject);
    bigPicture.classList.remove(`hidden`);
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

  window.modal = {
    modalOpenHandler,
  };

})();
