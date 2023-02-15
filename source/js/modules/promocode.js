import {promocodes} from './../utils/mock';
import {formatMoneyWithDecimal} from './../utils/formatter.js';
import {calculatePriceInSummary} from './product-list';

const promocodeItem = document.querySelector('.promocode__input');
const promocodeButton = document.querySelector('.promocode__button');
const promocodeMessage = document.querySelector('.promocode__message');
const promocodeMessageCode = document.querySelector('.promocode__message-code');
const promocodeMessageText = document.querySelector('.promocode__message-text');
const promoDiscount = document.querySelector('.price-list__price--promo');

let promocodesArr = promocodes;

const checkPromocode = () => {
  const promocodeValue = promocodeItem.value.toString();

  if (!promocodeValue.length) {
    return;
  }

  if (promocodesArr.find((item) => item.name === promocodeValue)) {
    const promocode = promocodesArr.find((item) => item.name === promocodeValue);
    promocode.applied = true;

    promocodeItem.value = '';
    promocodeMessage.classList.add('fild-with-button__message--valid');
    promocodeMessageText.textContent = ' - купон применен';
  } else {
    promocodeItem.value = '';
    promocodeMessage.classList.add('fild-with-button__message--invalid');
    promocodeMessageText.textContent = ' - купон не найден';
  }

  promocodeMessageCode.textContent = promocodeValue;
  calculatePromocodeDiscount();
  promoDiscount.textContent = calculatePromocodeDiscount();
  calculatePriceInSummary();
  setTimeout(removePromocodeMessage, 3000);
};

const removePromocodeMessage = () => {
  if (promocodeMessage.classList.contains('fild-with-button__message--valid')) {
    promocodeMessage.classList.remove('fild-with-button__message--valid');
  } else if (promocodeMessage.classList.contains('fild-with-button__message--invalid')) {
    promocodeMessage.classList.remove('fild-with-button__message--invalid');
  }
};

const calculatePromocodeDiscount = () => {
  const summ = promocodesArr.reduce((acc, next) => {
    let value = 0;
    if (next.applied) {
      value = (next.value);
    }
    return acc + value;
  }, 0);
  return formatMoneyWithDecimal(summ);
};

const applyPromocode = () => {
  promocodeButton.addEventListener('click', checkPromocode);
};

export {calculatePromocodeDiscount, applyPromocode, promocodesArr};
