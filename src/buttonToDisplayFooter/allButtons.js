const BtnHeader = document.getElementById('BtnHeader');
const BtnMain = document.getElementById('BtnMain');
const BtnMenu = document.getElementById('BtnMenu');
const BtnAside = document.getElementById('BtnAside');
const BtnSection = document.getElementById('BtnSection');
const BtnFigure = document.getElementById('BtnFigure');
const BtnFooter = document.getElementById('BtnFooter');

const header = document.getElementById('header');
const main = document.getElementById('main');
const menu = document.getElementById('menu');
const aside = document.getElementById('aside');
const section = document.getElementById('section');
const figure = document.getElementById('figure');
const footer = document.getElementById('footer');

function hideAllPages() {
  const pages = [header, main, menu, aside, section, figure, footer];
  pages.forEach((page) => {
    if (page) {
      page.classList.add('hidden');
      page.classList.remove('visible-flex', 'visible-grid');
    }
  });
}

function setupButton(button, page, displayClass = 'visible-flex') {
  if (button && page) {
    button.addEventListener('click', () => {
      hideAllPages();
      page.classList.remove('hidden');
      page.classList.add(displayClass);
    });
  }
}

export function initializeButtons() {
  setupButton(BtnHeader, header);
  setupButton(BtnMain, main);
  setupButton(BtnMenu, menu, 'visible-grid');
  setupButton(BtnAside, aside);
  setupButton(BtnSection, section);
  setupButton(BtnFigure, figure);
  setupButton(BtnFooter, footer);
}

initializeButtons();
