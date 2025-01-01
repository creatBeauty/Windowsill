document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded'); // Проверка загрузки

  let currentIndex = 0;
  const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;

  console.log('Total items:', totalItems); // Проверка количества слайдов

  const showSlide = (index) => {
    console.log('Showing slide:', index); // Проверка переключения
    items.forEach((item) => {
      item.style.display = 'none'; // Используем стили напрямую
    });
    items[index].style.display = 'block';
  };

  // Обработчики для кнопок
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');

  nextButton.addEventListener('click', () => {
    console.log('Next clicked'); // Проверка клика
    currentIndex = (currentIndex + 1) % totalItems;
    showSlide(currentIndex);
  });

  prevButton.addEventListener('click', () => {
    console.log('Prev clicked'); // Проверка клика
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showSlide(currentIndex);
  });

  // Показываем первый слайд при загрузке
  showSlide(currentIndex);
});
