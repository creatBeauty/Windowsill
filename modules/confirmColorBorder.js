function confirmColorBorder() {
  const buttons = document.querySelectorAll('.grid-element');
  const stoneName = document.querySelector('.stoneName');

  buttons.forEach((el) => {
    el.addEventListener('click', function () {
      // Убираем рамки у всех кнопок
      buttons.forEach((button) => {
        button.style.border = 'none';
      });

      // Устанавливаем рамку у нажатой кнопки
      el.style.border = '4px solid red';

      // Получаем текст описания выбранного цвета
      const selectedDescription = el.querySelector(
        '.button-description'
      ).textContent;

      // Обновляем текст элемента stoneName
      stoneName.textContent = selectedDescription;
    });
  });
}

export { confirmColorBorder };
