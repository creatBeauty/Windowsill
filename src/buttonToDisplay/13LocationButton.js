const mapButton = document.getElementById('openMap');

export function _13openMap() {
  if (mapButton) {
    mapButton.addEventListener('click', () => {
      // Координаты местоположения (Подольск, ул.Комсомольская 1)
      const latitude = 55.427879;
      const longitude = 37.544892;

      // Определяем, какое приложение карт использовать в зависимости от устройства
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // Для iOS устройств используем Apple Maps
        window.open(
          `maps://maps.apple.com/?q=${latitude},${longitude}`,
          '_blank'
        );
      } else {
        // Для остальных устройств используем Google Maps
        window.open(
          `https://www.google.com/maps?q=${latitude},${longitude}`,
          '_blank'
        );
      }
    });
  }
}
