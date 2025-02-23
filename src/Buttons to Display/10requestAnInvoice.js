function _10requestAnInvoice() {
  const button = document.getElementById('request');
  button.addEventListener('click', (event) => {
    event.preventDefault();
    alert('Счет для оплаты придет на почту');
  });
}
export { _10requestAnInvoice };
