'use strict';

const pictureTemplate = document.querySelector(`#picture`) // Контент шаблона откуда копируем данные
  .content
  .querySelector(`.picture`);
const pictureContainer = document.querySelector(`.pictures`); // Куда вставляем скопированные данные
let pictureLikes = pictureTemplate.querySelector(`.picture__likes`);
let pictureComments = pictureTemplate.querySelector(`.picture__comments`);
let pictureImg = pictureTemplate.querySelector(`.picture__img`);

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
  url: `photos/i.jpg`,
  description: `Описание фотографии`,
  likes: `getRandomLikes(15, 200)`,
  comments: {
    avatar: `img/avatar-getRandomAc(1, 6).svg`,//Пробовал конкатенацией соединить - не получается :(
    message: `COMMENT_MESSAGES[getRandomAc(1, 6)]`,
    name: `COMMENT_NAMES[getRandomAc(1, 6)]`
  }
};

let MASSIVE_OBJECT_JS = [OBJECT_COUNT[i]]; //Массив куда будем добавлять 25 сгенерированных Js обьектов

//Функциu генерации случайных данных

function getRandomAc(min, max) { // Рандомные значения avatar-message-name
  return Math.random() * (max - min) + min;
};

function getRandomLikes(min, max) { // Рандомные значения likes
  return Math.random() * (max - min) + min;
};

//Функция создания DOM-элемента на основе JS-объекта
let RENDER_OBJECT_COUNT = function (MASSIVE_OBJECT_JS) {
  for (let i = 0; i < MASSIVE_OBJECT_JS.length; i++) { // Цикл перебора photos от 1-25
    let pictureElement = pictureTemplate.cloneNode(true);
    pictureContainer.appendChild(pictureElement);
    pictureLikes.textContent = getRandomLikes(15, 200);
    OBJECT_COUNT.url = pictureImg.src.textContent;
  };
  return pictureElement;
};

// Функция заполнения блока DOM-элементами на основе массива JS-объектов
let fragment = document.createDocumentFragment();
for (var i = 0; i < MASSIVE_OBJECT_JS.length; i++) {
  fragment.appendChild(RENDER_OBJECT_COUNT(MASSIVE_OBJECT_JS[i]));
}
pictureContainer.appendChild(fragment);

/*Я старался понять и сделать сам - но увы,не доходит до конца :(*/
