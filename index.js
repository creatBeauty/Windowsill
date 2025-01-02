document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded'); // Проверка загрузки

  let currentIndex = 0;
  const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;

  console.log('Total items:', totalItems); // Проверка количества слайдов

  const showSlide = (index) => {
    console.log('Showing slide:', index); // Проверка переключения
    items.forEach((item) => {
      item.style.display = 'none'; // Используем стили напрямую
    });
    items[index].style.display = 'block';
  };

  // Обработчики для кнопок
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');

  nextButton.addEventListener('click', () => {
    console.log('Next clicked'); // Проверка клика
    currentIndex = (currentIndex + 1) % totalItems;
    showSlide(currentIndex);
  });

  prevButton.addEventListener('click', () => {
    console.log('Prev clicked'); // Проверка клика
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showSlide(currentIndex);
  });

  // Показываем первый слайд при загрузке
  showSlide(currentIndex);
});

document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel');
  const formContainer = document.querySelector('.form-container');
  const showFormButton = document.getElementById('showForm');
  const backButton = document.getElementById('backToCarousel');
  const form = document.querySelector('.measurement-form');

  // Показать форму
  showFormButton.addEventListener('click', function () {
    carousel.style.display = 'none';
    formContainer.style.display = 'block';
  });

  // Вернуться к карусели
  backButton.addEventListener('click', function () {
    formContainer.style.display = 'none';
    carousel.style.display = 'block';
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Инициализация EmailJS
  emailjs.init('dYXYvYitA1K0SgEs8');

  const form = document.querySelector('.measurement-form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('.submit-btn');

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправка...';

      const templateParams = {
        from_name: form.querySelector('#name').value,
        phone_number: form.querySelector('#phone').value,
        address: form.querySelector('#address').value,
        message: `Заявка на замер от ${form.querySelector('#name').value}`,
      };

      // Используйте ваши актуальные ID сервиса и шаблона
      const response = await emailjs.send(
        'service_6i541ib', // Service ID
        'template_ryqxxtg', // Template ID
        templateParams
      );

      console.log('SUCCESS!', response.status, response.text);
      alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');

      // Очищаем форму и возвращаемся к карусели
      form.reset();
      document.querySelector('.form-container').style.display = 'none';
      document.querySelector('.carousel').style.display = 'block';
    } catch (error) {
      console.error('FAILED...', error);
      alert(`Ошибка при отправке: ${error.message}`);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить';
    }
  });
});
