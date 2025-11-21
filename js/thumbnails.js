export function renderThumbnails(photos) {
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  photos.forEach(photo => {
    const template = document.querySelector('#picture').content.querySelector('.picture');
    const pictureElement = template.cloneNode(true);

    pictureElement.querySelector('img').src = photo.url;
    pictureElement.querySelector('img').alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
}
