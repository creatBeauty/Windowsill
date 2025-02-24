import { addtoBasket } from '../logic/5addToBasketLogic.js';

export function _5addToBasket() {
  const button = document.getElementById('addtoBasket');

  if (!button) {
    console.error('Элемент с id "addtoBasket" не найден');
    return;
  }

  button.addEventListener('click', function (e) {
    // Предотвращаем всплытие события
    e.stopPropagation();

    // Вызываем основную логику
    addtoBasket();

    // Показываем алерт
    alert('Добавлено');
  });
}
