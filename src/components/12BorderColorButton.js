import { choosingStone } from '../logic/choosingStone.js';

function BorderColorButton() {
  const buttons = document.querySelectorAll('.grid-element');

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      // Убираем рамки у всех кнопок
      buttons.forEach((btn) => {
        btn.style.border = 'none';
      });

      // Устанавливаем рамку у нажатой кнопки
      button.style.border = '4px solid red';

      // Вызываем функцию выбора камня
      choosingStone(button);
    });
  });
}

export { BorderColorButton };
