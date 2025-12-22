import { showFullscreen } from './fullscreen.js';

export function renderThumbnails(photos) {
  const picturesContainer = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content.querySelector('.picture');

  // Очистка старых миниатюр
  const oldPictures = picturesContainer.querySelectorAll('.picture');
  oldPictures.forEach(picture => picture.remove());

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = template.cloneNode(true);

    pictureElement.querySelector('img').src = photo.url;
    pictureElement.querySelector('img').alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      showFullscreen(photo);
    });

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
}
