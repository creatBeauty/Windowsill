import { logicViewsPage } from '../views/logicViewsPage.js';

function _4ConfirmStoneSelectionButton() {
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('4ConfirmStoneSelectionButton');
    if (button) {
      button.addEventListener('click', () => {
        logicViewsPage('main');
      });
    } else {
      console.error('Button with id "1createOrder" not found');
    }
  });
}

export { _4ConfirmStoneSelectionButton };
