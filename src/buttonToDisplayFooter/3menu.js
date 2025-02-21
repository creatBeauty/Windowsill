import { logicViewsPage } from '../views/logicViewsPage.js';

document.addEventListener('DOMContentLoaded', () => {
  const BtnMenu = document.getElementById('BtnMenu');

  if (BtnMenu) {
    BtnMenu.addEventListener('click', () => {
      logicViewsPage('menu', 'visible-grid');
    });
  } else {
    console.error('Button with id "BtnMenu" not found');
  }
});
