const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const checkResponse = (response) => {
  if (!response.ok) {
    return Promise.reject(new Error(`${response.status} ${response.statusText}`));
  }
  return response.json();
};

// Загрузить данные (GET)
export const loadPhotos = () => fetch(`${BASE_URL}/data`)
  .then(checkResponse);

// Отправить данные формы (POST)
export const sendData = (formData) => fetch(`${BASE_URL}/`, {
  method: 'POST',
  body: formData,
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка при отправке данных');
    }
  });
