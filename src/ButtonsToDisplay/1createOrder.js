import { logicViewsPage } from '../views/logicViewsPage.js';

function _1createOrder() {
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('1createOrder');
    if (button) {
      button.addEventListener('click', () => {
        logicViewsPage('main');
      });
    } else {
      console.error('Button with id "1createOrder" not found');
    }
  });
}

export { _1createOrder };
