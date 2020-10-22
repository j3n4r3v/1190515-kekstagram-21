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
      avatar: `img/avatar-${getRandom(MIN_AVATARS, MAX_AVATARS)}.svg`,
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

  bigPicture.querySelector(`.big-picture__img img`).setAttribute(`src`, `${photo.url}`);
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

const mockPhotos = createMockObjects(PHOTOS_AMOUNT);
renderBigPicture(mockPhotos[0]);

// 4.1
const onOverlayEscPress = (evt) => {
  if (hashtagsText === document.activeElement) {
    return evt;
  }
  if (evt.key === `Escape`) {
    uploadOverlay.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
  }
  return evt;
};

const openOverlay = function () { // Открытие окна формы
  uploadOverlay.classList.remove(`hidden`);
  body.classList.add(`modal-open`); // Открытие модального окна
  filterScale.classList.add(`hidden`);
  document.addEventListener(`keydown`, onOverlayEscPress); // Обработчик события на документ весь, закрытие по ескейп
};

const closeOverlay = function () { // Закрытие окна формы
  uploadOverlay.classList.add(`hidden`); // Закрываем форму редактирования изображения
  body.classList.remove(`modal-open`); // Удаляем модальное окно
  document.removeEventListener(`keydown`, onOverlayEscPress); // Удаляем обработчик события нажатия кнопки на Ескейп
  decreaseScale.removeEventListener(`click`, decreaseScale); // Удаляем обработчик события уменьшения размера
  increaseScale.removeEventListener(`click`, increaseScale); // Удаляем обработчик события увеличеняи размера
  upload.value = ``;
  imgPreview.style.transform = `scale(1)`;
  imgPreview.style.filter = ``;
  imgPreview.className = ``; // Очищаем значения
  hashtagsText.value = ``;
};

const decreaseScale = function () { // Уменьшение размера изображения
  const value = parseInt(scaleValue.value, 10);
  if (value > 25) {
    const valueNew = value - 25;
    scaleValue.value = valueNew + `%`; // Поле изменения значения, его значение %
    const valueTransform = valueNew / 100;
    imgPreview.style.transform = `scale(${valueTransform})`;
  }
};

const increaseScale = function () { // Увеличение размера изображения
  const value = parseInt(scaleValue.value, 10);
  if (value < 100) {
    const valueNew = value + 25; // Шаг изменения масштаба
    scaleValue.value = valueNew + `%`; // Добавляем %
    const valueTransform = valueNew / 100; // Добавляем коеффициет масштабa
    imgPreview.style.transform = `scale(${valueTransform})`;
  }
};

const MAX_HASHTAGS_AMOUNT = 5;
const MAX_HASHTAG_CHARACTERS = 20;
const HASHTAG_PATTERN = /#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}/i; // Вот зачем тут нужно i?


const EFFECTS = { // Эффекты для браузеров
  chrome: `effects__preview--chrome`,
  sepia: `effects__preview--sepia`,
  marvin: `effects__preview--marvin`,
  phobos: `effects__preview--phobos`,
  heat: `effects__preview--heat`,
};

const EFFECTS_ACTION = { // CSS-стили картинки внутри .img-upload__preview обновляются следующим образом
  'effects__preview--chrome': {
    filter: `grayscale`,
    unit: ``,
    min: 0,
    max: 1,
  },
  'effects__preview--sepia': {
    filter: `sepia`,
    unit: ``,
    min: 0,
    max: 1,
  },
  'effects__preview--marvin': {
    filter: `invert`,
    unit: `%`,
    min: 0,
    max: 100,
  },
  'effects__preview--phobos': {
    filter: `blur`,
    unit: `px`,
    min: 0,
    max: 3,
  },
  'effects__preview--heat': {
    filter: `brightness`,
    unit: ``,
    min: 1,
    max: 3,
  }
};

const VALIDATION_MESSAGES = { // Проверка валидации при отправке формы
  maxTags: `не больше 5 хэштегов.`,
  repeatTags: `хэштеги не должны повторяться.`,
  regularTags: `недопустимые символы.`,
  numberTags: `длина хэштега не более 20 символов.`,
  hashTagStarts: `хэш-тег начинается с символа # (решётка).`,
  hashTagLength: `хеш-тег не может состоять только из одной решётки.`,
  success: ``,
};

const effectChangeHandler = function (evt) { // Функция переключения эффектов
  if (evt.target.matches(`input[type='radio']`)) {
    effectLevel.value = 100; // Уровень насыщенности сбрасывается до начального значения (100%)
    if (evt.target.value in EFFECTS) { // Если значение с эффектами
      filterScale.classList.remove(`hidden`); // Показываем блок uзменения глубины эффекта
      imgPreview.removeAttribute(`style`); // Убираем стилизацию
      imgPreview.className = EFFECTS[evt.target.value]; // Добавляем класс эффектов
    } else if (evt.target.value === `none`) { // Если нет эффектов
      filterScale.classList.add(`hidden`); // Прячем блок uзменения глубины эффекта
      imgPreview.className = ``; // Убираем класс
      imgPreview.style.filter = ``; // Убираем стили фильтра
    }
  }
};

const getValueRange = function (value, min, max) { // Высчитывает коэффициент для фильтра: значение фильтра(min..max)
  return value * (max - min) + min;
};

const getFilter = function (effect, value) { // Подставляет коэффициент + склеивает коэффициент с нужным фильтром
  value = getValueRange(value, effect.min, effect.max);
  return `${effect.filter}(${value}${effect.unit})`;
};

const effectLevelHandler = function () { // проверяет что действительно нажат один из фильтров и используя все предыдущие функции считает коэффициент и применяет фильтр
  const value = parseInt(effectLevel.value, 10); // "20" превращает в 20, принимает строку в качестве аргумента и возвращает целое число в соответствии с указанным основанием системы счисления
  if (imgPreview.className in EFFECTS_ACTION) { // Если уже содержится эффект в классе дефолтного изображения
    imgPreview.style.filter = getFilter(EFFECTS_ACTION[imgPreview.className], value);
    return; // Возвращает imgPreview.style.filter = нужный фильтр, почему именно это значение?
  }
  imgPreview.style.filter = ``; // Стили для изображения фильтра убираем если нет эффектов фильтра
};

const hashtagsRepeat = function (hashtag, hashtaglist) { // Проверяет чтобы не было одинаковых хэштегов
  for (let j = 0; j < hashtaglist.length; j++) {
    if (hashtag === hashtaglist[j]) {
      return true;
    }
  }
  return false;
};

const showValidationMessage = (avr) => {
  hashtagsText.setCustomValidity(avr);
  hashtagsText.reportValidity();
};

const hashtagValidity = function () { // Проверяем на валидность введенный хештег
  const hashes = hashtagsText.value.toLowerCase().trim();
  if (!hashes) {
    return ``;
  }
  const hashtags = hashes.split(` `);
  if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
    return VALIDATION_MESSAGES.maxTags;
  }
  for (let i = 0; i < hashtags.length; i++) {
    if (!hashtags[i].startsWith(`#`)) {
      return VALIDATION_MESSAGES.hashTagStarts;
    }
    if (hashtags[i].length === 1) {
      return VALIDATION_MESSAGES.hashTagLength;
    }
    if (hashtagsRepeat(hashtags[i], hashtags.slice(i + 1))) {
      return VALIDATION_MESSAGES.repeatTags;
    }
    if ((!hashtags[i].match(HASHTAG_PATTERN))) {
      return VALIDATION_MESSAGES.regularTags;
    }
    if (hashtags[i].length > MAX_HASHTAG_CHARACTERS) {
      return VALIDATION_MESSAGES.numberTags;
    }
  }
  return VALIDATION_MESSAGES.success;
};

const formSubmit = (evt) => {
  evt.preventDefault();
  const validationMessage = hashtagValidity();
  showValidationMessage(validationMessage);
  if (validationMessage === VALIDATION_MESSAGES.success) {
    form.submit();
  }
};

const body = document.querySelector(`body`);
const upload = document.querySelector(`#upload-file`); // Контрол загрузки файла
const uploadOverlay = document.querySelector(`.img-upload__overlay`); // Форма редактирования изображения
const uploadCancel = uploadOverlay.querySelector(`#upload-cancel`); // Кнопка для закрытия формы редактирования изображения - ентер, пробел, ескейп и мышка

upload.addEventListener(`change`, function () { // Изменение состояния контрола загрузки (загрузка фото)
  openOverlay();
});

uploadCancel.addEventListener(`click`, function () { // Закрытие щелчком мышкой кнопки-крестика
  closeOverlay();
});

const scaleDecrease = document.querySelector(`.scale__control--smaller`); // Уменьшить размер изображения
const scaleIncrease = document.querySelector(`.scale__control--bigger`); //  Увеличить размера изображения
const scaleValue = document.querySelector(`.scale__control--value`); // Величина изображения
const form = document.querySelector(`.img-upload__form`); // Форма для отправки данных
const imgPreview = form.querySelector(`.img-upload__preview img`); // Предварительный просмотр изображения - маленькое фото
const filterScale = form.querySelector(`.img-upload__effect-level`); // Блок uзменения глубины эффекта, накладываемого на изображение
const effectLevel = filterScale.querySelector(`.effect-level__value`); // Поле уровня эффекта
const pin = filterScale.querySelector(`.effect-level__pin`); // Ползунок в слайдере
const hashtagsText = document.querySelector(`.text__hashtags`); // Поле для хэш-тега

scaleDecrease.addEventListener(`click`, function () { // Обработчик события уменьшения размера
  decreaseScale(); // Функция уменьшения размера
});

scaleIncrease.addEventListener(`click`, function () { // Обработчик события увеличения размера
  increaseScale(); // Функция увеличения размера
});

form.addEventListener(`change`, effectChangeHandler); // Изменения в форме - заупск функции переключения эффектов

pin.addEventListener(`mouseup`, effectLevelHandler); // Почему тут на отпускание щелчка мышки = проверка фильтра

hashtagsText.addEventListener(`input`, hashtagValidity); // Введение хештега - проверка на валидность

form.addEventListener(`submit`, formSubmit); // проверки на валидность
