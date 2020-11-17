'use strict';
(function () {
  const NEW_COMMENTS = 5;
  const bigPhoto = document.querySelector(`.big-picture`);
  const commentsLoader = bigPhoto.querySelector(`.comments-loader`);
  const bigPhotoImg = bigPhoto.querySelector(`.big-picture__img img`);
  const likesCount = bigPhoto.querySelector(`.likes-count`);
  const description = bigPhoto.querySelector(`.social__caption`);
  const commentsCount = bigPhoto.querySelector(`.comments-count`);
  const socialComments = bigPhoto.querySelector(`.social__comments`);
  const socialCommentCount = bigPhoto.querySelector(`.social__comment-count`);
  let photoComments;

  const renderBigPhoto = (currentPhoto) => {
    bigPhotoImg.src = currentPhoto.url;
    likesCount.textContent = currentPhoto.likes;
    description.textContent = currentPhoto.description;
    commentsCount.textContent = currentPhoto.comments.length;
    socialComments.innerHTML = ``;
    photoComments = currentPhoto.comments;
    commentsGetMoreHandler(currentPhoto.comments);
  };

  const commentsGetMoreHandler = () => {
    const commentsList = document.querySelectorAll(`.social__comment`);
    let count = commentsList.length;
    const index = count + NEW_COMMENTS;
    const fiveComments = photoComments.slice(count, index);
    const comments = document.createDocumentFragment();
    for (let i = 0; i < fiveComments.length; i++) {
      count++;
      comments.appendChild(renderComment(fiveComments[i]));
    }
    socialCommentCount.textContent = `${index} из ${photoComments.length} комментариев`;
    socialComments.append(comments);
    if (fiveComments.length < NEW_COMMENTS || count === photoComments.length) {
      socialCommentCount.textContent = `${photoComments.length} из ${photoComments.length} комментариев`;
      commentsLoader.classList.add(`hidden`);
    }
  };

  const renderComment = (comment) => {
    const element = document.createElement(`li`);
    const commentImg = document.createElement(`img`);
    const commentText = document.createElement(`p`);
    element.classList.add(`social__comment`);
    commentImg.classList.add(`social__picture`);
    commentText.classList.add(`social__text`);
    commentImg.src = comment.avatar;
    commentImg.alt = comment.name;
    commentText.textContent = comment.message;
    element.append(commentImg, commentText);
    return element;
  };

  window.bigPicture = {
    renderBigPhoto,
    bigPhoto,
    commentsGetMoreHandler,
    commentsLoader,
    socialComments
  };

})();
