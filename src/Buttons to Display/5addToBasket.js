import { addtoBasket } from '../logic/5addToBasketLogic.js';

export function _5addToBasket() {
  const button = document.getElementById('addtoBasket');
  button.addEventListener('click', () => {
    alert('Добавлено');
  });

  // Вызываем логику после создания кнопки
  addtoBasket();
}
