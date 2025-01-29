function gotoShoppingCart() {
  // Получаем элементы
  const aside = document.querySelector('aside');
  const main = document.querySelector('main');
  const section = document.querySelector('section'); // Исправленный селектор

  // Устанавливаем начальные состояния элементов
  aside.style.display = 'none'; // Скрываем aside
  section.style.display = 'none'; // Скрываем секцию

  // Присоединяем обработчик события к корзине
  document.querySelector('.basket').addEventListener('click', function () {
    // Скрываем элементы
    main.style.display = 'none'; // Скрываем главный элемент
    aside.style.display = 'none'; // Скрываем aside

    // Показываем секцию
    section.style.display = 'block'; // Показываем секцию (или 'flex', если требуется)
  });
}

export { gotoShoppingCart };
