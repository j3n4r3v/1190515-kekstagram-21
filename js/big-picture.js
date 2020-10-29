'use strict';
(function () {
  const bigPicture = document.querySelector(`.big-picture`);

  const renderBigPicture = (photo) => {
    bigPicture.querySelector(`.big-picture__img img`).setAttribute(`src`, `${photo.url}`);
    bigPicture.querySelector(`.likes-count`).textContent = photo.likes;
    bigPicture.querySelector(`.comments-count`).textContent = photo.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = photo.description;

    bigPicture.querySelector(`.social__comments`).innerHTML = ``;
    renderBigPictureComments(photo.comments, bigPicture.querySelector(`.social__comments`));

    const socialCommentCount = document.querySelector(`.social__comment-count`);
    socialCommentCount.classList.add(`hidden`);

    const commentsLoader = document.querySelector(`.comments-loader`);
    commentsLoader.classList.add(`hidden`);

    const body = document.querySelector(`body`);
    body.classList.add(`modal-open`);
  };

  const renderBigPictureComments = (comments, container) => {
    comments.forEach((comment) => {
      const commentListItem = document.createElement(`li`);
      commentListItem.classList.add(`social__comment`);
      const commentText = document.createElement(`p`);
      commentText.classList.add(`social__text`);
      const commentImage = document.createElement(`img`);
      commentImage.classList.add(`social__picture`);
      commentImage.setAttribute(`src`, `${comment.avatar}`);
      commentImage.setAttribute(`alt`, `${comment.name}`);
      commentImage.setAttribute(`width`, `35`);
      commentImage.setAttribute(`height`, `35`);
      commentText.textContent = comment.message;
      commentListItem.appendChild(commentImage);
      commentListItem.appendChild(commentText);
      container.appendChild(commentListItem);
    });
  };

  window.bigPicture = {
    renderBigPicture
  };

})();
