const goToBasketBtn = document.getElementById('6goToBasket');
const main = document.getElementById('main');
const aside = document.getElementById('aside');
const outputSelectedWindowSills = document.getElementById(
  'outputSelectedWindowSills'
);

export function _6goToBasket() {
  if (goToBasketBtn) {
    goToBasketBtn.addEventListener('click', () => {
      // Check if there are items in the basket
      if (!outputSelectedWindowSills.children.length) {
        alert('Корзина пуста. Добавьте подоконники в корзину.');
        return;
      }

      // Hide main calculator and show basket
      main.classList.add('hidden');
      main.classList.remove('visible-flex');

      aside.classList.remove('hidden');
      aside.classList.add('visible-flex');

      // Update message for email
      updateMessageInfo();
    });
  }
}

function updateMessageInfo() {
  const messageInfo = document.getElementById('messageInfo');
  const outputColorStone = document.getElementById('outputColorStone');

  if (messageInfo && outputColorStone) {
    let message = `Камень: ${outputColorStone.textContent}\n\nПодоконники:\n`;

    // Add each windowsill to the message
    const windowsills = outputSelectedWindowSills.children;
    for (let item of windowsills) {
      message += `${item.firstChild.textContent}\n`;
    }

    messageInfo.value = message;
  }
}
