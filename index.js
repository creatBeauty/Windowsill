import { viewHeader } from './src/views/header.js';
import { ChooseStone } from './src/components/1ChooseStoneButton.js';
import { confirmStone } from './src/components/2ConfirmStoneSelectionButton.js';
import { goToBasket } from './src/components/4gotoCartButton.js';
import { BorderColorButton } from './src/components/12BorderColorButton.js';
import { GoingHome } from './src/components/7gotoHeaderPageButton.js';
import { addtoBasket } from './src/components/3addCartButton.js';
import { openMap } from './src/components/8LocationButton.js';
import { getCost } from './src/components/5calculateСost.js';
import { getCutting } from './src/components/10cuttingButton.js';
import { getDrawing } from './src/components/9drawingButton.js';
import { foto } from './src/components/11fotoButton.js';
import { request } from './src/components/6sendRequestButton.js';

document.addEventListener('DOMContentLoaded', () => {
  viewHeader();
  ChooseStone();
  confirmStone();
  goToBasket();
  BorderColorButton();
  GoingHome();
  addtoBasket();
  openMap();
  getCost();
  getCutting();
  getDrawing();
  foto();
  request();
});
