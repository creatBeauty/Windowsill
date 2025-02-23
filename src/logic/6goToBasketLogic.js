import { state } from './globalState.js';

let goToBasketLogic = document.getElementById('6goToBasket');
let priceForList = document.getElementById('priceForList');

function formatDimensions(item) {
  return `${item.length}х${item.width}х${item.thickness}-${item.count}`;
}

function _6goToBasketLogic() {
  goToBasketLogic.addEventListener('click', () => {
    // Get existing values from the form/inputs
    const length = parseFloat(document.getElementById('length').value) || 0;
    const width = parseFloat(document.getElementById('width').value) || 0;
    const thickness =
      parseFloat(document.getElementById('thickness').value) || 0;
    const count = parseFloat(document.getElementById('count').value) || 0;

    let outputColorStone = document.getElementById('outputColorStone');
    let priceForList = document.getElementById('priceForList');
    let outputSelectedWindowSills = document.getElementById(
      'outputSelectedWindowSills'
    );
    let messageInfo = document.getElementById('messageInfo');

    outputColorStone.textContent = state.selectedStone.name;
    priceForList.textContent = state.selectedStone.price;

    // Просто форматируем текущие значения из формы
    if (length && width && thickness && count) {
      // Форматируем список товаров из корзины
      outputSelectedWindowSills.textContent = state.basketItems
        .map((item) => formatDimensions(item))
        .join(', ');

      // Форматируем текущие значения из формы
      messageInfo.textContent = `Прошу выставить счет за подоконники ${state.basketItems
        .map((item) => formatDimensions(item))
        .join(', ')} ${state.selectedStone.name}`;
    }
  });
}

export { _6goToBasketLogic };
