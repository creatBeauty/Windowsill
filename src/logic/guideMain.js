function guideMain() {
  document.addEventListener('DOMContentLoaded', () => {
    const chooseStoneBtn = document.getElementById('2ChooseStoneBtn');
    const addToBasketBtn = document.getElementById('addtoBasket');
    const goToBasketBtn = document.getElementById('6goToBasket');

    // Добавим проверку, что кнопки найдены
    console.log('Buttons:', {
      chooseStoneBtn,
      addToBasketBtn,
      goToBasketBtn,
    });

    // Изначально активна только первая кнопка
    chooseStoneBtn.classList.add('blink-button');
    addToBasketBtn.disabled = true;
    goToBasketBtn.disabled = true;

    // После нажатия на первую кнопку
    chooseStoneBtn.addEventListener('click', () => {
      console.log('First button clicked');
      chooseStoneBtn.classList.remove('blink-button');
      addToBasketBtn.classList.add('blink-button');
      addToBasketBtn.disabled = false;
    });

    // После нажатия на вторую кнопку
    addToBasketBtn.addEventListener('click', () => {
      addToBasketBtn.classList.remove('blink-button');
      goToBasketBtn.classList.add('blink-button');
      goToBasketBtn.disabled = false;
    });

    // После нажатия на третью кнопку
    goToBasketBtn.addEventListener('click', () => {
      goToBasketBtn.classList.remove('blink-button');
    });
  });
}

export { guideMain };
