function addtoBasket() {
  let countClick = 0;
  const addB = document.getElementById('addtoBasket');

  // Добавляем новый контейнер для вывода, где вы будете отображать товары
  const outputContainer = document.getElementById('output');

  addB.addEventListener('click', function () {
    const length = document.querySelector('.length').value;
    const width = document.querySelector('.width').value;
    const thickness = document.getElementById('thickness').value;
    const count = document.getElementById('countInfo').value; // Убедитесь, что у элемента с этим ID имеется значение
    const stoneNameElement = document.querySelector('.stoneName');

    const stoneNameText = stoneNameElement.textContent;

    countClick++;

    // Использование шаблонных литералов
    const windowsill = `${countClick}. Подоконник ${length}x${width}x${thickness}-${count} шт. ${stoneNameText}`;

    // Создаем новый элемент для вывода
    const newElement = document.createElement('div');
    newElement.textContent = windowsill; // Устанавливаем текст элемента

    // Добавляем новый элемент в outputContainer
    outputContainer.appendChild(newElement);
  });
}

export { addtoBasket };
