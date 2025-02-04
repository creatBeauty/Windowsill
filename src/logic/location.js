function Map() {
  // Координаты местоположения (широта, долгота)
  const lat = 55.399234; // Пример: Москва
  const lon = 37.44135; // Пример: Москва

  // Создание URL для Яндекс.Карт
  const yandexMapsUrl = `https://yandex.ru/maps/?ll=${lon},${lat}&z=12&pt=${lon},${lat},mark1`;

  // Открытие карты в новой вкладке
  window.open(yandexMapsUrl, '_blank');
}

export { Map };
