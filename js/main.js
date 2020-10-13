'use strict';

const PICTURE_TEMPLATE = document.querySelector(`#picture`) // Контент шаблона откуда копируем данные
  .content
  .querySelector(`.picture`);
const PICTURE_CONTAINER = document.querySelector(`.pictures`); // Куда вставляем скопированные данные
let pictureLikes = PICTURE_TEMPLATE.querySelector(`.picture__likes`);
let pictureComments = PICTURE_TEMPLATE.querySelector(`.picture__comments`);
let pictureImg = PICTURE_TEMPLATE.querySelector(`.picture__img`);
let pictureElement = PICTURE_TEMPLATE.cloneNode(true);

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

let objectCount = {
  url: `photos/i.jpg`,
  description: `Описание фотографии`,
  likes: getRandomLikes(15, 200),
  comments: {
    avatar: `img/avatar${getRandomAc(1, 6)}.svg`,
    message: `${COMMENT_MESSAGES[getRandomAc(1, 6)]}`,
    name: `${COMMENT_NAMES[getRandomAc(0, 5)]}`
    /* В массиве имен всего 6 обьектов, но с 0-5 индексы обьектов. По идее,
    нужно в рандом-функцию входящие значения переопределить на 0-5 вместо 1-6 */
  }
};

let massiveObjectJs = []; // Сюда я собираюсь добавить готовые 25 обьектов в массив

// Функции генерации случайных данных

function getRandomAc(min, max) { // Рандомные значения avatar-message-name
  return Math.random() * (max - min) + min;
}

function getRandomLikes(min, max) { // Рандомные значения likes
  return Math.random() * (max - min) + min;
}

// Функция создания DOM-элемента(из шаблона) на основе JS-объекта
let renderTemplateContent = function () {
  for (let i = 0; i < massiveObjectJs.length; i++) { // Цикл перебора обьектов от 1-25
    PICTURE_CONTAINER.appendChild(pictureElement);
    pictureLikes.textContent = getRandomLikes(15, 200);
    pictureComments.textContent = objectCount.comments;
    pictureImg.src = objectCount.url;
    pictureImg.alt.textContent = objectCount.description;
  }
  return pictureElement;
};
/* Тут я через функцию, методом перебора беру из шаблона контент, заполняю его относительно cвойств
заданного обьекта и возвращаю уже заполненный шаблон по индексу*/

// Функция заполнения блока DOM-элементами на основе массива из 25 сгенерированных JS-объектов
let fragment = document.createDocumentFragment();
for (let i = 0; i < massiveObjectJs.length; i++) {
  fragment.appendChild(renderTemplateContent(massiveObjectJs[i]));
}
PICTURE_CONTAINER.appendChild(fragment);
/* Тут я через функцию, методом перебора беру из "готовых шаблонов" формирую один фрагмент,
чтобы за один раз вставить все в контейнер*/

/* По поваду мока инфы я не нашел ок (в задании 3.1 его вообще нет, даже примера), потому есть лишь предположение -
это нужно заменить createDocumentFragment() возможно им:

const createMockObjects = (length = 25) { const cards = []; for (let i = 0; i < length; i++) {
cards.push({ url:... description: ... }); } return cards; }

Я так понял что:
1.длина - массива кол-во обьектов, 25
2.cards - мой массив куда я буду добавлять значения
3.cards.push(по моей логике тут идут значения обьекта что я должен передать с objectCount: {
  url: `photos/i.jpg`,
  description: `Описание фотографии`,
  likes: getRandomLikes(15, 200),
  comments: {
    avatar: `img/avatar${getRandomAc(1, 6)}.svg`,
    message: `${COMMENT_MESSAGES[getRandomAc(1, 6)]}`,
    name: `${COMMENT_NAMES[getRandomAc(0, 5)]})
4. return cards - возвращаю значения своего массива
*/
