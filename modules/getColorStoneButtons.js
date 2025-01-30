function getColorStoneButtons() {
  // Получаем элементы
  const header = document.querySelector('header');
  const aside = document.querySelector('aside');
  const main = document.querySelector('main');
  const gotoShoppingCart = document.querySelector('.sectionShoppingCart'); // Исправленный селектор

  // Устанавливаем все элементы в скрытое состояние при загрузке
  header.style.display = 'block';
  aside.style.display = 'none'; // Скрываем aside
  gotoShoppingCart.style.display = 'none';

  document.getElementById('colorButton').addEventListener('click', function () {
    // Скрываем главный элемент
    header.style.display = 'none';
    main.style.display = 'none'; // Скрываем главный элемент
    // Показываем элементы aside и gotoShoppingCart
    aside.style.display = 'grid'; // Показываем aside
    gotoShoppingCart.style.display = 'block';
  });
}

export { getColorStoneButtons };
