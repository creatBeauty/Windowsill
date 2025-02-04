import { viewHeader } from '../views/header.js';

function GoingHome() {
  const buttons = document.querySelectorAll('.exit');
  buttons.forEach((button) => button.addEventListener('click', viewHeader));
}

export { GoingHome };
