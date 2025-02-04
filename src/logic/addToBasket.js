function addtoBasketlogic() {
  let countClick = 0;
  const DatCuting = [];

  return function handleAddToBasket() {
    alert('Выбранная позиция добавлена в корзину');
    const length = document.querySelector('.length').value;
    const width = document.querySelector('.width').value;
    const thickness = document.getElementById('thickness').value;
    const count = document.getElementById('countInfo').value;

    countClick++;

    const windowsill = {
      id: countClick,
      description: `${countClick}. Подоконник ${length}x${width}x${thickness} - ${count} шт.`,
    };

    DatCuting.push(windowsill);

    const newElement = document.createElement('div');
    newElement.textContent = windowsill.description;
    document
      .getElementById('outputSelectedWindowSills')
      .appendChild(newElement);

    return DatCuting; // Возвращаем массив, если он нужен где-то еще
  };
}

export { addtoBasketlogic };
