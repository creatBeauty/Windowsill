import { Carousel } from './modules/carousel.js';
import { Form } from './modules/form.js';
import { EmailService } from './modules/emailService.js';

document.addEventListener('DOMContentLoaded', () => {
  const emailService = new EmailService();
  const carousel = new Carousel();
  const form = new Form(emailService);
});
