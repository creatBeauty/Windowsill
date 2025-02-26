import { logicViewsPage } from '../views/logicViewsPage.js';

function _8viewCutting() {
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('cutting');
    if (button) {
      button.addEventListener('click', () => {
        logicViewsPage('figure');
      });
    } else {
      console.error('Button with id "1createOrder" not found');
    }
  });
}

export { _8viewCutting };
