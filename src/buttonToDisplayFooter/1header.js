import { logicViewsPage } from '../views/logicViewsPage.js';

document.addEventListener('DOMContentLoaded', () => {
  const BtnHeader = document.getElementById('BtnHeader');

  if (BtnHeader) {
    // Проверяем, что элемент найден
    BtnHeader.addEventListener('click', () => {
      logicViewsPage('header');
    });
  } else {
    console.error('Button with id "BtnHeader" not found');
  }
});
