import { viewArticle } from '../views/article.js';

function foto() {
  const button = document.getElementById('ourWork');
  button.addEventListener('click', () => viewArticle());
}

export { foto };
