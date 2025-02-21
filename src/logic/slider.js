function slider() {
  document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');

    // Массив с путями к изображениям
    const images = [
      './foto/akril2.jpg', // Исправлен путь (убрана точка)
      './foto/akril2.jpg',
      './foto/akril2.jpg',
      './foto/akril2.jpg',
    ];

    let currentImageIndex = 0;

    // Создаем элементы слайдера
    const sliderImage = document.createElement('img');
    sliderImage.classList.add('slider-image');

    // Находим существующие кнопки вместо создания новых
    const prevButton = document.querySelector(
      '.buttonForSlider button:first-child'
    );
    const nextButton = document.querySelector(
      '.buttonForSlider button:last-child'
    );

    // Добавляем элементы в слайдер
    slider.appendChild(sliderImage);

    // Добавляем стили для правильного отображения
    slider.style.display = 'flex';
    slider.style.justifyContent = 'center';
    slider.style.alignItems = 'center';
    slider.style.position = 'relative';
    slider.style.overflow = 'hidden';
    slider.style.width = '100%';
    slider.style.height = 'auto';
    slider.style.maxHeight = '400px'; // Максимальная высота слайдера

    sliderImage.style.maxWidth = '100%';
    sliderImage.style.height = 'auto';
    sliderImage.style.objectFit = 'contain'; // Изменено с 'cover' на 'contain'

    // Функция для обновления изображения
    function updateImage() {
      sliderImage.src = images[currentImageIndex];
      sliderImage.alt = `Slide ${currentImageIndex + 1}`;
    }

    // Функция для перехода к следующему слайду
    function nextSlide() {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      updateImage();
    }

    // Функция для перехода к предыдущему слайду
    function prevSlide() {
      currentImageIndex =
        (currentImageIndex - 1 + images.length) % images.length;
      updateImage();
    }

    // Добавляем обработчики событий для кнопок
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Автоматическая прокрутка каждые 5 секунд
    const autoSlide = setInterval(nextSlide, 5000);

    // Останавливаем автопрокрутку при наведении мыши
    slider.addEventListener('mouseenter', () => {
      clearInterval(autoSlide);
    });

    // Запускаем первое изображение
    updateImage();
  });
}

export { slider };
