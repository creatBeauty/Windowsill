import { calculateTheCost } from '../logic/calculateTheCost.js';

function getCost() {
  const button = document.getElementById('getCost');

  button.addEventListener('click', () => {
    // Получаем все необходимые значения
    const priceForList = document.getElementById('priceForList').textContent;
    const costOfTheOrder = document.getElementById('costOfTheOrder');
    const customSheets = calculateTheCost();
    let messageInfo = document.getElementById('message-info');
    let windowsill = document.getElementById('outputSelectedWindowSills');
    let colorStone = document.getElementById('outputColorStone').textContent;

    // Вычисляем общую стоимость
    const totalCost = (parseFloat(priceForList) * customSheets).toFixed(2);

    // Обновляем отображение
    costOfTheOrder.textContent = totalCost;

    messageInfo.textContent = `Стоимость ${totalCost} за <<${windowsill.textContent}>> камень ${colorStone} `;
  });
}

export { getCost };
