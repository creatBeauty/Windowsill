const requestBtn = document.getElementById('request');
const contactForm = document.getElementById('contact-form');
const costOfTheOrder = document.getElementById('costOfTheOrder');

export function _10requestAnInvoice() {
  if (requestBtn) {
    requestBtn.addEventListener('click', () => {
      // Validate form fields
      const phoneNumber = contactForm.contact_number.value;
      const name = contactForm.user_name.value;
      const email = contactForm.user_email.value;
      const message = contactForm.message.value;

      if (!phoneNumber || !name || !email) {
        alert('Пожалуйста, заполните все поля формы');
        return;
      }

      // Check if cost is calculated
      if (!costOfTheOrder.textContent) {
        alert('Пожалуйста, рассчитайте стоимость заказа');
        return;
      }

      // Prepare email parameters
      const templateParams = {
        contact_number: phoneNumber,
        user_name: name,
        user_email: email,
        message: message,
        total_cost: costOfTheOrder.textContent,
      };

      // Send email using emailjs
      emailjs
        .send('service_4hs8ixk', 'template_qqxvwxp', templateParams)
        .then(() => {
          alert('Запрос отправлен успешно! Проверьте вашу почту.');
          contactForm.reset();
        })
        .catch((error) => {
          console.error('Ошибка отправки:', error);
          alert(
            'Произошла ошибка при отправке запроса. Пожалуйста, попробуйте позже.'
          );
        });
    });
  }
}
