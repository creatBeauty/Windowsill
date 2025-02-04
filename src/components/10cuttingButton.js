import { viewFigure } from '../views/figure.js';

function getCutting() {
  const button = document.getElementById('cutting');
  button.addEventListener('click', () => {
    viewFigure();
  });
}

export { getCutting };
