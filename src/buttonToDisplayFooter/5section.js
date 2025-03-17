import { logicViewsPage } from '../views/logicViewsPage.js';

document.addEventListener('DOMContentLoaded', () => {
  const BtnSection = document.getElementById('BtnSection');

  if (BtnSection) {
    BtnSection.addEventListener('click', () => {
      logicViewsPage('section');
    });
  } else {
    console.error('Button with id "BtnSection" not found');
  }
});
