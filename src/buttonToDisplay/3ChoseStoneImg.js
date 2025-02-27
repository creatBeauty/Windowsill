const menu = document.getElementById('menu');
const mainStoneName = document.getElementById('mainStoneName');
const outputColorStone = document.getElementById('outputColorStone');
const priceForList = document.getElementById('priceForList');

export function _3ChoseStoneImg() {
  // Get all stone buttons in the menu
  const stoneButtons = menu.querySelectorAll('.grid-element');

  stoneButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Remove selected class from all buttons
      stoneButtons.forEach((btn) => btn.classList.remove('selected'));

      // Add selected class to clicked button
      button.classList.add('selected');

      // Get stone description and price
      const description = button.querySelector(
        '.button-description'
      ).textContent;
      const price = button.querySelector('.symmPrice').textContent;

      // Update stone information in main and aside sections
      mainStoneName.textContent = description;
      outputColorStone.textContent = description;
      priceForList.textContent = `${price} руб.`;
    });
  });
}
