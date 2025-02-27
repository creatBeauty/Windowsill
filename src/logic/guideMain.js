function guideMain() {
  const ChooseStoneBtn = document.getElementById('2ChooseStoneBtn');
  const addtoBasket = document.getElementById('addtoBasket');
  const goToBasket = document.getElementById('6goToBasket');

  if (!ChooseStoneBtn || !addtoBasket || !goToBasket) {
    console.error('Не удалось найти один или несколько элементов');
    return;
  }

  ChooseStoneBtn.classList.add('pulse-button');

  ChooseStoneBtn.addEventListener('click', () => {
    ChooseStoneBtn.classList.remove('pulse-button');
    addtoBasket.classList.add('pulse-button');
    goToBasket.classList.remove('pulse-button');
  });

  addtoBasket.addEventListener('click', () => {
    ChooseStoneBtn.classList.remove('pulse-button');
    addtoBasket.classList.remove('pulse-button');
    goToBasket.classList.add('pulse-button');
  });

  goToBasket.addEventListener('click', () => {
    ChooseStoneBtn.classList.remove('pulse-button');
    addtoBasket.classList.remove('pulse-button');
    goToBasket.classList.remove('pulse-button');
  });
}

export { guideMain };
