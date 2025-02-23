const CUTTING_MARGIN = 10; // 10 мм - это дополнительный размер для раскроя

function prepareDataForCutting(basketItems) {
  // Проверяем входные данные
  if (!Array.isArray(basketItems) || basketItems.length === 0) {
    console.warn('Корзина пуста или неверный формат данных');
    return [];
  }

  // Updated validation to handle string inputs
  const invalidItems = basketItems.filter(
    (item) =>
      !item ||
      typeof item.id === 'undefined' ||
      !item.width ||
      !item.length ||
      parseFloat(item.width) <= 0 ||
      parseFloat(item.length) <= 0
  );

  if (invalidItems.length > 0) {
    console.error('Некорректные данные в элементах корзины:', invalidItems);
    return [];
  }

  // Преобразуем данные в новый формат
  const result = [];
  let detailCounter = 0; // Счетчик для нумерации деталей

  basketItems.forEach((item) => {
    const count = parseInt(item.count) || 0;
    if (count <= 0) return;

    const width = parseInt(item.width) + CUTTING_MARGIN;
    const length = parseInt(item.length) + CUTTING_MARGIN;
    const thickness = parseInt(item.thickness);

    for (let i = 0; i < count; i++) {
      // Основная деталь
      result.push({
        id: detailCounter.toString(),
        width: width,
        height: length,
      });
      detailCounter++;

      // Боковые детали
      result.push({
        id: detailCounter.toString(),
        width: thickness,
        height: length,
      });
      detailCounter++;

      // Короткие боковые детали (спереди и сзади)
      result.push({
        id: detailCounter.toString(),
        width: width,
        height: thickness,
      });
      detailCounter++;

      result.push({
        id: detailCounter.toString(),
        width: width,
        height: thickness,
      });
      detailCounter++;
    }
  });

  return result;
}

export { prepareDataForCutting };
