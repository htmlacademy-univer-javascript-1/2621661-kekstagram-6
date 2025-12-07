import { generatePhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';
import './effects.js';

const photos = generatePhotos();
renderThumbnails(photos);

export { photos };
