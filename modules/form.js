export class Form {
  constructor(emailService) {
    this.carousel = document.querySelector('.carousel');
    this.formContainer = document.querySelector('.form-container');
    this.form = document.querySelector('.measurement-form');
    this.emailService = emailService;
    this.init();
  }

  init() {
    emailjs.init('dYXYvYitA1K0SgEs8');
    this.setupEventListeners();
  }

  setupEventListeners() {
    const showFormButton = document.getElementById('showForm');
    const backButton = document.getElementById('backToCarousel');

    showFormButton.addEventListener('click', () => this.showForm());
    backButton.addEventListener('click', () => this.hideForm());
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  showForm() {
    this.carousel.style.display = 'none';
    this.formContainer.style.display = 'block';
  }

  hideForm() {
    this.formContainer.style.display = 'none';
    this.carousel.style.display = 'block';
  }

  async handleSubmit(e) {
    e.preventDefault();
    const submitBtn = this.form.querySelector('.submit-btn');

    const templateParams = {
      from_name: this.form.querySelector('#name').value,
      phone_number: this.form.querySelector('#phone').value,
      address: this.form.querySelector('#address').value,
      wishes: this.form.querySelector('.wont').value,
      message: `Новая заявка на замер от ${
        this.form.querySelector('#name').value
      }`,
    };

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправка...';

      const response = await emailjs.send(
        'service_6i541ib',
        'template_ryqxxtg',
        templateParams
      );

      if (response.status === 200) {
        alert(
          'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
        );
        this.form.reset();
        this.hideForm();
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert(
        'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.'
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить';
    }
  }
}
