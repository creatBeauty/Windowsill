function setupTextSlider() {
  const slides = document.querySelectorAll('.textSlider');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Initial display
  showSlide(0);

  // Auto-rotate every 6 seconds
  setInterval(nextSlide, 2000);

  // Optional: Add click handlers for the buttons
  const prevButton = document.querySelector(
    '.buttonForSlider button:first-child'
  );
  const nextButton = document.querySelector(
    '.buttonForSlider button:last-child'
  );

  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });
}

export { setupTextSlider };
