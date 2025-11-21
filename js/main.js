import { generatePhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';

const photos = generatePhotos();

// Отрисовка миниатюр
renderThumbnails(photos);

export { photos };
