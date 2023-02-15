const subscribtionForm = document.querySelector('.subscribtion-form');
const subscribtionField = document.querySelector('.subscribtion-form__field');
const subscribtionTitle = document.querySelector('.subscribtion__title');

// eslint-disable-next-line no-undef
const pristine = new Pristine(subscribtionForm, {
  classTo: 'fild-with-button',
  errorClass: 'fild-with-button--invalid',
  successClass: 'fild-with-button--valid',
  errorTextParent: 'fild-with-button',
  errorTextTag: 'span',
  errorTextClass: 'fild-with-button__error-message',
});


subscribtionForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const valid = pristine.validate();
  if (valid) {
    subscribtionField.classList.add('subscribtion-form__field--hidden');
    subscribtionTitle.textContent = 'Спасибо, что подписались. Ваша скидка уже на почте!';
  }
});
