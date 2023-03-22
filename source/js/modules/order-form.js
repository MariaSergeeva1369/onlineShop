import {generateProductArrForOrder, generatePromocodeArrForOrder} from './generateOrderData';
import {generateOrderPriseData, productsArr, renderProductsInCart, createMessageinCart} from './product-list';
import {createOrderFormedMessageString} from './product-list-content';
import {scrollToTop} from './up-button';

const form = document.querySelector('.order__form');
const phoneInput = form.querySelector('[name="phone"]');
const addressInput = form.querySelector('[name="address"]');
const coordsInput = form.querySelector('[name="coordinates"]');


const MAX_PHONE_LENGTH = 18;
const MIN_ADDRESS_LENGTH = 10;

// eslint-disable-next-line no-undef
const pristine = new Pristine(form, {
  classTo: 'contacts-input',
  errorClass: 'contacts-input--invalid',
  successClass: 'contacts-input--valid',
  errorTextParent: 'contacts-input',
  errorTextTag: 'span',
  errorTextClass: 'contacts-input__message',
});

// Форматирование поля номера телефона
const getInputNumbersValue = (input) => {
  return input.value.replace(/\D/g, '');
};

const onPhoneInput = (evt) => {
  const input = evt.target;
  const inputNumbersValue = getInputNumbersValue(input);
  const firstSimbols = '+7';
  const selectionStart = input.selectionStart;

  if (input.value.length !== selectionStart) {
    if (evt.data && /\D/g.test(evt.data)) {
      input.value = inputNumbersValue;
    }
    return;
  }

  let formattedInputValue = firstSimbols + ' ';
  if (inputNumbersValue.length > 1) {
    formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
  }
  if (inputNumbersValue.length >= 5) {
    formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
  }
  if (inputNumbersValue.length >= 8) {
    formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
  }
  if (inputNumbersValue.length >= 10) {
    formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
  }

  input.value = formattedInputValue;
};

const onPhoneKeyDown = (evt) => {
  const input = evt.target;
  if (evt.key === 'Backspace' && getInputNumbersValue(input).length === 1) {
    input.value = '';
  }
};

const formatPhoneInput = () => {
  if (phoneInput) {
    phoneInput.addEventListener('input', onPhoneInput);
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
  }
};

formatPhoneInput();

// Валидация формы

const validatePhoneInput = (value) => value.length >= MAX_PHONE_LENGTH;

if (pristine) {
  pristine.addValidator(phoneInput, validatePhoneInput, 'Введите номер полностью');
}


const validateAddressInput = (value) => value.length >= MIN_ADDRESS_LENGTH && value.toLowerCase().match(/(?=.*[1-9])/g) && coordsInput.value;
const getErrorAddressMessage = () => {
  if (!coordsInput.value) {
    return 'Введите корректный адрес';
  }

  if (addressInput.value.length < MIN_ADDRESS_LENGTH) {
    return 'Введите адрес полностью';
  }

  if (!addressInput.value.toLowerCase().match(/(?=.*[1-9])/g)) {
    return 'Введите номер дома';
  }

  return 'Введите корректный адрес';
};

pristine.addValidator(addressInput, validateAddressInput, getErrorAddressMessage);


form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const valid = pristine.validate();
  const products = generateProductArrForOrder();
  const promocodes = generatePromocodeArrForOrder();
  const price = generateOrderPriseData();

  if (valid && products.length) {
    const formData = new FormData(evt.target);
    formData.append('productList', JSON.stringify(products));
    formData.append('promocodeList', JSON.stringify(promocodes));
    formData.append('priceList', JSON.stringify(price));

    productsArr.length = 0;

    renderProductsInCart();
    createMessageinCart(createOrderFormedMessageString);
    evt.target.reset();
    resetClientDataInInput();

    const formValue = Object.fromEntries(formData);
    // eslint-disable-next-line no-console
    console.log('Информация о заказе:', formValue);
    scrollToTop();
  } else {
    form.scrollIntoView();
  }
});


const resetClientDataInInput = () => {
  const inputs = document.querySelectorAll('.contacts-input__input');
  inputs.forEach((element) => {
    element.value = '';
  });
};
