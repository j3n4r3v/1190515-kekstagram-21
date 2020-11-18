'use strict';
(function () {
  const MAX_RANDOM_ELEMENTS_AMOUNT = window.utils.MAX_RANDOM_ELEMENTS_AMOUNT;
  const shuffleArr = window.utils.shuffleArr;
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

  const onImgFiltersClick = window.debounce((evt) => {
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

  imgFilters.addEventListener(`click`, onImgFiltersClick);
})();
