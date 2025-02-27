const createOrderBtn = document.getElementById('1createOrder');
const header = document.getElementById('header');
const main = document.getElementById('main');

export function _1createOrder() {
  if (createOrderBtn) {
    createOrderBtn.addEventListener('click', () => {
      // Hide header and show main calculator section
      header.classList.add('hidden');
      main.classList.remove('hidden');
      main.classList.add('visible-flex');
    });
  }
}
