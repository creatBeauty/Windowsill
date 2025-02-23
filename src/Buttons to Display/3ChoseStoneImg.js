function _3ChoseStoneImg() {
  const buttons = document.querySelectorAll('.grid-element');

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      // Убираем классы у всех кнопок
      buttons.forEach((btn) => {
        btn.classList.remove('selected'); // Убираем класс
      });

      // Устанавливаем класс у нажатой кнопки
      button.classList.add('selected'); // Добавляем класс
    });
  });
}

export { _3ChoseStoneImg };
