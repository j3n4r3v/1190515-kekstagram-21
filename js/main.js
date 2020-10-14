'use strict';

const PICTURE_TEMPLATE = document.querySelector(`#picture`) // Контент шаблона откуда копируем данные
  .content
  .querySelector(`.picture`);
const PICTURE_CONTAINER = document.querySelector(`.pictures`); // Куда вставляем скопированные данные
let pictureLikes = PICTURE_TEMPLATE.querySelector(`.picture__likes`);
let pictureComments = PICTURE_TEMPLATE.querySelector(`.picture__comments`);
let pictureImg = PICTURE_TEMPLATE.querySelector(`.picture__img`);
const PHOTOS_AMOUNT = 25;

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

// Функции генерации случайных данных

function getRandom(min, max) { // Рандомные значения
  return Math.random() * (max - min) + min;
}

const createMockObjects = function (amount) {
  const massivePhotos = []; // Массив куда добавляем обьекты-картинки
  for (let i = 0; i < amount.length; i++) {
    massivePhotos.push({
      url: `photos/${i + 1}.jpg`,
      description: `Описание фотографии`,
      likes: getRandom(15, 200),
      comments: {
        avatar: `img/avatar${getRandom(1, 6)}.svg`,
        message: `${COMMENT_MESSAGES[getRandom(1, 6)]}`,
        name: `${COMMENT_NAMES[getRandom(0, COMMENT_NAMES.length - 1)]}`
      }
    });
  }
  return massivePhotos;
};

// Функция создания DOM-элемента(из шаблона - 1 картинки) на основе JS-объекта
let renderPhoto = function (photo) {

  const pictureElement = PICTURE_TEMPLATE.cloneNode(true); // Копия контента

  pictureLikes.textContent = getRandom(15, 200);
  pictureComments.textContent = photo.comments;
  pictureImg.src = photo.url;
  pictureImg.alt.textContent = photo.description;

  return pictureElement;
};
/* Тут я через функцию, методом перебора беру из шаблона контент, заполняю его относительно cвойств
заданного обьекта и возвращаю уже заполненный шаблон 1 картинки*/

// Функция заполнения блока DOM-элементами путем формирования 1 фрагмента(где все картинки,)  на основе массива из i сгенерированных JS-объектов
const renderAllPhotos = function (photos) {
  let photosFragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    photosFragment.appendChild(renderPhoto(photos[i]));
  }
  return photosFragment;
};
/* Тут я через функцию, методом перебора беру из "готовых шаблонов" формирую один фрагмент,
чтобы за один раз вставить все в контейнер*/

const mockPhotos = createMockObjects(PHOTOS_AMOUNT);
/* В функцию создания массива с обьектами я передаю количество фотографий и сохраняю в переменную */

PICTURE_CONTAINER.appendChild(renderAllPhotos(mockPhotos));
/* В контейнер куда нужно "отрисовать" все фотографии, я добавляю массив картинок */
