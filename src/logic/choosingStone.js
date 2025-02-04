function choosingStone(button) {
  // Получаем данные выбранной кнопки
  const selectedDescription = button.querySelector('.button-description');
  const priceElement = button.querySelector('.symmPrice');
  const stoneName = document.querySelector('.stoneName');
  const stoneName2 = document.getElementById('outputColorStone');
  const priceForList = document.getElementById('priceForList');

  const selectedText = selectedDescription.textContent;
  const price = parseFloat(priceElement.textContent);

  // Обновляем текст элемента stoneName
  stoneName.textContent = selectedText;
  stoneName2.textContent = selectedText;
  priceForList.textContent = price;

  console.log(selectedText);
  console.log(price);

  return { selectedText, price };
}

export { choosingStone };
