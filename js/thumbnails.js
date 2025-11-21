const renderThumbnails = (photos) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = pictureTemplate.cloneNode(true);
    const img = thumbnail.querySelector('.picture__img');
    img.src = photo.url;
    img.alt = photo.description;
    thumbnail.querySelector('.picture__likes').textContent = photo.likes;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
    fragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(fragment);
};

export { renderThumbnails };
