function confirmColorStoneButton() {
  const button = document.getElementById('confirmColorStoneButton');
  const aside = document.querySelector('aside');
  const main = document.querySelector('main');
  const section = document.querySelector('section');

  // Устанавливаем начальное состояние главного элемента
  main.style.display = 'block'; // Показываем main (или 'flex', если требуется)

  // Скрываем aside при загрузке
  aside.style.display = 'none';

  button.addEventListener('click', function () {
    console.log('Кнопка нажата');

    // Скрываем aside
    aside.style.display = 'none'; // Скрыть aside

    // Показываем главный элемент
    main.style.display = 'block';
    section.style.display = 'none';
    // Показать main (или 'flex')
  });
}

export { confirmColorStoneButton };
