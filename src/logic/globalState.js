// Объект для хранения глобального состояния
const initialState = {
  selectedStone: null,
  PriceForList: 0,
  totalPrice: 0,
  numberSheetsAfterCutting: 0,
  basketItems: [], // Пустой массив
  userInfo: {
    name: '',
    email: '',
  },
};

// Используем чистое начальное состояние
export const state = { ...initialState };

// Методы для работы с состоянием
export const setState = {
  setSelectedStone(stone) {
    console.log('Вызван setSelectedStone с параметром:', stone);

    if (!stone || typeof stone !== 'object') {
      console.warn('Предупреждение: некорректное значение камня:', stone);
      return;
    }

    if (!stone.name) {
      console.warn('Предупреждение: у камня отсутствует название');
      return;
    }

    state.selectedStone = stone;
  },

  addToBasket(item) {
    if (!item) {
      console.warn('Попытка добавить пустой элемент в корзину');
      return;
    }

    // Проверяем формат данных
    if (!Array.isArray(item.sizes)) {
      console.warn(
        'Некорректный формат элемента корзины. Ожидается массив sizes'
      );
      return;
    }

    state.basketItems = [...state.basketItems, item];

    localStorage.setItem('basketItems', JSON.stringify(state.basketItems));
    this.logState();
  },

  setTotalPrice(price) {
    state.totalPrice = price;
  },

  setNumberSheetsAfterCutting(number) {
    if (typeof number !== 'number' || number < 0) {
      console.warn('Некорректное значение для количества листов:', number);
      return;
    }
    state.numberSheetsAfterCutting = number;
  },

  setUserInfo(info) {
    state.userInfo = { ...state.userInfo, ...info };
  },

  // Метод для логирования текущего состояния
  logState() {
    console.log('Текущее состояние:');
    console.log('Выбранный камень:', state.selectedStone?.name || 'не выбран');
    console.log('Стоимость за лист:', state.selectedStone?.price || 0);
    console.log('Общая стоимость:', state.totalPrice);
    console.log(
      'Количество листов для закупки:',
      state.numberSheetsAfterCutting
    );
    console.log(
      'Количество товаров в корзине:',
      state.basketItems?.length || 0
    );
    console.log('Товары в корзине:', state.basketItems);
    console.log('Информация о пользователе:', state.userInfo);
  },
};
