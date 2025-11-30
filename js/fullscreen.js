const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let currentComments = [];
let commentsShown = 0;
const COMMENTS_PER_PORTION = 5;

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
    <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;

  return commentElement;
};

const renderCommentsPortion = () => {
  const commentsToShow = currentComments.slice(commentsShown, commentsShown + COMMENTS_PER_PORTION);

  commentsToShow.forEach((comment) => {
    socialComments.appendChild(createComment(comment));
  });

  commentsShown += commentsToShow.length;

  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  if (commentsShown >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const showFullscreen = (photo) => {
  commentsShown = 0;
  currentComments = photo.comments;
  socialComments.innerHTML = '';

  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.big-picture__img img').alt = photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  renderCommentsPortion();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

commentsLoader.addEventListener('click', renderCommentsPortion);

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
