import { logicViewsPage } from '../views/logicViewsPage.js';

function _12contact() {
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('12contact');
    if (button) {
      button.addEventListener('click', () => {
        logicViewsPage('footer');
      });
    } else {
      console.error('Button with id "1createOrder" not found');
    }
  });
}

export { _12contact };
