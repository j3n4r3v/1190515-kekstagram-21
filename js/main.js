'use strict';

const PICTURE_TEMPLATE = document.querySelector(`#picture`) // Контент шаблона откуда копируем данные
  .content
  .querySelector(`.picture`);
const PICTURE_CONTAINER = document.querySelector(`.pictures`); // Куда вставляем скопированные данные
let pictureLikes = PICTURE_TEMPLATE.querySelector(`.picture__likes`);
let pictureComments = PICTURE_TEMPLATE.querySelector(`.picture__comments`);
let pictureImg = PICTURE_TEMPLATE.querySelector(`.picture__img`);

const COMMENT_MESSAGES = [
  {comment: `Всё отлично!`},
  {comment: `В целом всё неплохо. Но не всё.`},
  {comment: `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`},
  {comment: `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`},
  {comment: `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`},
  {comment: `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`}
];

const COMMENT_NAMES = [ // Имена это массив. тут идут от 0 - 5 индексы в которых записаны обьекты.
  {name: `Жан`},
  {name: `Маруся`},
  {name: `Петр`},
  {name: `Нила`},
  {name: `Ян`},
  {name: `Константа`},
];

let objectCount = {
  url: `photos/i.jpg`,
  description: `Описание фотографии`,
  likes: getRandomLikes(15, 200),
  comments: {
    avatar: `img/avatar${getRandomAc(1, 6)}.svg`,
    message: `${COMMENT_MESSAGES[getRandomAc(1, 6)]}`,
    name: `${COMMENT_NAMES[getRandomAc(1, 6)]}`
  }
};

let massiveObjectJs = [];

// Функциu генерации случайных данных

function getRandomAc(min, max) { // Рандомные значения avatar-message-name
  return Math.random() * (max - min) + min;
}

function getRandomLikes(min, max) { // Рандомные значения likes
  return Math.random() * (max - min) + min;
}

// Функция создания DOM-элемента на основе JS-объекта
let renderTemplateContent = function () {
  for (let i = 0; i < massiveObjectJs.length; i++) { // Цикл перебора photos от 1-25
    let pictureElement = PICTURE_TEMPLATE.cloneNode(true);
    PICTURE_CONTAINER.appendChild(pictureElement);
    pictureLikes.textContent = getRandomLikes(15, 200);
    pictureComments.textContent = Number(objectCount.message);
    pictureImg.src.textContent = Number(objectCount.url);
  }
  return pictureElement;
};

// Функция заполнения блока DOM-элементами на основе массива JS-объектов
let fragment = document.createDocumentFragment();
for (let i = 0; i < massiveObjectJs.length; i++) {
  fragment.appendChild(renderTemplateContent(massiveObjectJs[i]));
}
PICTURE_CONTAINER.appendChild(fragment);
