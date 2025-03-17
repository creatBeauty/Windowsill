function guideAside() {
  document.addEventListener('DOMContentLoaded', () => {
    const getCostBtn = document.getElementById('getCost');
    const requestBtn = document.getElementById('request');

    // Проверяем, найдены ли кнопки
    console.log('Кнопки корзины:', {
      getCostBtn,
      requestBtn,
    });

    // Изначально мигает только кнопка "Стоимость заказа"
    getCostBtn.classList.add('blink-button');
    requestBtn.disabled = true;

    // После нажатия на кнопку "Стоимость заказа"
    getCostBtn.addEventListener('click', () => {
      console.log('Нажата кнопка "Стоимость заказа"');
      getCostBtn.classList.remove('blink-button');
      requestBtn.classList.add('blink-button');
      requestBtn.disabled = false;
    });

    // После нажатия на кнопку "Запросить счет"
    requestBtn.addEventListener('click', () => {
      requestBtn.classList.remove('blink-button');
    });
  });
}

export { guideAside };
