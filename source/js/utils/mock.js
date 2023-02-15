const products = [
  {
    name: 'Утепленная стеганная куртка женская Top Hills',
    image: {
      jpg: './img/top-hills.jpg',
      jpg2x: './img/top-hills@2x.jpg',
      webp: './img/top-hills.webp',
      webp2x: './img/top-hills@2x.webp',
    },
    code: '512-05',
    season: 'Осень-зима',
    price: 12000,
    discount: 2000,
    count: 2,
    sizeList: [{
      value: 'XS',
      availible: true,
      checked: false,
    },
    {
      value: 'S',
      availible: true,
      checked: false,
    },
    {
      value: 'M',
      availible: true,
      checked: true,
    },
    {
      value: 'L',
      availible: true,
      checked: false,
    },
    {
      value: 'XL',
      availible: true,
      checked: false,
    }],
    colorList: [{
      name: 'Черный',
      value: 'black',
      color: '#444444',
      checked: true,
    },
    {
      name: 'Cиний',
      value: 'blue',
      color: '#106DA2',
      checked: false,
    },
    {
      name: 'Коричневый',
      value: 'brown',
      color: '#AE6D0C',
      checked: false,
    }],
    deleted: false,
  },
  {
    name: 'Наименование товара',
    image: {
      jpg: './img/zolla.jpg',
      jpg2x: './img/zolla@2x.jpg',
      webp: './img/zolla.webp',
      webp2x: './img/zolla@2x.webp',
    },
    code: '891-257',
    season: 'Демисезон',
    price: 500,
    discount: 0,
    count: 1,
    sizeList: [{
      value: 'XS',
      availible: true,
      checked: false,
    },
    {
      value: 'S',
      availible: true,
      checked: true,
    },
    {
      value: 'M',
      availible: true,
      checked: false,
    },
    {
      value: 'L',
      availible: false,
      checked: false,
    },
    {
      value: 'XL',
      availible: false,
      checked: false,
    }],
    colorList: [{
      name: 'Черный',
      value: 'black',
      color: '#444444',
      checked: true,
    }],
    deleted: true,
  },
  {
    name: 'Вязанная шапка Zolla',
    image: {
      jpg: './img/zolla.jpg',
      jpg2x: './img/zolla@2x.jpg',
      webp: './img/zolla.webp',
      webp2x: './img/zolla@2x.webp',
    },
    code: '891-256',
    season: 'Демисезон',
    price: 500,
    discount: 0,
    count: 1,
    sizeList: [{
      value: 'XS',
      availible: true,
      checked: false,
    },
    {
      value: 'S',
      availible: true,
      checked: true,
    },
    {
      value: 'M',
      availible: true,
      checked: false,
    },
    {
      value: 'L',
      availible: false,
      checked: false,
    },
    {
      value: 'XL',
      availible: false,
      checked: false,
    }],
    colorList: [{
      name: 'Черный',
      value: 'black',
      color: '#444444',
      checked: true,
    }],
    deleted: false,
  }
];


const promocodes = [
  {
    name: '1B6D9FC',
    value: 500,
    applied: true,
  },
  {
    name: '123456',
    value: 1000,
    applied: false,
  }
];

export {products, promocodes};
