function gotoShoppingCart() {
  // Получаем элементы
  const header = document.querySelector('header');
  const aside = document.querySelector('aside');
  const main = document.querySelector('main');
  const section = document.querySelector('section'); // Исправленный селектор

  // Устанавливаем начальные состояния элементов
  header.style.display = 'block';
  aside.style.display = 'none'; // Скрываем aside
  section.style.display = 'none';

  // Присоединяем обработчик события к корзине
  document.querySelector('.basket').addEventListener('click', function () {
    // Скрываем элементы
    main.style.display = 'none'; // Скрываем главный элемент
    aside.style.display = 'none'; // Скрываем aside
    header.style.display = 'none';

    // Показываем секцию
    section.style.display = 'block'; // Показываем секцию (или 'flex', если требуется)
  });
}

export { gotoShoppingCart };
