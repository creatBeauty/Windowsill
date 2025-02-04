function convertDatForCutting(items) {
  // Функция для преобразования одного описания
  const convertDescription = (description, id) => {
    const matches = description.match(/(\d+)x(\d+)x(\d+)/);

    if (!matches) {
      console.error(`Не найдено 3 размера в описании: "${description}"`); // Сообщение об ошибке
      return []; // Если не найдено 3 размера, возвращаем пустой массив
    } // Если не найдено 3 размера, возвращаем пустой массив

    const sizes = matches.slice(1, 4).map(Number); // Преобразуем найденные размеры в числа

    // Проверяем корректные размеры
    if (sizes.length < 3 || sizes.some(isNaN)) return []; // Если нет 3 размеров или есть NaN, возвращаем пустой массив

    const countMatch = description.match(/(\d+)\s*шт/);
    const quantity = countMatch ? parseInt(countMatch[1]) : 0; // Извлекаем количество

    const output = [];

    for (let i = 0; i < quantity; i++) {
      output.push(`${id} ${sizes[0]}X${sizes[1]}`); // Добавляем id к размеру 1200X300
      output.push(`${id} ${sizes[0]}X${sizes[2]}`); // Добавляем id к размеру 1200X30
      output.push(`${id} ${sizes[1]}X${sizes[2]}`); // Добавляем id к размеру 300X30
      output.push(`${id} ${sizes[1]}X${sizes[2]}`); // Еще один размер 300X30
    }

    return output; // Возвращаем массив с размерами
  };
  // Проверяем, что items является массивом
  if (!Array.isArray(items)) return []; // Если нет, возвращаем пустой
  // Перебираем входящие объекты и создаем новый массив объектов с результатами
  return items.map((item) => {
    const sizes = convertDescription(item.description, item.id); // Преобразуем описание, передавая id
    return {
      id: item.id, // сохраняем id
      sizes: sizes, // возвращаем размеры
    };
  });
}
export { convertDatForCutting }; // Возвращает обьект-массив обьектов
// Пример использования
// const inputDescriptions = [
//   { id: 1, description: '1. Подоконник 1200x300x30-2 шт. ' },
//   { id: 2, description: '2. Подоконник 2000x300x30-3 шт. ' },
// ];

// const results = convertWindowSillDescriptions(inputDescriptions);
// console.log(results);
// console.log(typeof results);
