import { loadPhotos } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';
import './effects.js';

// Загружаем данные с сервера и отрисовываем миниатюры
loadPhotos()
  .then((photos) => {
    renderThumbnails(photos);
  })
  .catch(() => {
    // При ошибке загрузки показываем шаблон ошибки из HTML
    const template = document.querySelector('#error');
    if (template) {
      const element = template.content.cloneNode(true);
      const body = document.body;
      body.appendChild(element);

      const errorSection = body.querySelector('.error');
      if (errorSection) {
        const button = errorSection.querySelector('.error__button');
        button.addEventListener('click', () => {
          window.location.reload();
        });
      }
    }
  });
