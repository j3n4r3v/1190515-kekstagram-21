'use strict';

const picturesTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);
const picturesContainer = document.querySelector(`.pictures`);
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
      id: i,
      url: `photos/${i + 1}.jpg`,
      description: `Описание фотографии`,
      likes: Math.round(getRandom(MIN_LIKES, MAX_LIKES)),
      comments: generateComments(getRandom(MIN_COMMENTS, MAX_COMMENTS))
    });
  }
  return massivePhotos;
};

let renderPhoto = function (photo) {
  const pictureElement = picturesTemplate.cloneNode(true);
  pictureElement.href = `#` + photo.id;
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
  picturesContainer.appendChild(photosFragment);
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
    return;
  }
  if (evt.key === `Escape`) {
    uploadOverlay.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
  }
  return;
};

const openOverlay = function () {
  uploadOverlay.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
  filterScale.classList.add(`hidden`);
  document.addEventListener(`keydown`, onOverlayEscPress);
  hashtagsText.addEventListener(`input`, hashtagsValidity);
  pin.addEventListener(`mouseup`, effectLevelHandler);
};

const closeOverlay = function () {
  uploadOverlay.classList.add(`hidden`);
  body.classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onOverlayEscPress);
  decreaseScale.removeEventListener(`click`, decreaseScale);
  increaseScale.removeEventListener(`click`, increaseScale);
  hashtagsText.removeEventListener(`input`, hashtagsValidity);
  pin.removeEventListener(`mouseup`, effectLevelHandler);
  upload.value = ``;
  imgPreview.style.transform = `scale(1)`;
  imgPreview.style.filter = ``;
  imgPreview.className = ``;
  hashtagsText.value = ``;
};

const decreaseScale = function () {
  const value = parseInt(scaleValue.value, 10);
  if (value > 25) {
    const valueNew = value - 25;
    scaleValue.value = valueNew + `%`;
    const valueTransform = valueNew / 100;
    imgPreview.style.transform = `scale(${valueTransform})`;
  }
};

const increaseScale = function () {
  const value = parseInt(scaleValue.value, 10);
  if (value < 100) {
    const valueNew = value + 25;
    scaleValue.value = valueNew + `%`;
    const valueTransform = valueNew / 100;
    imgPreview.style.transform = `scale(${valueTransform})`;
  }
};

const MAX_HASHTAGS_AMOUNT = 5;
const MAX_HASHTAG_CHARACTERS = 20;
const HASHTAG_PATTERN = /#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}/i;


const EFFECTS = {
  chrome: `effects__preview--chrome`,
  sepia: `effects__preview--sepia`,
  marvin: `effects__preview--marvin`,
  phobos: `effects__preview--phobos`,
  heat: `effects__preview--heat`,
};

const EFFECTS_ACTION = {
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

const VALIDATION_MESSAGES = {
  maxTags: `не больше 5 хэштегов.`,
  repeatTags: `хеш-теги не должны повторяться.`,
  regularTags: `строка после # должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`,
  notRegularTags: `нельзя использовать спецсимволы(#, @, $ и т.п.), за исключением октоторпа в начале хеш- тега, символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.`,
  numberTag: `длина хэш - тега не более 20 символов.`,
  hashTagStarts: `xеш - тег не может состоять только из одного #.`,
  hashTagFirstSymbol: `xеш - тег должен начинаться #.`,
  success: ``,
};

const effectChangeHandler = function (evt) {
  if (evt.target.matches(`input[type='radio']`)) {
    effectLevel.value = 100;
    if (evt.target.value in EFFECTS) {
      filterScale.classList.remove(`hidden`);
      imgPreview.removeAttribute(`style`);
      imgPreview.className = EFFECTS[evt.target.value];
    } else if (evt.target.value === `none`) {
      filterScale.classList.add(`hidden`);
      imgPreview.className = ``;
      imgPreview.style.filter = ``;
    }
  }
};

const getValueRange = function (value, min, max) {
  return value * (max - min) + min;
};

const getFilter = function (effect, value) {
  value = getValueRange(value, effect.min, effect.max);
  return `${effect.filter}(${value}${effect.unit})`;
};

const effectLevelHandler = function () {
  const value = parseInt(effectLevel.value, 10);
  if (imgPreview.className in EFFECTS_ACTION) {
    imgPreview.style.filter = getFilter(EFFECTS_ACTION[imgPreview.className], value);
    return;
  }
  imgPreview.style.filter = ``;
};

const hashtagsRepeat = function (hashtag, hashtaglist) {
  for (let i = 0; i < hashtaglist.length; i++) {
    if (hashtag === hashtaglist[i]) {
      return true;
    }
  }
  return false;
};

const hashtagsValidity = function () {
  const hashes = hashtagsText.value.toLowerCase().trim();
  const hashtags = hashes.split(` `);
  if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
    return VALIDATION_MESSAGES.maxTags;
  }
  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags[i].length > MAX_HASHTAG_CHARACTERS) {
      return VALIDATION_MESSAGES.numberTag;
    }
    if (hashtags[i].startsWith(`#`) && hashtags[i].length === 1) {
      return VALIDATION_MESSAGES.hashTagStarts;
    }
    if (!hashtags[i].startsWith(`#`) && HASHTAG_PATTERN.test(hashtags[i]) && hashtags[i].length > 0) {
      return VALIDATION_MESSAGES.hashTagFirstSymbol;
    }
    if (!hashtags[i].startsWith(`#`) && !HASHTAG_PATTERN.test(hashtags[i])) {
      return VALIDATION_MESSAGES.notRegularTags;
    }
    if (hashtags[i].startsWith(`#`) && hashtags[i].length > 1 && !HASHTAG_PATTERN.test(hashtags[i].substring(1))) {
      return VALIDATION_MESSAGES.regularTags;
    }
    if (hashtagsRepeat(hashtags[i], hashtags.slice(i + 1))) {
      return VALIDATION_MESSAGES.repeatTags;
    }
  }
  return VALIDATION_MESSAGES.success;
};

const showValidationMessage = (avr) => {
  hashtagsText.setCustomValidity(avr);
  hashtagsText.reportValidity();
};

const formSubmit = (evt) => {
  evt.preventDefault();
  const validationMessage = hashtagsValidity();
  showValidationMessage(validationMessage);
  if (validationMessage === VALIDATION_MESSAGES.success) {
    form.submit();
  }
};

const body = document.querySelector(`body`);
const upload = document.querySelector(`#upload-file`);
const uploadOverlay = document.querySelector(`.img-upload__overlay`);
const uploadCancel = uploadOverlay.querySelector(`#upload-cancel`);

upload.addEventListener(`change`, function () {
  openOverlay();
});

uploadCancel.addEventListener(`click`, function (evt) {
  closeOverlay();
  if (evt.key === `Enter`) {
    closeOverlay();
  }
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

scaleDecrease.addEventListener(`click`, function () {
  decreaseScale();
});

scaleIncrease.addEventListener(`click`, function () {
  increaseScale();
});

form.addEventListener(`change`, effectChangeHandler);

form.addEventListener(`submit`, formSubmit);

/* // 4.2
const bigPicture = document.querySelector(`.big-picture`);
const socialCommentText = bigPicture.querySelector(`.social__footer-text`);
const closeBigPicture = bigPicture.querySelector(`.big-picture__cancel`);

const onBigPictureEsc = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    bigPicture.classList.add(`hidden`);
    socialCommentText.value = ``;
    document.removeEventListener(`keydown`, onBigPictureEsc);
  }
};

const modalOpenHandler = (evt) => {
  for (let i = 0; i < massivePhotos.length; i++) {
    if (parseInt(evt.target.closest(`.picture`).hash.slice(1), 10) === massivePhotos[i].id) {
      renderBigPicture(massivePhotos[i]);
      bigPicture.classList.remove(`hidden`);
      document.addEventListener(`keydown`, onBigPictureEsc);
    }
  }
};

const closeModalOpen = () => {
  bigPicture.classList.add(`hidden`);
  socialCommentText.value = ``;
  document.removeEventListener(`keydown`, onBigPictureEsc);
};

// const picturesContainer = document.querySelector(`.pictures`);
const photosFragment = document.createDocumentFragment();

const massivePhotos = createMockObjects(PHOTOS_AMOUNT);
for (let i = 0; i < massivePhotos.length; i++) {
  photosFragment.append(renderPhoto(massivePhotos[i]));
}
picturesContainer.append(photosFragment);

const socialCommentCount = document.querySelector(`.social__comment-count`);
const commentLoader = bigPicture.querySelector(`.comments-loader`);
socialCommentCount.classList.add(`hidden`);
commentLoader.classList.add(`hidden`);

const commentsText = form.querySelector(`.text__description`);

document.querySelectorAll(`.picture`).forEach((element) => {
  element.addEventListener(`click`, modalOpenHandler);
  element.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      modalOpenHandler();
    }
  });
});

closeBigPicture.addEventListener(`click`, closeModalOpen);

closeBigPicture.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closeModalOpen();
  }
});
*/
