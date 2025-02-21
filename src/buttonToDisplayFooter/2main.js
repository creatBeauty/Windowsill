import { logicViewsPage } from '../views/logicViewsPage.js';

document.addEventListener('DOMContentLoaded', () => {
  const BtnMain = document.getElementById('BtnMain');

  if (BtnMain) {
    BtnMain.addEventListener('click', () => {
      logicViewsPage('main');
    });
  } else {
    console.error('Button with id "BtnMain" not found');
  }
});
