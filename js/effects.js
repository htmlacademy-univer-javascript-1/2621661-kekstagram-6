const scaleControl = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const PERCENT_DIVIDER = 100;
let currentScale = 100;
let currentEffect = 'none';

// Инициализация масштаба
const updateScale = (value) => {
  currentScale = value;
  scaleControl.value = `${currentScale}%`;
  imagePreview.style.transform = `scale(${currentScale / PERCENT_DIVIDER})`;
};

// Обработчики кнопок масштаба
scaleSmaller.addEventListener('click', () => {
  const newScale = Math.max(currentScale - SCALE_STEP, SCALE_MIN);
  updateScale(newScale);
});

scaleBigger.addEventListener('click', () => {
  const newScale = Math.min(currentScale + SCALE_STEP, SCALE_MAX);
  updateScale(newScale);
});

// Настройки эффектов
const effects = {
  none: {
    filter: '',
    unit: '',
    options: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
    },
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    options: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    },
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    options: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    },
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    options: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
    },
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    options: {
      range: { min: 0, max: 3 },
      start: 3,
      step: 0.1,
    },
  },
  heat: {
    filter: 'brightness',
    unit: '',
    options: {
      range: { min: 1, max: 3 },
      start: 3,
      step: 0.1,
    },
  },
};

// Инициализация слайдера noUiSlider
noUiSlider.create(effectLevelSlider, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
effectLevel.classList.add('hidden'); // Скрываем слайдер по умолчанию

// Функция обновления эффекта
const updateEffect = (effect) => {
  currentEffect = effect;
  const effectData = effects[effect];

  // Показываем/скрываем слайдер
  if (effect === 'none') {
    effectLevel.classList.add('hidden');
    imagePreview.style.filter = '';
  } else {
    effectLevel.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions(effectData.options);
    effectLevelSlider.noUiSlider.set(effectData.options.start);
  }
};

// Обработчик изменения слайдера
effectLevelSlider.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  const effectData = effects[currentEffect];

  effectLevelValue.value = value;
  if (currentEffect !== 'none') {
    imagePreview.style.filter = `${effectData.filter}(${value}${effectData.unit})`;
  }
});

// Обработчик переключения эффектов
effectsList.addEventListener('change', (evt) => {
  if (evt.target.name === 'effect') {
    updateEffect(evt.target.value);
  }
});

// Инициализация по умолчанию
// updateScale(100);
// updateEffect('none');

// Экспортируем функции для сброса
const resetEffects = () => {
  updateScale(100);
  updateEffect('none');
};

export { resetEffects };
