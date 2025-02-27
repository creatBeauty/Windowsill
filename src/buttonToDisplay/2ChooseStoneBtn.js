const chooseStoneBtn = document.getElementById('2ChooseStoneBtn');
const main = document.getElementById('main');
const menu = document.getElementById('menu');

export function _2ChooseStoneBtn() {
  if (chooseStoneBtn) {
    chooseStoneBtn.addEventListener('click', () => {
      // Hide main calculator and show stone selection menu
      main.classList.add('hidden');
      main.classList.remove('visible-flex');

      menu.classList.remove('hidden');
      menu.classList.add('visible-grid');
    });
  }
}
