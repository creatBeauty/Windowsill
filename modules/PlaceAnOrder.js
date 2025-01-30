function start() {
  const ButtonStart = document.querySelector('.start');
  const footer = document.querySelector('.footer');

  ButtonStart.addEventListener('click', function () {
    console.log('Вы нажимаете фуутер');
    footer.style.display = 'flex';
  });
}

export { start };
