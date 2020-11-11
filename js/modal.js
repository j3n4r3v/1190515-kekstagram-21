'use strict';
(function () {
  const bigPicture = document.querySelector(`.big-picture`);
  const closeBigPicture = bigPicture.querySelector(`.big-picture__cancel`);
  const socialCommentText = bigPicture.querySelector(`.social__footer-text`);
  const socialCommentCount = document.querySelector(`.social__comment-count`);
  const commentLoader = bigPicture.querySelector(`.comments-loader`);
  const picturesContainer = document.querySelector(`.pictures`);
  const picturesCollection = picturesContainer.querySelectorAll(`.picture > .picture__img`);

  socialCommentCount.classList.add(`hidden`);
  commentLoader.classList.add(`hidden`);

  const onBigPictureEscPush = function (evt) {
    if (evt.key === window.utils.KEYDOWN.esc) {
      evt.preventDefault();
      closeModalOpen();
    }
  };

  const fromArrayPhoto = (photoId) => {
    const photoList = picturesCollection;
    return Array.from(photoList).indexOf(photoId);
  };

  const modalOpenHandler = (selectedPicture) => {
    for (let i = 0; i < window.data.PHOTOS_AMOUNT; i++) {
      const evtTarget = selectedPicture.target.classList.contains(`.picture__img`).id;
      if (evtTarget) {
        const currentPhoto = fromArrayPhoto(evtTarget);
        window.bigPicture.renderBigPicture(currentPhoto);
        bigPicture.classList.remove(`hidden`);
        document.addEventListener(`keydown`, onBigPictureEscPush);
      }
    }
  };

  picturesCollection.forEach((photo) => {
    photo.addEventListener(`click`, modalOpenHandler);
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

})();
