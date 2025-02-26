import { state, setState } from '../logic/globalState.js';

export function _5addToBasket() {
  const button = document.getElementById('addtoBasket');

  if (!button) {
    console.error('Элемент с id "addtoBasket" не найден');
    return;
  }

  button.addEventListener('click', function (e) {
    e.stopPropagation();

    // Получаем элементы и сразу проверяем их наличие
    const length = document.getElementById('length');
    const width = document.getElementById('width');
    const thickness = document.getElementById('thickness');
    const count = document.getElementById('count');

    // Подробная диагностика каждого поля
    if (!length) console.error('Поле длины не найдено (ID: length)');
    if (!width) console.error('Поле ширины не найдено (ID: width)');
    if (!thickness) console.error('Поле толщины не найдено (ID: thickness)');
    if (!count) console.error('Поле количества не найдено (ID: count)');

    if (!length || !width || !thickness || !count) {
      console.error(
        'Проверьте, что в HTML есть все необходимые поля с правильными ID'
      );
      return;
    }

    // Проверяем значения полей
    if (!length.value || !width.value || !thickness.value || !count.value) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    // Преобразуем данные в нужный формат
    const windowSillObj = {
      id: state.basketItems.length,
      stone: state.selectedStone,
      length: length.value,
      width: width.value,
      thickness: thickness.value,
      count: count.value,
      sizes: Array(parseInt(count.value))
        .fill()
        .map(
          (_, index) =>
            `${state.basketItems.length}_${index} ${width.value}X${length.value}`
        ),
    };

    setState.addToBasket(windowSillObj);
    alert('Добавлено');
  });
}
