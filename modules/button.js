function getColorButton() {
  // Получаем элемент aside
  const aside = document.querySelector('aside');
  const main = document.querySelector('main');

  // Обработчик события для кнопки "Выбрать цвет"
  document.getElementById('colorButton').addEventListener('click', function () {
    // Скрываем основное содержимое
    console.log('Кнопка нажата');
    main.classList.add('hidden');
    // Показать aside
    aside.classList.remove('hidden');
  });
}

export { getColorButton };

// Вызов функции
// Как только DOM загрузится, вызываем функцию
document.addEventListener('DOMContentLoaded', () => {
  getColorButton();
});

function confirmColorButton() {
  const button = document
    .getElementById('confirmButton')
    .addEventListener('click', function () {
      alert('Выберите цвет');
    });
}
export { confirmColorButton };
