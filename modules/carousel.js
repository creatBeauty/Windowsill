export class Carousel {
  constructor() {
    this.currentIndex = 0; //присваиваем свойство со значением 0 обьекту,к которому относиться контекст this
    this.items = document.querySelectorAll('.carousel-item'); // this.items = document.querySelectorAll('.carousel-item');
    this.totalItems = this.items.length;
    this.init();
  }

  init() {
    this.showSlide(this.currentIndex);
    this.setupEventListeners();
  }

  showSlide(index) {
    this.items.forEach((item) => {
      item.style.display = 'none';
    });
    this.items[index].style.display = 'block';
  }

  setupEventListeners() {
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    nextButton.addEventListener('click', () => {
      this.currentIndex = (this.currentIndex + 1) % this.totalItems;
      this.showSlide(this.currentIndex);
    });

    prevButton.addEventListener('click', () => {
      this.currentIndex =
        (this.currentIndex - 1 + this.totalItems) % this.totalItems;
      this.showSlide(this.currentIndex);
    });
  }
}
