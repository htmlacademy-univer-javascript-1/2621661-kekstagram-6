// effects.js
const imagePreview = document.querySelector('.img-upload__preview img');
const scaleValue = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const effectsList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.effect-level__slider');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const DEFAULT_SCALE = 100;

let currentScale = DEFAULT_SCALE;
let currentEffect = 'none';
let slider = null;

// =========== МАСШТАБ ===========
const scaleImage = (value) => {
  currentScale = value;
  scaleValue.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
};

scaleSmaller.addEventListener('click', () => {
  scaleImage(Math.max(currentScale - SCALE_STEP, SCALE_MIN));
});

scaleBigger.addEventListener('click', () => {
  scaleImage(Math.min(currentScale + SCALE_STEP, SCALE_MAX));
});

// =========== ЭФФЕКТЫ ===========
const effects = {
  none: {
    filter: '',
    unit: '',
    className: 'effects__preview--none',
    options: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
    },
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    className: 'effects__preview--chrome',
    options: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    },
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    className: 'effects__preview--sepia',
    options: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    },
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    className: 'effects__preview--marvin',
    options: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
    },
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    className: 'effects__preview--phobos',
    options: {
      range: { min: 0, max: 3 },
      start: 3,
      step: 0.1,
    },
  },
  heat: {
    filter: 'brightness',
    unit: '',
    className: 'effects__preview--heat',
    options: {
      range: { min: 1, max: 3 },
      start: 3,
      step: 0.1,
    },
  },
};

// =========== ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА ===========
const initSlider = () => {
  // Проверяем, что элемент и библиотека существуют
  if (!sliderContainer) {
    console.error('❌ Элемент .effect-level__slider не найден!');
    return;
  }

  if (typeof noUiSlider === 'undefined') {
    console.error('❌ Библиотека noUiSlider не загружена!');
    return;
  }

  // Если слайдер уже создан - уничтожаем
  if (sliderContainer.noUiSlider) {
    sliderContainer.noUiSlider.destroy();
  }

  // Создаём слайдер с настройками по умолчанию
  noUiSlider.create(sliderContainer, {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });

  console.log('✅ Слайдер создан');
  slider = sliderContainer.noUiSlider;

  // Обработчик изменения слайдера
  slider.on('update', (values, handle) => {
    const value = parseFloat(values[handle]);
    const effectData = effects[currentEffect];

    // Обновляем значение в скрытом поле
    effectLevelValue.value = value;

    // Применяем фильтр (кроме эффекта "none")
    if (currentEffect !== 'none') {
      imagePreview.style.filter = `${effectData.filter}(${value}${effectData.unit})`;
    }
  });
};

// =========== ОБНОВЛЕНИЕ ЭФФЕКТА ===========
const updateEffect = (effect) => {
  currentEffect = effect;
  const effectData = effects[effect];

  // Обновляем класс изображения
  imagePreview.className = '';
  if (effect !== 'none') {
    imagePreview.classList.add(effectData.className);
  }

  // Показываем/скрываем слайдер
  if (effect === 'none') {
    effectLevel.classList.add('hidden');
    imagePreview.style.filter = '';

    // Для эффекта "none" сбрасываем слайдер
    if (slider) {
      slider.updateOptions({
        range: { min: 0, max: 100 },
        start: 100,
        step: 1
      });
    }
  } else {
    effectLevel.classList.remove('hidden');

    // Обновляем настройки слайдера для текущего эффекта
    if (slider) {
      slider.updateOptions(effectData.options);
      slider.set(effectData.options.start);
    } else {
      // Если слайдер не инициализирован - инициализируем
      initSlider();
      if (slider) {
        slider.updateOptions(effectData.options);
        slider.set(effectData.options.start);
      }
    }
  }
};

// =========== ОБРАБОТЧИКИ ===========
effectsList.addEventListener('change', (evt) => {
  if (evt.target.name === 'effect') {
    updateEffect(evt.target.value);
  }
});

// =========== СБРОС ЭФФЕКТОВ ===========
const resetEffects = () => {
  // Сброс масштаба
  currentScale = DEFAULT_SCALE;
  scaleImage(DEFAULT_SCALE);

  // Сброс эффекта
  currentEffect = 'none';
  updateEffect('none');

  // Сброс радио-кнопки
  const noneRadio = document.querySelector('#effect-none');
  if (noneRadio) {
    noneRadio.checked = true;
  }

  // Сброс изображения
  imagePreview.className = '';
  imagePreview.style.filter = '';

  // Сброс слайдера
  if (slider) {
    slider.updateOptions({
      range: { min: 0, max: 100 },
      start: 100,
      step: 1
    });
    slider.set(100);
  }
};

// =========== ИНИЦИАЛИЗАЦИЯ ===========
// Инициализируем слайдер при загрузке
if (sliderContainer && typeof noUiSlider !== 'undefined') {
  initSlider();
} else {
  console.warn('Слайдер не может быть инициализирован при загрузке');
}

// Устанавливаем начальные значения
scaleImage(DEFAULT_SCALE);
updateEffect('none');

export { resetEffects };
