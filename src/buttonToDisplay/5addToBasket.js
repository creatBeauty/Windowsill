const addToBasketBtn = document.getElementById('addtoBasket');
const width = document.getElementById('width');
const length = document.getElementById('length');
const thickness = document.getElementById('thickness');
const count = document.getElementById('count');
const outputSelectedWindowSills = document.getElementById(
  'outputSelectedWindowSills'
);
const mainStoneName = document.getElementById('mainStoneName');

export function _5addToBasket() {
  // Проверяем, что все элементы найдены
  if (
    !addToBasketBtn ||
    !width ||
    !length ||
    !thickness ||
    !count ||
    !outputSelectedWindowSills ||
    !mainStoneName
  ) {
    console.error('Some elements were not found');
    return;
  }

  addToBasketBtn.addEventListener('click', () => {
    // Validate inputs
    if (!width.value || !length.value || !count.value) {
      alert('Пожалуйста, заполните все размеры');
      return;
    }

    if (mainStoneName.textContent === 'выберите камень') {
      alert('Пожалуйста, выберите камень');
      return;
    }

    // Create new windowsill item
    const windowsillItem = document.createElement('div');
    windowsillItem.classList.add('windowsill-item');

    const itemInfo = document.createElement('div');
    itemInfo.classList.add('windowsill-info');
    itemInfo.textContent = `${width.value}x${length.value}x${thickness.value}мм - ${count.value}шт`;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '✕';
    deleteBtn.onclick = () => windowsillItem.remove();

    windowsillItem.appendChild(itemInfo);
    windowsillItem.appendChild(deleteBtn);
    outputSelectedWindowSills.appendChild(windowsillItem);

    // Show success alert
    alert('Заказ успешно добавлен в корзину');

    // Clear inputs
    width.value = '';
    length.value = '';
    count.value = '';
  });
}
