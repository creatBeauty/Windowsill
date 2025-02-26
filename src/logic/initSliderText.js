function initSlider() {
  const slides = document.querySelectorAll('.textSlider');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Показываем первый слайд
  showSlide(0);

  // Запускаем автоматическую смену слайдов каждые 3 секунды
  setInterval(nextSlide, 6000);
}

// Запускаем слайдер после загрузки страницы
export { initSlider };
