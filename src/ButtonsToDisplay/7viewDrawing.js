import { logicViewsPage } from '../views/logicViewsPage.js';

function _7viewDrawing() {
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('drawing');
    if (button) {
      button.addEventListener('click', () => {
        logicViewsPage('section');
      });
    } else {
      console.error('Button with id "1createOrder" not found');
    }
  });
}

export { _7viewDrawing };
