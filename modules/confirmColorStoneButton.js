function confirmColorStoneButton() {
  const button = document.getElementById('confirmColorStoneButton');
  const aside = document.querySelector('aside');
  const main = document.querySelector('main');
  button.addEventListener('click', function () {
    console.log('Кнопка нажата');
    aside.classList.add('hidden');

    main.classList.remove('hidden');
  });
}
export { confirmColorStoneButton };
