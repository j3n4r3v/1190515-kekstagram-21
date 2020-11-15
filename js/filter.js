'use strict';
(function () {
  const MAX_RANDOM_ELEMENTS_AMOUNT = 10;

  const removeUsersPictures = window.gallery.removeUsersPictures;
  const addServerPictures = window.gallery.addServerPictures;
  const addListeners = window.modal.addListeners;

  const imgFilters = document.querySelector(`.img-filters`);
  const filterDefault = imgFilters.querySelector(`#filter-default`);
  const filterRandom = imgFilters.querySelector(`#filter-random`);
  const filterDiscussed = imgFilters.querySelector(`#filter-discussed`);

  const toggleActiveFilter = function (selectedFilter) {
    const activeFilter = imgFilters.querySelector(`.img-filters__button--active`);

    activeFilter.classList.remove(`img-filters__button--active`);
    selectedFilter.classList.add(`img-filters__button--active`);
  };

  const showDefaultPictures = function () {
    addServerPictures(window.modal.picturesList);
    addListeners();
  };

  const shuffleArr = function (array) {
    const arrayCopy = array.slice();
    const iterations = MAX_RANDOM_ELEMENTS_AMOUNT < arrayCopy.length ? MAX_RANDOM_ELEMENTS_AMOUNT : arrayCopy.length - 1;

    for (let i = 0; i < iterations; i++) {
      const randomIndex = Math.floor(Math.random() * (arrayCopy.length - i)) + i;
      const currentElement = arrayCopy[i];
      arrayCopy[i] = arrayCopy[randomIndex];
      arrayCopy[randomIndex] = currentElement;
    }

    return arrayCopy;
  };

  const showRandomPictures = function () {
    const picturesList = window.modal.picturesList;
    const randomElements = shuffleArr(picturesList).slice(0, MAX_RANDOM_ELEMENTS_AMOUNT);

    addServerPictures(randomElements);
    addListeners();
  };

  const showDiscussedPictures = function () {
    const picturesListCopy = window.modal.picturesList.slice();
    const sortedList = picturesListCopy.sort(function (second, first) {
      return first.comments.length - second.comments.length;
    });

    addServerPictures(sortedList);
    addListeners();
  };

  const imgFiltersClickHandler = window.debounce(function (evt) {
    toggleActiveFilter(evt.target);
    removeUsersPictures();

    switch (evt.target) {
      case filterDefault:
        showDefaultPictures();
        break;
      case filterRandom:
        showRandomPictures();
        break;
      case filterDiscussed:
        showDiscussedPictures();
        break;
      default:
        showDefaultPictures();
    }
  });

  imgFilters.addEventListener(`click`, imgFiltersClickHandler);
})();
