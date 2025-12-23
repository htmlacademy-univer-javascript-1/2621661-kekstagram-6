import { loadPhotos } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { initFilters } from './filters.js';
import './form.js';
import './effects.js';

// Загружаем данные с сервера и отрисовываем миниатюры
loadPhotos()
  .then((photos) => {
    renderThumbnails(photos);
    initFilters(photos);
  })
  .catch(() => {
    // При ошибке загрузки показываем шаблон ошибки из HTML
    const template = document.querySelector('#data-error');
    if (template) {
      const element = template.content.cloneNode(true);
      document.body.appendChild(element);
      setTimeout(() => {
        const errorElement = document.querySelector('.data-error');
        if (errorElement) {
          errorElement.remove();
        }
      }, 5000);
    }
  });
