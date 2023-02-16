import {iosVhFix} from './utils/ios-vh-fix';
import {initNav} from './modules/menu';
import {initProdactListHandler, renderProductsInCart} from './modules/product-list';
import {calculatePromocodeDiscount, applyPromocode} from './modules/promocode';
import './modules/up-button';
import './modules/order-form';
import './modules/subscribtion-form-validation.js';
import './modules/map';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------
  initNav();
  initProdactListHandler();
  renderProductsInCart();
  applyPromocode();
  calculatePromocodeDiscount();

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
  });
});
