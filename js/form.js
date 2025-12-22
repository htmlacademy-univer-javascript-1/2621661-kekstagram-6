import './vendor/pristine/pristine.min.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showMessage, isEscEvent } from './utils.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

let isSending = false;

// Блокировка/разблокировка кнопки
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
  isSending = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
  isSending = false;
};

// Валидация хэш-тегов
const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const seenHashtags = new Set();

  if (hashtags.length > 5) {
    return false;
  }

  for (const hashtag of hashtags) {
    if (!hashtag.startsWith('#')) {
      return false;
    }

    if (hashtag === '#') {
      return false;
    }

    if (hashtag.length > 20) {
      return false;
    }

    const content = hashtag.slice(1);
    if (!/^[a-zа-яё0-9]+$/i.test(content)) {
      return false;
    }

    if (seenHashtags.has(hashtag)) {
      return false;
    }
    seenHashtags.add(hashtag);
  }

  return true;
};

// Настройка Pristine с разными сообщениями
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

// Валидатор 1: количество хэш-тегов
pristine.addValidator(
  hashtagInput,
  (value) => {
    if (value.trim() === '') return true;
    const hashtags = value.trim().split(/\s+/).filter(Boolean);
    return hashtags.length <= 5;
  },
  'Не более 5 хэш-тегов',
  2,
  false
);

// Валидатор 2: уникальность хэш-тегов
pristine.addValidator(
  hashtagInput,
  (value) => {
    if (value.trim() === '') return true;
    const hashtags = value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const seen = new Set();
    for (const hashtag of hashtags) {
      if (seen.has(hashtag)) return false;
      seen.add(hashtag);
    }
    return true;
  },
  'Хэш-теги не должны повторяться',
  2,
  false
);

// Валидатор 3: формат хэш-тегов
pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Хэш-тег должен начинаться с # и содержать только буквы и цифры',
  1,
  true
);

// Валидатор комментария
pristine.addValidator(
  commentInput,
  (value) => value.length <= 140,
  'Комментарий не может быть длиннее 140 символов'
);

// Показать форму
const showForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

// Скрыть форму (полный сброс)
const hideForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  uploadInput.value = '';
  resetEffects();
  pristine.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Отправка формы
const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (isSending) return;

  const isValid = pristine.validate();
  if (!isValid) return;

  blockSubmitButton();

  try {
    const formData = new FormData(form);
    await sendData(formData);

    showMessage('success', 'success__button');
    hideForm();
  } catch {
    showMessage('error', 'error__button');
  } finally {
    unblockSubmitButton();
  }
};

// Закрытие формы
const onCancelClick = (evt) => {
  evt.preventDefault();
  if (isSending) return;
  hideForm();
};

// Обработчик Esc
const onDocumentKeydown = (evt) => {
  if (!isEscEvent(evt) || overlay.classList.contains('hidden')) return;

  if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
    evt.stopPropagation();
    return;
  }

  if (isSending) return;

  evt.preventDefault();
  hideForm();
};

// Инициализация
uploadInput.addEventListener('change', showForm);
cancelButton.addEventListener('click', onCancelClick);
form.addEventListener('submit', onFormSubmit);

// Запрет закрытия формы при фокусе в полях
[hashtagInput, commentInput].forEach((field) => {
  field.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.stopPropagation();
    }
  });
});

export { showForm, hideForm };
