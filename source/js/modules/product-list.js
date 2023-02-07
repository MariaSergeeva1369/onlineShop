import {formatMoneyWithDecimal, formatStringToNumber} from './../utils/formatter.js';
import {products} from './../utils/mock';
import {createProductCardString} from './product-list-content';
import {calculatePromocodeDiscount} from './promocode';

const SHIPPING = 200;
let productsArr = products;
const productList = document.querySelector('.product-list');

const renderProductsInCart = () => {
  if (productsArr && productsArr.length) {
    const productCard = productsArr.map((item) => createProductCardString(item)).join('');

    productList.innerHTML = '';
    productList.insertAdjacentHTML('beforeend', productCard);
    calculateItemsinTitle();
    calculatePriceInSummary();
  }
}

const findElementInArrByCode = (productItem) => {
  const itemCode = productItem.querySelector('.product-card__code');
  const itemCodeValue = itemCode.textContent;

  return productsArr.find((item) => item.code === itemCodeValue);
}

const removeElementFromArr = (productItem) => {
  const itemCode = productItem.querySelector('.product-card__code');
  const itemCodeValue = itemCode.textContent;

  return productsArr.filter((item) => item.code !== itemCodeValue);
}

const deleteProductItem = (evt) => {
  const deleteButton = evt.target.closest('.delete-button');

  if (!deleteButton) {
    return
  }

  const productItem = evt.target.closest('li');
  
  if (deleteButton.classList.contains('delete-button--message')) {
    productsArr = removeElementFromArr(productItem);
  } else {
    const deletedItem = findElementInArrByCode(productItem);
    deletedItem.deleted = true;
  }
  
  renderProductsInCart(); 
}

const restoreProductItem = (evt) => {
  const restoreButton = evt.target.closest('.card-message__link');

  if (!restoreButton) {
    return
  }

  const productItem = evt.target.closest('li');

  const deletedItem = findElementInArrByCode(productItem);
  deletedItem.deleted = false;
  renderProductsInCart(); 
}

const calculateQuantity = (evt) => {
  const quantityButton = evt.target.closest('.product-quantity__button');

  if (!quantityButton) {
    return
  }

  const productItem = evt.target.closest('li');
  const minusButton = productItem.querySelector('.product-quantity__button--minus');
  const item = findElementInArrByCode(productItem);
  const quantityValue = item.count;

  if (quantityButton.classList.contains('product-quantity__button--minus') && quantityValue > 1 ) {

    item.count -= 1;

    if (quantityValue === 1) {
      quantityButton.setAttribute("disabled", "disabled");
    }

  } else if (quantityButton.classList.contains('product-quantity__button--plus')) {

    item.count = item.count + 1;

    if (quantityValue >= 2) {
      minusButton.removeAttribute("disabled");
    }
  }

  renderProductsInCart();
}

const calculateItemsinTitle = () => {
  const priceItemInTitle = document.querySelector('.order__subtitle-price');
  const textItemInTitle = document.querySelector('.order__subtitle-text');
  
  priceItemInTitle.textContent = calculatePriceInTitle();
  textItemInTitle.textContent = getCorrectWordForm();
}

const calculatePriceInTitle = () => {
  const summ = productsArr.reduce((acc, next) => {
    let value = 0
    if (!next.deleted) {
      value = (next.price) * next.count
    }
    return acc + value;
  }, 0)

  return formatMoneyWithDecimal(summ);
}

const getCorrectWordForm = () => {
  const value = calculateQuantityInTitle();
  const children = getDeclension({ count: value, one: 'товар', few: 'товара', many: 'товаров' });
  return children
}

const calculateQuantityInTitle = () => {
  const quantity = productsArr.reduce((acc, next) => {
    let value = 0
    if (!next.deleted) {
      value = next.count
    }
    return acc + value;
  }, 0)

  return quantity;
}

const calculateDiscount = () => {
  const discount = productsArr.reduce((acc, next) => {
    let value = 0
    if (!next.deleted) {
      value = next.discount * next.count
    }
    return acc + value;
  }, 0)

  return formatMoneyWithDecimal(discount);
}

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
  totalSumm.textContent = formatMoneyWithDecimal(calculateTotalSumm);
}

// const chooseSize = () => {
//   const siseList = evt.target.closest('.size-list');

//   if (!siseList) {
//     return
//   }

//   const sizeInputs = siseList.querySelectorAll('.size-list__input');
//   for ( let sizeInput of sizeInputs) {
//     sizeInput.value 

    
//   }
// }

const initProdactListHandler = () => {
  if (productsArr && productsArr.length) { 
    productList.addEventListener('click', deleteProductItem);
    productList.addEventListener('click', restoreProductItem);
    productList.addEventListener('click', calculateQuantity);
    // productList.addEventListener('click', chooseSize)
  }
} 

export {initProdactListHandler, renderProductsInCart, calculatePriceInSummary}
