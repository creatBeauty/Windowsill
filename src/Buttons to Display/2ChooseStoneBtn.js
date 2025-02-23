import { logicViewsPage } from '../views/logicViewsPage.js';

function _2ChooseStoneBtn() {
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('2ChooseStoneBtn');
    if (button) {
      button.addEventListener('click', () => {
        logicViewsPage('menu', 'visible-grid');
      });
    } else {
      console.error('Button with id "1createOrder" not found');
    }
  });
}

export { _2ChooseStoneBtn };
