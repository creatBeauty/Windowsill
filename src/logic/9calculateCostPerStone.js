import { state, setState } from './globalState.js';
import { createCutting, visualizeTiles } from './cutting.js';
import { prepareDataForCutting } from './dataForCutting.js';

const getCost = document.getElementById('getCost'); //Кнопка
const costOfTheOrder = document.getElementById('costOfTheOrder'); //место для записи
let cuttingResult; // Глобальная переменная для хранения результата раскроя

function COST() {
  // Обработчик для кнопки расчета стоимости
  getCost.addEventListener('click', () => {
    let dataForCutting = prepareDataForCutting(state.basketItems);
    console.log('Data for cutting:', dataForCutting);

    // Сохраняем результат раскроя
    cuttingResult = createCutting(dataForCutting);
    console.log('Cutting:', cuttingResult);

    // Создаем и отображаем элемент с количеством листов
    const sheetsCountDisplay = document.createElement('div');
    sheetsCountDisplay.style.fontSize = '24px';
    sheetsCountDisplay.style.color = 'black';
    sheetsCountDisplay.style.marginBottom = '20px';
    sheetsCountDisplay.textContent = `Количество листов: ${cuttingResult.sheetsCount}`;

    // Очищаем предыдущее содержимое и добавляем новое отображение
    costOfTheOrder.innerHTML = '';
    costOfTheOrder.appendChild(sheetsCountDisplay);

    // Вычисляем и отображаем общую стоимость
    if (state.selectedStone && state.selectedStone.price) {
      const totalCost = cuttingResult.sheetsCount * state.selectedStone.price;
      const costDisplay = document.createElement('div');
      costDisplay.textContent = `Общая стоимость: ${totalCost} ₽`;
      costOfTheOrder.appendChild(costDisplay);
    }
  });

  // Обработчик для кнопки просмотра раскроя
  document.getElementById('cutting').addEventListener('click', () => {
    if (cuttingResult && cuttingResult.tiles) {
      // Очищаем предыдущую визуализацию
      const cuttingVisualization = document.getElementById(
        'cuttingVisualization'
      );
      if (cuttingVisualization) {
        cuttingVisualization.innerHTML = '';
      }

      // Создаем новый раскрой и визуализируем его
      const visualResult = createCutting(
        prepareDataForCutting(state.basketItems)
      );
      visualizeTiles(visualResult.tiles);

      // Переключаемся на страницу с раскроем
      document.getElementById('figure').classList.remove('hidden');
      document.getElementById('aside').classList.add('hidden');
    } else {
      alert('Сначала рассчитайте стоимость заказа');
    }
  });
}

export { COST };
