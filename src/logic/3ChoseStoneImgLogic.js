// Устанавливаем класс у нажатой кнопки

function _3choosingStone() {
  const buttons = document.querySelectorAll('.grid-element');

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      // Убираем классы у всех кнопок
      buttons.forEach((btn) => {
        btn.classList.remove('selectedChoseStone'); // Убираем класс
      });

      // Устанавливаем класс у нажатой кнопки
      button.classList.add('selectedChoseStone'); // Добавляем класс
    });
  });
}

export { _3choosingStone };
