'use strict';

const PICTURE_TEMPLATE = document.querySelector(`#picture`) // Контент шаблона откуда копируем данные
  .content
  .querySelector(`.picture`);
const PICTURE_CONTAINER = document.querySelector(`.pictures`); // Куда вставляем скопированные данные
let pictureLikes = PICTURE_TEMPLATE.querySelector(`.picture__likes`);
let pictureComments = PICTURE_TEMPLATE.querySelector(`.picture__comments`);
let pictureImg = PICTURE_TEMPLATE.querySelector(`.picture__img`);
// let pictureTitle = PICTURE_CONTAINER.querySelector(`.pictures__title`).classList.remove(`visually-hidden`);
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

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
}

const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

const generateComments = function (amount) {
  const comments = [];
  for (let i = 0; i < amount; i++) {
    comments.push({
      avatar: `img/avatar - ${getRandom(1, 6)}.svg`, // Так и непонял как проверить аватары на картинках
      message: getRandomFrom(COMMENT_MESSAGES),
      name: getRandomFrom(COMMENT_NAMES) // Так и непонял как проверить имена на картинках
    });
  }
  return comments;
};

const createMockObjects = function (amount) {
  const massivePhotos = [];
  for (let i = 0; i <= amount; i++) {
    massivePhotos.push({
      url: `photos/${i + 1}.jpg`, // Не отрисовывает 1 картинку, ошибки не вижу!
      description: `Описание фотографии`,
      likes: Math.round(getRandom(15, 200)),
      comments: generateComments(getRandom(1, 6)) // Как сделать больше 1 коммента?
    });
  }
  return massivePhotos;
};

// Функция создания DOM-элемента(из шаблона - 1 картинки) на основе JS-объекта
let renderPhoto = function (photo) {

  const pictureElement = PICTURE_TEMPLATE.cloneNode(true); // Копия контента

  pictureLikes.textContent = photo.likes;
  pictureComments.textContent = photo.comments.length;
  pictureImg.src = `${photo.url}`; // Тут можно через settatribute - но у мну картинки отрисовываются, работает и так кажись
  pictureImg.alt = `${photo.description}`;

  return pictureElement;
};
/* Тут я через функцию, методом перебора беру из шаблона контент, заполняю его относительно cвойств
заданного обьекта и возвращаю уже заполненный шаблон 1 картинки*/

// Функция заполнения блока DOM-элементами путем формирования 1 фрагмента(где все картинки,)  на основе массива из i сгенерированных JS-объектов
const renderAllPhotos = function (massivePhotos) { // До этого была переменная photos и разницы я не вижу
  let photosFragment = document.createDocumentFragment();
  for (let i = 0; i < massivePhotos.length; i++) {
    photosFragment.appendChild(renderPhoto(massivePhotos[i]));
  }
  return photosFragment;
};
/* Тут я через функцию, методом перебора беру из "готовых шаблонов" формирую один фрагмент,
чтобы за один раз вставить все в контейнер*/

const mockPhotos = createMockObjects(PHOTOS_AMOUNT);
/* В функцию создания массива с обьектами я передаю количество фотографий и сохраняю в переменную */

PICTURE_CONTAINER.appendChild(renderAllPhotos(mockPhotos));
/* В контейнер куда нужно "отрисовать" все фотографии, я добавляю массив картинок */
