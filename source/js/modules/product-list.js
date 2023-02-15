import {formatMoneyWithDecimal, formatStringToNumber} from './../utils/formatter.js';
import {products} from './../utils/mock';
import {createProductCardString, createEmptyCartMessageString} from './product-list-content';
import {calculatePromocodeDiscount} from './promocode';

const SHIPPING = 200;
let productsArr = products;
const productList = document.querySelector('.product-list');
const formButton = document.querySelector('.checkout__button[type="submit"]');
const productListTitle = document.querySelector('.order__subtitle');


const renderProductsInCart = () => {
  const productCardList = productsArr.map((item) => createProductCardString(item)).join('');

  productList.innerHTML = '';
  productList.insertAdjacentHTML('beforeend', productCardList);
  calculateItemsinTitle();
  calculatePriceInSummary();
};

const findProductInListByCode = (productItem) => {
  const itemCode = productItem.querySelector('.product-card__code-input');
  const itemCodeValue = itemCode.value;

  return productsArr.find((item) => item.code === itemCodeValue);
};

const removeProductFromListByCode = (productItem) => {
  const itemCode = productItem.querySelector('.product-card__code');
  const itemCodeValue = itemCode.textContent;

  return productsArr.filter((item) => item.code !== itemCodeValue);
};

const deleteProductItem = (evt) => {
  const deleteButton = evt.target.closest('.delete-button');

  if (!deleteButton) {
    return;
  }

  const productItem = evt.target.closest('.product-card');

  if (deleteButton.classList.contains('delete-button--message')) {
    productsArr = removeProductFromListByCode(productItem);
  } else {
    const deletedItem = findProductInListByCode(productItem);
    deletedItem.deleted = true;
  }

  const productCardListWithDeletedField = productsArr.filter((item) => !item.deleted);

  if (!productsArr.length) {
    createMessageinCart(createEmptyCartMessageString);
  } else if (!productCardListWithDeletedField.length) {
    formButton.setAttribute('disabled', 'disabled');
  }

  renderProductsInCart();
};

const createMessageinCart = (cb) => {
  productList.insertAdjacentHTML('afterend', cb());
  productListTitle.classList.add('order__subtitle--empty');
  formButton.setAttribute('disabled', 'disabled');
};

const restoreProductItem = (evt) => {
  const restoreButton = evt.target.closest('.card-message__link');

  if (!restoreButton) {
    return;
  }

  const productItem = evt.target.closest('.product-card');
  const deletedItem = findProductInListByCode(productItem);
  deletedItem.deleted = false;

  if (formButton.hasAttribute('disabled')) {
    formButton.removeAttribute('disabled');
  }

  renderProductsInCart();
};

const calculateQuantity = (evt) => {
  const quantityButton = evt.target.closest('.product-quantity__button');

  if (!quantityButton) {
    return;
  }

  const productItem = evt.target.closest('.product-card');
  const minusButton = productItem.querySelector('.product-quantity__button--minus');
  const item = findProductInListByCode(productItem);
  const quantityValue = item.count;

  if (quantityButton.classList.contains('product-quantity__button--minus') && quantityValue > 1) {

    item.count -= 1;

    if (quantityValue === 1) {
      quantityButton.setAttribute('disabled', 'disabled');
    }

  } else if (quantityButton.classList.contains('product-quantity__button--plus')) {

    item.count = item.count + 1;

    if (quantityValue >= 2) {
      minusButton.removeAttribute('disabled');
    }
  }

  renderProductsInCart();
};

const calculateItemsinTitle = () => {
  const priceItemInTitle = document.querySelector('.order__subtitle-price');
  const textItemInTitle = document.querySelector('.order__subtitle-text');

  priceItemInTitle.textContent = calculatePriceInTitle();
  textItemInTitle.textContent = getCorrectWordForm();
};

const calculatePriceInTitle = () => {
  const summ = productsArr.reduce((acc, next) => {
    let value = 0;
    if (!next.deleted) {
      value = (next.price) * next.count;
    }
    return acc + value;
  }, 0);

  return formatMoneyWithDecimal(summ);
};

const getCorrectWordForm = () => {
  const value = calculateQuantityInTitle();
  // eslint-disable-next-line no-undef
  const children = getDeclension({count: value, one: 'товар', few: 'товара', many: 'товаров'});
  return children;
};

const calculateQuantityInTitle = () => {
  const quantity = productsArr.reduce((acc, next) => {
    let value = 0;
    if (!next.deleted) {
      value = next.count;
    }
    return acc + value;
  }, 0);

  return quantity;
};

const calculateDiscount = () => {
  const discount = productsArr.reduce((acc, next) => {
    let value = 0;
    if (!next.deleted) {
      value = next.discount * next.count;
    }
    return acc + value;
  }, 0);

  return formatMoneyWithDecimal(discount);
};


const calculatePriceInSummary = () => {
  const startPrice = document.querySelector('.price-list__price--start');
  const discount = document.querySelector('.price-list__price--product-discount');
  const totalDiscount = document.querySelector('.price-list__price--total-discount');
  const totalSumm = document.querySelector('.price-list__price--total-summ');

  const calculateTotalDiscount = (formatStringToNumber(calculateDiscount()) + formatStringToNumber(calculatePromocodeDiscount()));
  const calculateTotalSumm = (formatStringToNumber(calculatePriceInTitle()) - formatStringToNumber(calculateTotalDiscount) + formatStringToNumber(SHIPPING));


  startPrice.textContent = calculatePriceInTitle();
  discount.textContent = calculateDiscount();
  totalDiscount.textContent = formatMoneyWithDecimal(calculateTotalDiscount);

  if (calculateTotalSumm <= 0) {
    totalSumm.textContent = 0;
  } else {
    totalSumm.textContent = formatMoneyWithDecimal(calculateTotalSumm);
  }
};

const generateOrderPriseData = () => {
  const calculateTotalDiscount = (formatStringToNumber(calculateDiscount()) + formatStringToNumber(calculatePromocodeDiscount()));
  const calculateTotalSumm = (formatStringToNumber(calculatePriceInTitle()) - formatStringToNumber(calculateTotalDiscount) + formatStringToNumber(SHIPPING));

  return {
    discount: calculateTotalDiscount,
    shipping: 200,
    totalPrice: formatMoneyWithDecimal(calculateTotalSumm),
  };
};

const chooseSize = (evt) => {
  chooseProductFeatures(evt, 'size-list__input', 'sizeList');
};

const chooseColor = (evt) => {
  chooseProductFeatures(evt, 'color-list__input', 'colorList');
};

const chooseProductFeatures = (evt, featureClass, arrFieldKey) => {
  const input = evt.target.closest(`.${featureClass}`);

  if (!input) {
    return;
  }

  const inputValue = input.value.toString();
  const productItem = evt.target.closest('.product-card');
  const currentCard = findProductInListByCode(productItem);

  removeCheckFromElementInArr(currentCard, `${arrFieldKey}`);
  chooseNewElementInArr(currentCard, `${arrFieldKey}`, inputValue);
};

const removeCheckFromElementInArr = (currentCard, arrFieldKey) => {
  const previousInput = currentCard[arrFieldKey].find((item) => item.checked === true);
  previousInput.checked = false;
};

const chooseNewElementInArr = (currentCard, arrFieldKey, inputValue) => {
  const currentInput = currentCard[arrFieldKey].find((item) => item.value === inputValue);
  currentInput.checked = true;
};

const initProdactListHandler = () => {

  if (productsArr && productsArr.length) {
    productList.addEventListener('click', (evt) => {
      deleteProductItem(evt);
      restoreProductItem(evt);
      calculateQuantity(evt);
      chooseSize(evt);
      chooseColor(evt);
    });
  }
};

export {initProdactListHandler, renderProductsInCart, calculatePriceInSummary, productsArr, generateOrderPriseData, createMessageinCart};
