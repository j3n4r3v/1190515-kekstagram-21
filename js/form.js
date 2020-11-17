'use strict';
(function () {
  const hashtagsText = document.querySelector(`.text__hashtags`);
  const textDescription = document.querySelector(`.text__description`);
  const MAX_HASHTAGS_AMOUNT = 5;
  const MAX_HASHTAG_CHARACTERS = 20;
  const MAX_TEXT_CHARACTERS = 140;
  const HASHTAG_PATTERN = /^[\w]*$/;


  const VALIDATION_MESSAGES = {
    maxTags: `не больше 5 хэштегов.`,
    repeatTags: `хэштеги не должны повторяться.`,
    regularTags: `строка после # должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`,
    notRegularTags: `нельзя использовать спецсимволы(#, @, $ и т.п.), за исключением октоторпа в начале хеш- тега, символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.`,
    numberTags: `длина хэштега не более 20 символов.`,
    hashTagStarts: `xеш-тег не может состоять только из одного #.`,
    hashTagFirstSymbol: `xеш - тег должен начинаться #.`,
    commentLength: `длина комментария не может составлять больше 140 символов.`,
    success: ``
  };

  const hashtagsRepeat = (hashtag, hashtaglist) => {
    for (let j = 0; j < hashtaglist.length; j++) {
      if (hashtag === hashtaglist[j]) {
        return true;
      }
    }
    return false;
  };

  const hashtagValidity = () => {
    let customValidityMessage = ``;
    const hashes = hashtagsText.value.toLowerCase().trim();
    const hashtags = hashes.split(` `);
    if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
      customValidityMessage = `${VALIDATION_MESSAGES.maxTags}`;
    }
    for (let i = 0; i < hashtags.length; i++) {
      if (hashtags[i].length > MAX_HASHTAG_CHARACTERS) {
        customValidityMessage = `${VALIDATION_MESSAGES.numberTags}`;
      }
      if (hashtags[i].startsWith(`#`) && hashtags[i].length === 1) {
        customValidityMessage = `${VALIDATION_MESSAGES.hashTagStarts}`;
      }
      if (!hashtags[i].startsWith(`#`) && HASHTAG_PATTERN.test(hashtags[i]) && hashtags[i].length > 0) {
        customValidityMessage = `${VALIDATION_MESSAGES.hashTagFirstSymbol}`;
      }
      if (!hashtags[i].startsWith(`#`) && !HASHTAG_PATTERN.test(hashtags[i])) {
        customValidityMessage = `${VALIDATION_MESSAGES.notRegularTags}`;
      }
      if (hashtags[i].startsWith(`#`) && hashtags[i].length > 1 && !HASHTAG_PATTERN.test(hashtags[i].substring(1))) {
        customValidityMessage = `${VALIDATION_MESSAGES.regularTags}`;
      }
      if (hashtagsRepeat(hashtags[i], hashtags.slice(i + 1))) {
        customValidityMessage = `${VALIDATION_MESSAGES.repeatTags}`;
      } else {
        hashtagsText.setCustomValidity(customValidityMessage);
      }
      hashtagsText.reportValidity();
    }
  };

  const descriptionValidity = () => {
    let customValidityMessage = ``;
    if (textDescription.value.length > MAX_TEXT_CHARACTERS) {
      customValidityMessage = `${VALIDATION_MESSAGES.commentLength}`;
      textDescription.setCustomValidity(customValidityMessage);
    }
    textDescription.setCustomValidity(customValidityMessage);
    textDescription.reportValidity();
  };

  const onTextHashtagsInput = () => {
    hashtagValidity();
  };

  const onTextDescriptionInput = () => {
    descriptionValidity();
  };

  const formSubmit = (evt) => {
    evt.preventDefault();
    if (onTextHashtagsInput && onTextDescriptionInput) {
      window.scale.form.submit();
    }
  };

  window.form = {
    hashtagsText,
    textDescription,
    formSubmit,
    onTextHashtagsInput,
    onTextDescriptionInput
  };
})();
