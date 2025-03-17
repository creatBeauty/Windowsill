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
    console.log('Площадь обработки:', this.calculateTotalArea());
  },

  calculateTotalArea() {
    if (!state.basketItems || state.basketItems.length === 0) {
      console.log('Корзина пуста');
      return 0;
    }

    const totalArea = state.basketItems.reduce((sum, item) => {
      console.log('Обрабатываем item:', item);
      if (!item.sizes || !Array.isArray(item.sizes)) {
        console.warn('Некорректный формат item.sizes:', item);
        return sum;
      }

      const itemTotalArea = item.sizes.reduce((itemSum, size) => {
        console.log('Обрабатываем размер:', size);
        // Обработка строки формата "300X2000" или "300_2000"
        let width, length;

        if (typeof size === 'string') {
          // Если строка содержит пробел, разбиваем на отдельные размеры
          const sizeArray = size.split(' ');

          // Обрабатываем каждый размер в строке
          return sizeArray.reduce((sizeSum, singleSize) => {
            // Игнорируем размер "0_0"
            if (singleSize === '0_0') {
              return sizeSum;
            }

            // Поддержка обоих форматов разделителей: X и _
            const dimensions = singleSize.includes('X')
              ? singleSize.split('X')
              : singleSize.split('_');

            width = Number(dimensions[0]);
            length = Number(dimensions[1]);

            if (isNaN(width) || isNaN(length)) {
              console.warn('Некорректные размеры:', singleSize);
              return sizeSum;
            }

            const area = width * length;
            console.log(
              `Вычисленная площадь для размера ${singleSize}: ${area}`
            );
            return sizeSum + area;
          }, itemSum);
        } else {
          width = Number(size.width);
          length = Number(size.length);

          if (isNaN(width) || isNaN(length)) {
            console.warn('Некорректные размеры:', size);
            return itemSum;
          }

          const area = width * length;
          console.log(`Вычисленная площадь для размера: ${area}`);
          return itemSum + area;
        }
      }, 0);

      return sum + itemTotalArea;
    }, 0);

    console.log('Вычисленная общая площадь:', totalArea);
    return totalArea;
  },
};
