import { logicViewsPage } from '../views/logicViewsPage.js';

function _6goToBasket() {
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('6goToBasket');
    if (button) {
      button.addEventListener('click', () => {
        logicViewsPage('aside');
      });
    } else {
      console.error('Button with id "1createOrder" not found');
    }
  });
}

export { _6goToBasket };
