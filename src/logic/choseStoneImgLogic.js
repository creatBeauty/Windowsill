function choosingStone() {
  const buttons = document.querySelectorAll('.grid-element');

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      // Remove class from all buttons
      buttons.forEach((btn) => {
        btn.classList.remove('selectedChoseStone');
      });

      // Add class to clicked button
      button.classList.add('selectedChoseStone');
    });
  });
}

export { choosingStone };
