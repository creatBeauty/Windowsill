const confirmButton = document.getElementById('4ConfirmStoneSelectionButton');
const menu = document.getElementById('menu');
const main = document.getElementById('main');

export function _4ConfirmStoneSelectionButton() {
  if (confirmButton) {
    confirmButton.addEventListener('click', () => {
      // Check if a stone is selected
      const selectedStone = menu.querySelector('.grid-element.selected');

      if (selectedStone) {
        // Hide menu and show main calculator
        menu.classList.add('hidden');
        menu.classList.remove('visible-grid');

        main.classList.remove('hidden');
        main.classList.add('visible-flex');
      } else {
        // Alert if no stone is selected
        alert('Пожалуйста, выберите камень');
      }
    });
  }
}
