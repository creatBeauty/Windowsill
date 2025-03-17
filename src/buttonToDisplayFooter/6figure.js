import { logicViewsPage } from '../views/logicViewsPage.js';

document.addEventListener('DOMContentLoaded', () => {
  const BtnFigure = document.getElementById('BtnFigure');

  if (BtnFigure) {
    BtnFigure.addEventListener('click', () => {
      logicViewsPage('figure');
    });
  } else {
    console.error('Button with id "BtnFigure" not found');
  }
});
