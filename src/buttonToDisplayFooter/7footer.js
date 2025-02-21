import { logicViewsPage } from '../views/logicViewsPage.js';

document.addEventListener('DOMContentLoaded', () => {
  const BtnFooter = document.getElementById('BtnFooter');

  if (BtnFooter) {
    BtnFooter.addEventListener('click', () => {
      logicViewsPage('footer');
    });
  } else {
    console.error('Button with id "BtnFooter" not found');
  }
});
