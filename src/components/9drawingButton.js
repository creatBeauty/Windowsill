import { viewSection } from '../views/section.js';

function getDrawing() {
  const button = document.getElementById('drawing');
  button.addEventListener('click', () => {
    viewSection();
  });
}

export { getDrawing };
