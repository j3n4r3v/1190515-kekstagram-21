'use strict';

const COMMENT_MESSAGES = [
  {comment: `Всё отлично!`},
  {comment: `В целом всё неплохо. Но не всё.`},
  {comment: `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`},
  {comment: `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`},
  {comment: `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`},
  {comment: `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`}
];

const COMMENT_NAMES = [
  {name: `Жан`},
  {name: `Маруся`},
  {name: `Петр`},
  {name: `Нила`},
  {name: `Ян`},
  {name: `Константа`},
];

let OBJECT_COUNT = {
  url: 'photos/i.jpg',
  description: 'Описание фотографии',
  likes: 'getRandomLikes(15, 200)',
  comments: {
    avatar: 'img/avatar-getRandomAc(1, 6).svg',
    message: 'getRandomAc(1, 6)',
    name: 'getRandomAc(1, 6)'
  }
};

let MASSIVE_OBJECT_JS = [];
//Функциu генерации случайных данных

function getRandomAc(min, max) { // Рандомные значения avatar-message-name
  return Math.random() * (max - min) + min;
};

function getRandomLikes(min, max) { // Рандомные значения likes
  return Math.random() * (max - min) + min;
};

// Функция заполнения блока DOM-элементами на основе массива JS-объектов

for (i = 0; i < 25; i++) { // Цикл перебора photos от 1-25
};
//Функция создания DOM-элемента на основе JS-объекта
let ARRAY_CREATE = function (OBJECT_COUNT[i]) {
  MASSIVE_OBJECT_JS[i] = MASSIVE_OBJECT_JS.push(OBJECT_COUNT[i]);
  return MASSIVE_OBJECT_JS;
};
