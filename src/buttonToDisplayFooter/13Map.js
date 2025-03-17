import { Map } from '../logic/13Map';

function mapButton() {
  const openMap = document.getElementById('openMap');

  openMap.addEventListener('click', () => {
    Map();
  });
}
export { mapButton };
