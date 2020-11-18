'use strict';
(function () {
  const NEW_COMMENTS = 5;
  const photo = document.querySelector(`.big-picture`);
  const commentsLoader = photo.querySelector(`.comments-loader`);
  const photoImg = photo.querySelector(`.big-picture__img img`);
  const likesCount = photo.querySelector(`.likes-count`);
  const description = photo.querySelector(`.social__caption`);
  const commentsCount = photo.querySelector(`.comments-count`);
  const socialComments = photo.querySelector(`.social__comments`);
  const socialCommentCount = photo.querySelector(`.social__comment-count`);
  let photoComments;

  const renderPhoto = (currentPhoto) => {
    photoImg.src = currentPhoto.url;
    likesCount.textContent = currentPhoto.likes;
    description.textContent = currentPhoto.description;
    commentsCount.textContent = currentPhoto.comments.length;
    socialComments.innerHTML = ``;
    photoComments = currentPhoto.comments;
    onCommentsGetMore(currentPhoto.comments);
  };

  const onCommentsGetMore = () => {
    const commentsList = document.querySelectorAll(`.social__comment`);
    let count = commentsList.length;
    const index = count + NEW_COMMENTS;
    const fiveComments = photoComments.slice(count, index);
    const comments = document.createDocumentFragment();
    fiveComments.forEach((element) => {
      count++;
      comments.appendChild(renderComment(element));
    });
    socialCommentCount.textContent = `${index} из ${photoComments.length} комментариев`;
    socialComments.append(comments);
    if (count === photoComments.length) {
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
    renderPhoto,
    photo,
    onCommentsGetMore,
    commentsLoader,
    socialComments
  };

})();
