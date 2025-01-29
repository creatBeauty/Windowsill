function confirmColorBorder() {
  const buttons = document.querySelectorAll('.grid-element');
  const borderElement = document.querySelector('.border');

  const borders = document.querySelectorAll('.grid-element');
  borders.forEach((el) => {
    el.addEventListener('click', function () {
      buttons.forEach((button) => {
        button.style.border = 'none';
      });

      el.style.border = '2px solid red';
    });
  });
}
export { confirmColorBorder };
