import { Map } from '../logic/location.js';

function openMap() {
  const mapButton = document.getElementById('openMap');

  mapButton.addEventListener('click', Map);
}

export { openMap };
