// Функция для генерации случайного числа в диапазоне
export const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для генерации уникального идентификатора
export const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

// Функция для получения случайного элемента массива
export const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
