'use strict';
(function () {

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

  const generateComments = function (amount) {
    const comments = [];
    for (let i = 0; i < amount; i++) {
      comments.push({
        avatar: `img/avatar-${window.utils.getRandom(MIN_AVATARS, MAX_AVATARS)}.svg`,
        message: window.utils.getRandomFrom(COMMENT_MESSAGES),
        name: window.utils.getRandomFrom(COMMENT_NAMES)
      });
    }
    return comments;
  };


  window.data = {
    PICTURE_CONTAINER,
    PHOTOS_AMOUNT,
    generateComments,
    MIN_COMMENTS,
    MAX_COMMENTS,
    MIN_LIKES,
    MAX_LIKES
  };
})();
