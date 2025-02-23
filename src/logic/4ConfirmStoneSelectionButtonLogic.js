// Получаем .grid-element перебираем , находим элемент с классом .selectedChoseStone и считываем с него данные, записываем в глобальные переменные
import { state, setState } from './globalState.js';

function _4ConfirmStoneSelectionButtonLogic() {
  // Находим кнопку подтверждения
  const confirmButton = document.getElementById('4ConfirmStoneSelectionButton');

  // Добавляем обработчик события
  confirmButton.addEventListener('click', () => {
    const buttons = document.querySelectorAll('.grid-element');
    const mainStoneNameElement = document.getElementById('mainStoneName');
    let selectedStone = null;

    buttons.forEach((button) => {
      if (button.classList.contains('selectedChoseStone')) {
        const buttonDescription = button.querySelector(
          '.button-description'
        ).textContent;
        const priceElement = button.querySelector('.symmPrice');
        const price = priceElement ? parseFloat(priceElement.textContent) : 0;

        selectedStone = {
          name: buttonDescription,
          price: price,
          id: button.getAttribute('class').split(' ')[0] || null,
        };
        mainStoneNameElement.textContent = selectedStone.name;
      }
    });

    if (selectedStone) {
      setState.setSelectedStone(selectedStone);
    } else {
      console.warn('Камень не выбран');
    }
  });
}

export { _4ConfirmStoneSelectionButtonLogic };
