//Подсчет необходимого колличества листов для изготовления заказа

import { createCutting } from './cutting.js';
import { convertDatForCutting } from './convertDatForCutting.js';

function calculateTheCost() {
  const outputElement = document.getElementById('outputSelectedWindowSills');

  try {
    if (!outputElement || !outputElement.textContent) {
      throw new Error(
        'Нет данных для расчета. Пожалуйста, выберите подоконники.'
      );
    }

    const items = outputElement.textContent
      .split('\n')
      .filter((line) => line.trim())
      .map((line, index) => ({
        id: index + 1,
        description: line.trim(),
      }));

    const dataForCutting = convertDatForCutting(items);
    // Вызываем функцию createCutting с данными
    const result = createCutting(dataForCutting)(); // Добавляем () для вызова функции

    return result;
  } catch (error) {
    console.error('Ошибка при расчете стоимости:', error);
    return null;
  }
}

export { calculateTheCost };
