import { generatePhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';

// Генерация массива фотографий
const photos = generatePhotos();

// Отрисовка миниатюр
renderThumbnails(photos);

export { photos };
