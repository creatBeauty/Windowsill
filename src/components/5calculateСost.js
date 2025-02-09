import { calculateTheCost } from '../logic/calculateTheCost.js';

function getCost() {
  const button = document.getElementById('getCost');

  button.addEventListener('click', () => {
    // Получаем все необходимые значения
    const priceForList = document.getElementById('priceForList').textContent;
    const costOfTheOrder = document.getElementById('costOfTheOrder');
    const customSheetsToOrder = calculateTheCost();
    let messageInfo = document.getElementById('message-info');
    let windowsill = document.getElementById('outputSelectedWindowSills');
    let colorStone = document.getElementById('outputColorStone').textContent;

    const length = document.querySelector('.length').value;
    const width = document.querySelector('.width').value;
    const thickness = document.getElementById('thickness').value;
    const count = document.getElementById('countInfo').value;

    // Получаем процент использования купленного материала
    const kUseMaterial =
      (length * width * count) / 1000000 / (customSheetsToOrder * 3.6 * 0.76);
    const extension = 3; //Добавочный коэф-т, стоим-сть клея,доставки....

    console.log(kUseMaterial);
    console.log(priceForList);
    console.log(customSheetsToOrder);

    // Вычисляем общую стоимость
    const totalCost = Math.round(
      parseFloat(priceForList) * customSheetsToOrder +
        kUseMaterial *
          extension *
          (parseFloat(priceForList) * customSheetsToOrder)
    );

    // Обновляем отображение
    costOfTheOrder.textContent = totalCost;

    messageInfo.textContent = `Прошу выставить счет на сумму ${totalCost} за <<${windowsill.textContent}>> камень ${colorStone} `;
  });
}

export { getCost };
