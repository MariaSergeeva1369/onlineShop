import {formatMoneyWithDecimal} from './../utils/formatter.js';

const createProductCardString = ({image, name, code, season, sizeList, colorList, price, discount, count, deleted}) => `
  <li class="product-list__item product-card ${deleted ? 'product-card--deleted' : ''}">
    ${deleted ? createDeleteMessageString({name}) + createRpodactDescriptionString({image, name, code, season, sizeList, colorList, price, discount, count})
    :
    createRpodactDescriptionString({image, name, code, season, sizeList, colorList, price, discount, count})
}
  </li>
`;

const createRpodactDescriptionString = ({image, name, code, season, sizeList, colorList, price, discount, count}) => `
  <div class="product-card__product-container">
    <div class="product-card__wrapper">
      <div class="product-card__content">
        <div class="product-card__img-scale">
          <picture>
            <source type="image/webp" srcset="${image.webp} 1x, ${image.webp2x} 2x">
            <img class="product-card__img" src="${image.jpg}" srcset="${image.jpg2x} 2x" width="130" height="160" alt="${name}">
          </picture>
        </div>
        <h4 class="product-card__title">${name}</h4>
        <div class="product-card__about">
          <div class="product-card__code-wrapper">
            <p class="product-card__info">Артикул<span class="product-card__code">${code}</span></p>
            <label>
              <input class="visually-hidden product-card__code-input" name="product-code" value="${code}">
            </label>
          </div>
          <p class="product-card__info">Сезон<span class="product-card__season">${season}</span></p>
          <fieldset class="product-card__filter-group">
            <legend class="visually-hidden">Выберите размер</legend>
            <ul class="product-card__size-list size-list">
              ${sizeList.map(({value, availible, checked}) => `
                <li class="size-list__item">
                  <label class="size-list__label">
                    <input class="size-list__input visually-hidden" type="radio" name="size_${code}" value="${value}" ${availible ? '' : 'disabled'} ${checked ? 'checked' : ''}>
                    <span class="size-list__button">${value}</span>
                  </label>
                </li>
              `).join('')}
            </ul>
          </fieldset>
          <fieldset class="product-card__filter-group">
            <legend class="visually-hidden">Выберите цвет</legend>
            <ul class="product-card__color-list color-list">
              ${colorList.map(({name, value, color, checked}) => `
                <li class="color-list__item">
                  <label class="color-list__label">
                    <input class="color-list__input visually-hidden" type="radio" name="color_${code}" value="${value}" ${checked ? 'checked' : ''}>
                    <span class="color-list__button">
                      <span class="color-list__marker" style="background-color:${color};"></span>
                    </span>
                    <span class="visually-hidden">${name}</span>
                  </label>
                </li>
              `).join('')}
            </ul>
          </fieldset>
        </div>

        <div class="product-card__price-section price-section">
          <div class="price-section__price-container">
          ${discount ? `
            <p class="price-section__price-wrapper price-section__price-wrapper--old">
              <span class="price-section__old-price">${formatMoneyWithDecimal(price)}</span>
              <span class="price-section__rouble"> ₽</span>
            </p>
          ` : ''}
            <p class="price-section__price-wrapper">
              <span class="price-section__price">${ discount ? `${formatMoneyWithDecimal(price - discount)}` : `${formatMoneyWithDecimal(price)}`}</span>
              <span class="price-section__rouble"> ₽</span>
            </p>
          </div>
          <div class="price-section__quantity product-quantity">
            <button class="product-quantity__button product-quantity__button--minus" ${count === 1 ? 'disabled' : ''}>
              <span class="visually-hidden">Уменьшить количество</span>
            </button>
            <label class="product-quantity__quantity-label">
              <span class="visually-hidden">Количество товара</span>
              <input class="product-quantity__quantity-field" type="number" name="product-quantity" value="${count}" min="1" readonly>
            </label>
            <button class="product-quantity__button product-quantity__button--plus">
              <span class="visually-hidden">Увеличить количество</span>
            </button>
          </div>
          <div class="price-section__price-container">
          ${discount ? `
            <p class="price-section__price-wrapper price-section__price-wrapper--old">
              <span class="price-section__old-price">${formatMoneyWithDecimal(price * count)}</span>
              <span class="price-section__rouble"> ₽</span>
            </p>
          ` : ''}
            <p class="price-section__price-wrapper price-section__price-wrapper--counted">
              <span class="price-section__price">${ discount ? `${formatMoneyWithDecimal((price - discount) * count)}` : `${formatMoneyWithDecimal(price * count)}`}</span>
              <span class="price-section__rouble"> ₽</span>
            </p>
          </div>
        </div>
      </div>

      <button class="product-card__delete-button delete-button">
        <span class="visually-hidden">Удалить товар из корзины</span>
      </button>
    </div>
  </div>
`;

const createDeleteMessageString = ({name}) => `
  <div class="product-card__message-container">
    <div class="product-card__wrapper">
      <div class="product-card__message card-message">
        <p class="card-message__info">Товар <span class="card-message__product-name">${name}</span> был удален из корзины.</p>
        <a class="card-message__link">Восстановить</a>
      </div>
      <button class="product-card__delete-button product-card__delete-button--message delete-button delete-button--message">
        <span class="visually-hidden">Удалить сообщение</span>
      </button>
    </div>
  </div>
`;

const createEmptyCartMessageString = () => `
  <div class="order__message message">
    <p class="message__main-text">Ваша корзина пуста =(</p>
    <p class="message__text">Вернитесь в <a class="empty-cart-message__link" href="#">каталог</a></p>
    <div class="message__image">
      <svg width="240" height="240" aria-hidden="true" focusable="false">
        <use xlink:href="img/sprite.svg#empty-cart"></use>
      </svg>
    </div>
  </div>
`;

const createOrderFormedMessageString = () => `
  <div class="order__message message">
    <p class="message__main-text">Спасибо =)</p>
    <p class="message__main-text">Ваш заказ успешно оформлен</p>
    <p class="message__text">Cкоро Вам позвонят для подтверждения заказа</p>
    <p class="message__text">А пока вы можете посмотреть другие товары в <a class="empty-cart-message__link" href="#">каталоге</a></p>
    <div class="message__image">
      <svg width="240" height="240" aria-hidden="true" focusable="false">
        <use xlink:href="img/sprite.svg#empty-cart"></use>
      </svg>
    </div>
  </div>
`;

export {createProductCardString, createEmptyCartMessageString, createOrderFormedMessageString};
