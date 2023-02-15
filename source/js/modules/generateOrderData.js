import {productsArr} from './product-list';
import {promocodesArr} from './promocode';

const generateProductArrForOrder = () => {
  const productOrderArr = productsArr.filter((item) => !item.deleted).map((item) => {
    return {
      name: item.name,
      code: item.code,
      size: item.sizeList.find((element) => element.checked).value,
      color: item.colorList.find((element) => element.checked).value,
      count: item.count,
      price: item.price,
      discount: item.discount,
      priceAfterDiscount: (item.price - item.discount),
      totalPrice: ((item.price - item.discount) * item.count),
    };
  });
  return productOrderArr;
};

const generatePromocodeArrForOrder = () => {
  const promocodeOrderArr = promocodesArr.filter((item) => item.applied).map((item) => {
    return {
      name: item.name,
      value: item.value,
    };
  });
  return promocodeOrderArr;
};

export {generateProductArrForOrder, generatePromocodeArrForOrder};
