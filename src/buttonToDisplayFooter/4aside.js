import { logicViewsPage } from '../views/logicViewsPage.js';

document.addEventListener('DOMContentLoaded', () => {
  const BtnAside = document.getElementById('BtnAside');

  if (BtnAside) {
    BtnAside.addEventListener('click', () => {
      logicViewsPage('aside');
    });
  } else {
    console.error('Button with id "BtnAside" not found');
  }
});
