export class EmailService {
  constructor() {
    this.init();
  }

  init() {
    emailjs.init('dYXYvYitA1K0SgEs8');
  }

  async sendEmail(templateParams) {
    try {
      const response = await emailjs.send(
        'service_6i541ib',
        'template_0xqn1vn',
        templateParams
      );
      console.log('SUCCESS!', response.status, response.text);
      return response;
    } catch (error) {
      console.error('Email service error:', error);
      throw error;
    }
  }
}
