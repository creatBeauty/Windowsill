import { viewHeader } from '../views/header.js';

function confirmStone() {
  const button = document.getElementById('confirmColorStoneButton');
  button.addEventListener('click', function () {
    viewHeader();
  });
}

export { confirmStone };
