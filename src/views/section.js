function viewSection() {
  const elements = {
    header: document.querySelector('header'),
    main: document.querySelector('main'),
    aside: document.querySelector('aside'),
    section: document.querySelector('section'),
    figure: document.querySelector('figure'),
    article: document.querySelector('article'),
    footer: document.querySelector('footer'),
  };

  // Сначала скрываем все
  Object.entries(elements).forEach(([name, element]) => {
    if (!element) {
      console.warn(`Element ${name} not found in DOM`);
      return;
    }
    if (name !== 'section') {
      element.classList.remove('visible-flex', 'visible-grid');
      element.classList.add('hidden');
    }
  });

  // Показываем figure
  if (elements.section) {
    elements.section.classList.remove('hidden');
    elements.section.classList.add('visible-flex');
  }
}

export { viewSection };
