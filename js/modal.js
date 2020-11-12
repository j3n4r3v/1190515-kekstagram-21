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

  /* const modalOpenHandler = (evt) => {
    const targetId = parseInt(evt.target.closest(`.picture__img`).id, 10);
    const targetObject = window.main.xhrResponseNewArr.find((item) =>
      item.id === targetId);
    if (targetObject) {
      window.bigPicture.renderBigPicture(targetObject);
      bigPicture.classList.remove(`hidden`);
      document.addEventListener(`keydown`, onBigPictureEscPush);
    }
  }; */

  const modalOpenHandler = (evt) => {
    for (let i = 0; i < window.main.xhrResponseNewArr.length; i++) {
      const targetId = parseInt(evt.target.closest(`.picture__img`).id, 10);
      const targetObject = window.main.xhrResponseNewArr[i].id;
      if (targetId === targetObject) {
        window.bigPicture.renderBigPicture(window.main.xhrResponseNewArr[i]);
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

  window.modal = {
    modalOpenHandler
  };

})();
