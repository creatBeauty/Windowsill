import { getColorStoneButtons } from './modules/getColorStoneButtons.js';
import { confirmColorBorder } from './modules/confirmColorBorder.js';
import { confirmColorStoneButton } from './modules/confirmColorStoneButton.js';

document.addEventListener('DOMContentLoaded', () => {
  getColorStoneButtons();
  confirmColorBorder();
  confirmColorStoneButton();
});
