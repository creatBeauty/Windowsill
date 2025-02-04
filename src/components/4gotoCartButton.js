import { viewAside } from '../views/aside.js';

function goToBasket() {
  const button = document.getElementById('gotoBasket');
  button.addEventListener('click', function () {
    viewAside();
  });
}

export { goToBasket };
