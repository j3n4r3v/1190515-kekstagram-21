'use strict';

const PICTURE_TEMPLATE = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);
const PICTURE_CONTAINER = document.querySelector(`.pictures`);
const PHOTOS_AMOUNT = 25;
const MIN_COMMENTS = 2;
const MAX_COMMENTS = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATARS = 1;
const MAX_AVATARS = 6;

const COMMENT_MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const COMMENT_NAMES = [
  `Жан`,
  `Маруся`,
  `Петр`,
  `Нила`,
  `Ян`,
  `Константа`,
];


function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

const generateComments = function (amount) {
  const comments = [];
  for (let i = 0; i < amount; i++) {
    comments.push({
      avatar: `img/avatar - ${getRandom(MIN_AVATARS, MAX_AVATARS)}.svg`,
      message: getRandomFrom(COMMENT_MESSAGES),
      name: getRandomFrom(COMMENT_NAMES)
    });
  }
  return comments;
};

const createMockObjects = function (amount) {
  const massivePhotos = [];
  for (let i = 0; i < amount; i++) {
    massivePhotos.push({
      url: `photos/${i + 1}.jpg`,
      description: `Описание фотографии`,
      likes: Math.round(getRandom(MIN_LIKES, MAX_LIKES)),
      comments: generateComments(getRandom(MIN_COMMENTS, MAX_COMMENTS))
    });
  }
  return massivePhotos;
};

let renderPhoto = function (photo) {

  const pictureElement = PICTURE_TEMPLATE.cloneNode(true);

  pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
  pictureElement.querySelector(`.picture__img`).src = `${photo.url}`;
  pictureElement.querySelector(`.picture__img`).alt = `${photo.description}`;

  return pictureElement;
};


(function () {
  const photosFragment = document.createDocumentFragment();
  createMockObjects(PHOTOS_AMOUNT).forEach((item) => {
    photosFragment.appendChild(renderPhoto(item));
  });
  PICTURE_CONTAINER.appendChild(photosFragment);
}());

// 3.2

const renderBigPicture = (photo) => {
  const bigPicture = document.querySelector(`.big-picture`);
  bigPicture.classList.remove(`hidden`);

  bigPicture.querySelector(`.big-picture__img img`).setAttribute(`src`, `photo.url`);
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
  for (let i = 0; i < comments.length; i++) {
    const commentListItem = document.createElement(`li`);
    commentListItem.classList.add(`social__comment`);

    const commentImage = document.createElement(`img`);
    commentImage.setAttribute(`src`, `${comments[i].avatar}`);
    commentImage.setAttribute(`alt`, `${comments[i].name}`);
    commentImage.setAttribute(`width`, `35`);
    commentImage.setAttribute(`height`, `35`);
    commentImage.classList.add(`social__picture`);

    const commentText = document.createElement(`p`);
    commentText.classList.add(`social__text`);
    commentText.textContent = comments[i].message;

    commentListItem.appendChild(commentImage);
    commentListItem.appendChild(commentText);

    container.appendChild(commentListItem);
  }
};

const mockPhotos = createMockObjects(PHOTOS_AMOUNT);
renderBigPicture(mockPhotos[0]);
