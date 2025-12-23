import { resetEffects } from './effects.js';
import { sendData } from './api.js';

// Pristine is loaded as a global from CDN in index.html. If a bundler or local vendor is used,
// you can replace this with an import. e.g. import Pristine from '/vendor/pristine/pristine.min.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

// Функция для показа формы
const showForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// Функция для скрытия формы
const hideForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  uploadInput.value = '';
  resetEffects(); // Важно: сбрасываем значение поля файла
};

// Валидация хэш-тегов согласно ТЗ
const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true; // Хэш-теги необязательны
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/);
  const seenHashtags = new Set();

  if (hashtags.length > 5) {
    return false;
  }

  for (const hashtag of hashtags) {
    if (hashtag === '#') {
      return false;
    }

    if (!hashtag.startsWith('#')) {
      return false;
    }

    // Максимальная длина 20 символов
    if (hashtag.length > 20) {
      return false;
    }

    // После решётки только буквы и цифры
    const content = hashtag.slice(1);
    if (!/^[a-zа-яё0-9]+$/i.test(content)) {
      return false;
    }

    // Проверка на уникальность (нечувствительность к регистру)
    if (seenHashtags.has(hashtag)) {
      return false;
    }
    seenHashtags.add(hashtag);
  }

  return true;
};

// Создаём экземпляр Pristine (глобальная переменная, загружается из CDN)
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

// Добавляем валидаторы
pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Неправильный формат хэш-тегов. Каждый тег должен начинаться с #, содержать только буквы и цифры, быть уникальным. Максимум 5 тегов, длина до 20 символов.'
);

pristine.addValidator(
  commentInput,
  (value) => value.length <= 140,
  'Длина комментария не должна превышать 140 символов'
);

// Обработчик выбора файла
uploadInput.addEventListener('change', () => {
  showForm();
});

// Обработчик закрытия формы
cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  hideForm();
});

// Обработчики Escape - не работает при фокусе в полях ввода
hashtagInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

commentInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !overlay.classList.contains('hidden')) {
    evt.preventDefault();
    hideForm();
  }
});

// Блокировка кнопки отправки на время AJAX-запроса
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};


// Функции для показа/скрытия сообщений успеха/ошибки
const showMessage = (templateId) => {
  const template = document.querySelector(`#${templateId}`);
  if (!template) {
    return;
  }

  const fragment = template.content.cloneNode(true);
  const messageElement = fragment.querySelector('.success') || fragment.querySelector('.error') || fragment.querySelector('.img-upload__message');
  document.body.appendChild(fragment);

  const node = messageElement ? document.body.querySelector(`${messageElement.tagName.toLowerCase()}${messageElement.className ? `.${messageElement.className.split(' ').join('.')}` : ''}`) : null;

  function onEsc(evt) {
    if (evt.key === 'Escape') {
      removeMessage();
    }
  }

  function removeMessage() {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
    document.removeEventListener('keydown', onEsc);
  }

  document.addEventListener('keydown', onEsc);

  if (node) {
    node.addEventListener('click', (evt) => {
      const target = evt.target;
      if (target.classList.contains('success__button') || target.classList.contains('error__button') || target === node) {
        removeMessage();
      }
    });
  }
};

const showSuccessMessage = () => showMessage('success');
const showErrorMessage = () => showMessage('error');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();

    const formData = new FormData(form);
    sendData(formData)
      .then(() => {
        hideForm();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => {
        unblockSubmitButton();
      });
  }
});

// Закрытие формы и сброс при событии reset (нажатие кнопки reset и др.)
form.addEventListener('reset', () => {
  // Здесь не нужно отменять дефолтный ресет — мы хотим вернуть поля в исходное состояние,
  // но дополнительно нужно закрыть оверлей и сбросить эффекты.
  hideForm();
});

export { showForm, hideForm };
