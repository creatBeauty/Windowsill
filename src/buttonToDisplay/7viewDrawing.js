const drawingBtn = document.getElementById('drawing');
const aside = document.getElementById('aside');
const section = document.getElementById('section');
const returnButton = document.querySelector('#section .button2');

export function _7viewDrawing() {
  if (drawingBtn) {
    drawingBtn.addEventListener('click', () => {
      // Hide aside section and show drawing section
      aside.classList.add('hidden');
      aside.classList.remove('visible-flex');

      section.classList.remove('hidden');
      section.classList.add('visible-flex');
    });
  }

  // Add return button functionality
  if (returnButton) {
    returnButton.addEventListener('click', () => {
      // Hide drawing section and show aside
      section.classList.add('hidden');
      section.classList.remove('visible-flex');

      aside.classList.remove('hidden');
      aside.classList.add('visible-flex');
    });
  }
}
