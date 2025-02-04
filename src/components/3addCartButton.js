import { addtoBasketlogic } from '../logic/addToBasket.js';

function addtoBasket() {
  const addB = document.getElementById('addtoBasket');
  const handler = addtoBasketlogic(); // Создаем замыкание один раз
  addB.addEventListener('click', handler); // Используем созданную функцию как обработчик
}

export { addtoBasket };
