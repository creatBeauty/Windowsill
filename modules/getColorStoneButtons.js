function getColorStoneButtons() {
  // Получаем элементы
  const aside = document.querySelector('aside');
  const main = document.querySelector('main');
  const gotoShoppingCart = document.querySelector('.gotoShoppingCart'); // Исправленный селектор

  // Устанавливаем все элементы в скрытое состояние при загрузке
  aside.style.display = 'none'; // Скрываем aside
  gotoShoppingCart.style.display = 'none'; // Скрываем gotoShoppingCart

  document.getElementById('colorButton').addEventListener('click', function () {
    // Скрываем главный элемент
    main.style.display = 'none'; // Скрываем главный элемент
    // Показываем элементы aside и gotoShoppingCart
    aside.style.display = 'grid'; // Показываем aside
    gotoShoppingCart.style.display = 'block'; // Показываем gotoShoppingCart
  });
}

export { getColorStoneButtons };
