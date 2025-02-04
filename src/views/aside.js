function viewAside() {
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
    if (!['aside', 'footer'].includes(name)) {
      element.classList.remove('visible-flex', 'visible-grid');
      element.classList.add('hidden');
    }
  });

  // Показываем aside
  if (elements.aside) {
    elements.aside.classList.remove('hidden');
    elements.aside.classList.add('visible-flex');
  }
  if (elements.footer) {
    elements.footer.classList.remove('hidden');
    elements.footer.classList.add('visible-flex');
  }
}

export { viewAside };
