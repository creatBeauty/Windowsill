const cuttingBtn = document.getElementById('cutting');
const aside = document.getElementById('aside');
const figure = document.getElementById('figure');

export function _8viewCutting() {
  if (cuttingBtn) {
    cuttingBtn.addEventListener('click', () => {
      // Hide aside section and show cutting visualization
      aside.classList.add('hidden');
      aside.classList.remove('visible-flex');

      figure.classList.remove('hidden');
      figure.classList.add('visible-flex');
    });
  }
}
