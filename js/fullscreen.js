const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const showFullscreen = (photo) => {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.big-picture__img img').alt = photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  const socialComments = bigPicture.querySelector('.social__comments');
  socialComments.innerHTML = '';

  photo.comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;

    socialComments.appendChild(commentElement);
  });

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeFullscreen = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};


closeButton.addEventListener('click', closeFullscreen);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeFullscreen();
  }
});

export { showFullscreen };
