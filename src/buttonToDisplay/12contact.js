const contactBtn = document.getElementById('12contact');
const headerContact = document.querySelector('.headerContact');
const messengers = document.querySelector('.messengers');

export function _12contact() {
  if (contactBtn && headerContact) {
    // Set up WhatsApp link
    const whatsapp = headerContact.querySelector('.whatsapp');
    if (whatsapp) {
      whatsapp.addEventListener('click', () => {
        window.open('https://wa.me/79647735543', '_blank');
      });
    }

    // Set up Telegram link
    const telegram = headerContact.querySelector('.telegram');
    if (telegram) {
      telegram.addEventListener('click', () => {
        window.open('https://t.me/+79647735543', '_blank');
      });
    }

    // Toggle contacts visibility
    contactBtn.addEventListener('click', () => {
      headerContact.classList.toggle('visible');

      // Add animation class
      if (headerContact.classList.contains('visible')) {
        headerContact.style.animation = 'slideDown 0.3s ease-out forwards';
      } else {
        headerContact.style.animation = 'slideUp 0.3s ease-out forwards';
      }
    });

    // Close contacts when clicking outside
    document.addEventListener('click', (event) => {
      if (
        !headerContact.contains(event.target) &&
        !contactBtn.contains(event.target) &&
        headerContact.classList.contains('visible')
      ) {
        headerContact.classList.remove('visible');
        headerContact.style.animation = 'slideUp 0.3s ease-out forwards';
      }
    });
  }
}
