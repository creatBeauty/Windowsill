//Абстракция, для отображения страницы

export function logicViewsPage(pageId, displayType = 'visible-flex') {
  const pages = document.querySelectorAll('.page');
  pages.forEach((page) => {
    if (page.id === pageId) {
      page.classList.remove('hidden');
      page.classList.add(displayType); // Используем переданный тип отображения
    } else {
      page.classList.remove('visible-flex', 'visible-grid');
      page.classList.add('hidden');
    }
  });
}
