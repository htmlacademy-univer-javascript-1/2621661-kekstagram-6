const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator();

const NAMES = [
  'Артём', 'Мария', 'Алексей', 'Екатерина', 'Дмитрий',
  'Анна', 'Сергей', 'Ольга', 'Иван', 'Наталья',
  'Михаил', 'Елена', 'Андрей', 'Светлана', 'Павел'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Прекрасный закат на море',
  'Горный пейзаж в утреннем тумане',
  'Улочки старого города',
  'Кофе и книга в уютном кафе',
  'Прогулка по осеннему лесу',
  'Архитектура современного мегаполиса',
  'Мой пушистый друг',
  'Вкусный ужин в ресторане',
  'Путешествие по неизведанным местам',
  'Творческий беспорядок на рабочем столе',
  'Спортивные достижения',
  'Семейный праздник',
  'Романтический вечер',
  'Приключения на природе',
  'Городские граффити и уличное искусство'
];

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createComments = () => {
  const commentsCount = getRandomInteger(0, 30);
  return Array.from({ length: commentsCount }, createComment);
};

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: createComments()
});

const generatePhotos = () => {
  const photosCount = 25;
  return Array.from({ length: photosCount }, (_, index) => createPhoto(index + 1));
};

export { generatePhotos };
