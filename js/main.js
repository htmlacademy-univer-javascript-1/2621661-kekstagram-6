import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';
import './effects.js';
import { showAlert } from './utils.js';

// Загрузка данных при открытии страницы
getData()
  .then((photos) => {
    renderThumbnails(photos);
  })
  .catch((error) => {
    showAlert(`Ошибка загрузки фотографий: ${error.message}`);
  });
