'use strict';
(function () {
  const bigPicture = document.querySelector(`.big-picture`);
  const commentsLoader = bigPicture.querySelector(`.comments-loader`);
  const socialComments = bigPicture.querySelector(`.social__comments`);
  // const socialCommentCount = bigPicture.querySelector(`.social__comment-count`);

  const renderBigPicture = (currentPhoto) => {
    bigPicture.querySelector(`.big-picture__img img`).setAttribute(`src`, `${currentPhoto.url}`);
    bigPicture.querySelector(`.likes-count`).textContent = currentPhoto.likes;
    bigPicture.querySelector(`.comments-count`).textContent = currentPhoto.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = currentPhoto.description;
    bigPicture.querySelector(`.social__comments`).innerHTML = ``;
    renderBigPictureComments(currentPhoto.comments, socialComments);

    // commentsLoader.classList.remove(`hidden`);
    // const body = document.querySelector(`body`);
    // body.classList.add(`modal-open`);

    let commentsArray = [];
    commentsArray = currentPhoto.comments;

    const showComments = (quantity, elements) => {
      for (let i = 0; i < quantity; i++) {
        elements[i].classList.remove(`hidden`);
      }
    };

    const allComments = socialComments.querySelectorAll(`.social__comment`);
    let countShowComment = 5;

    const moreComments = (quantity, array, newArray) => {
      if (quantity < array.length) {
        showComments(quantity, newArray);
        commentsLoader.classList.remove(`hidden`);
      } else {
        showComments(array.length, newArray);
        commentsLoader.classList.add(`hidden`);
      }
    };

    moreComments(countShowComment, commentsArray, allComments);

    const moreLoadComments = () => {
      countShowComment = countShowComment + 5;
      moreComments(countShowComment, commentsArray, allComments);
    };

    commentsLoader.addEventListener(`click`, moreLoadComments);
  };

  const hiddenComment = () => {
    document.querySelector(`.social__comment-count`).classList.add(`hidden`);
  };

  hiddenComment();

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
