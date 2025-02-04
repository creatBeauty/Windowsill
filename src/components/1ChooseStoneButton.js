import { viewMain } from '../views/main.js';

function ChooseStone() {
  const button = document.getElementById('getStoneButton');
  button.addEventListener('click', function () {
    viewMain();
  });
}

export { ChooseStone };
