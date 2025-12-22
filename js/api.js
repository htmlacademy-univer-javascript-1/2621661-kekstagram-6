const Urls = {
  GET: 'https://29.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://29.javascript.htmlacademy.pro/kekstagram',
};

const ServerCodes = {
  400: 'Неверный запрос',
  401: 'Пользователь не авторизован',
  404: 'Страница не найдена',
  500: 'Внутренняя ошибка сервера',
};

const getData = () => fetch(Urls.GET)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} (${ServerCodes[response.status] || 'Неизвестная ошибка'})`);
  });

const sendData = (formData) => fetch(Urls.POST, {
  method: 'POST',
  body: formData,
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} (${ServerCodes[response.status] || 'Неизвестная ошибка'})`);
  });

export { getData, sendData };
