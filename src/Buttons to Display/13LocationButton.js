import { Map } from '../logic/13Map.js';

function _13openMap() {
  const mapButton = document.getElementById('openMap');

  mapButton.addEventListener('click', Map);
}

export { _13openMap };
