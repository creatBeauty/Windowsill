function request() {
  const button = document.getElementById('request');
  button.addEventListener('click', function () {
    alert('Запрос счета успешно отправлен!!!');
  });
}
export { request };
