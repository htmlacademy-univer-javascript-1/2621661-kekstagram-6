const DEBOUNCE_INTERVAL = 500;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const ALERT_SHOW_TIME = 5000;

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const getWordEnding = (number, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

const isEscEvent = (evt) => evt.key === Keys.ESC || evt.key === Keys.ESCAPE;

const debounce = (callback, timeoutDelay = DEBOUNCE_INTERVAL) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '15px 10px';
  alertContainer.style.fontSize = '16px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ff4e4e';
  alertContainer.style.color = '#ffffff';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showMessage = (templateId, closeButtonClass) => {
  const template = document.querySelector(`#${templateId}`).content.cloneNode(true);
  const messageElement = template.querySelector(`.${templateId}`);
  const closeButton = messageElement.querySelector(`.${closeButtonClass}`);

  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  const onEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      closeMessage();
    }
  };

  const onOutsideClick = (evt) => {
    const innerElement = messageElement.querySelector(`.${templateId}__inner`);
    if (innerElement && !innerElement.contains(evt.target)) {
      closeMessage();
    }
  };

  closeButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);

  document.body.appendChild(messageElement);
};

export { getWordEnding, isEscEvent, debounce, showAlert, showMessage };
