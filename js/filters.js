import { debounce } from './util.js';
import { renderThumbnails } from './thumbnails.js';

const FILTER_RANDOM_COUNT = 10;
const RERENDER_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');
const filtersForm = imgFilters.querySelector('.img-filters__form');

let pictures = [];

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const getFilteredPictures = (filter) => {
  switch (filter) {
    case FilterType.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, FILTER_RANDOM_COUNT);
    case FilterType.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const setFilterActive = (activeButton) => {
  const currentActive = filtersForm.querySelector('.img-filters__button--active');
  if (currentActive) {
    currentActive.classList.remove('img-filters__button--active');
  }
  activeButton.classList.add('img-filters__button--active');
};

const debouncedRender = debounce((filter) => {
  const filteredPictures = getFilteredPictures(filter);
  renderThumbnails(filteredPictures);
}, RERENDER_DELAY);

const onFilterClick = (evt) => {
  const target = evt.target.closest('.img-filters__button');
  if (!target) {
    return;
  }

  // Убираем проверку на активный класс, чтобы можно было кликать повторно (если нужно)
  // Но по ТЗ обычно переключение происходит всегда.
  // Если нужно предотвратить повторный рендер того же фильтра:
  if (target.classList.contains('img-filters__button--active')) {
    // return; // <-- Если раскомментировать, то повторный клик не сработает
  }

  setFilterActive(target);
  debouncedRender(target.id);
};

export const initFilters = (loadedPictures) => {
  pictures = loadedPictures;
  imgFilters.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', onFilterClick);
};
