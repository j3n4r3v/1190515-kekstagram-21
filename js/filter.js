'use strict';
(function () {
  const MAX_RANDOM_ELEMENTS_AMOUNT = 10;

  const removeUsersPictures = window.gallery.removeUsersPictures;
  const addServerPictures = window.gallery.addServerPictures;
  const imgFilters = window.main.imgFilters;

  const filterDefault = imgFilters.querySelector(`#filter-default`);
  const filterRandom = imgFilters.querySelector(`#filter-random`);
  const filterDiscussed = imgFilters.querySelector(`#filter-discussed`);

  const toggleActiveFilter = (selectedFilter) => {
    const activeFilter = imgFilters.querySelector(`.img-filters__button--active`);

    activeFilter.classList.remove(`img-filters__button--active`);
    selectedFilter.classList.add(`img-filters__button--active`);
  };

  const showDefaultPictures = () => {

    addServerPictures(window.main.picturesList);
  };

  const shuffleArr = (array) => {
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

  const showRandomPictures = () => {
    const randomElements = shuffleArr(window.main.picturesList).slice(0, MAX_RANDOM_ELEMENTS_AMOUNT);

    addServerPictures(randomElements);
  };

  const showDiscussedPictures = () => {
    const picturesListCopy = window.main.picturesList.slice();
    const sortedList = picturesListCopy.sort(function (second, first) {
      return first.comments.length - second.comments.length;
    });

    addServerPictures(sortedList);
  };

  const imgFiltersClickHandler = window.debounce((evt) => {
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
