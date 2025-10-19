import { getRandomInteger, getRandomArrayElement } from './util.js';
import {
  NAMES,
  MESSAGES,
  DESCRIPTIONS,
  PHOTOS_COUNT,
  MIN_LIKES,
  MAX_LIKES,
  MIN_COMMENTS,
  MAX_COMMENTS,
  AVATAR_COUNT
} from './constants.js';
import { createCommentIdGenerator, createPhotoIdGenerator } from './id-generators.js';

const generateCommentId = createCommentIdGenerator();
const generatePhotoId = createPhotoIdGenerator();

// Функция для создания комментария
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

// Функция для создания массива комментариев
const createComments = () => {
  const commentsCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  return Array.from({ length: commentsCount }, createComment);
};

// Функция для создания объекта фотографии
const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${getRandomInteger(1, PHOTOS_COUNT)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments()
});

// Функция для генерации массива фотографий
export const generateData = () => Array.from({ length: PHOTOS_COUNT }, createPhoto);
