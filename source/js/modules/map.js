import {formatStringToNumber} from './../utils/formatter.js';

const token = 'f1881142d674484b8bc475c39e0045ee1d5cc866';
const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address';

const addressInput = document.querySelector('.contacts-input__input--address');
const coordsInput = document.querySelector('.contacts-input__input--coordinates');
const addressButton = document.querySelector('.fild-with-button__button--address');
const map = document.querySelector(['#map']);

const ymaps = window.ymaps;
const Dadata = require('dadata-suggestions');
const dadata = new Dadata(token);

const MAIN_COORDINATES = [59.9386300, 30.3141300];
let query = addressInput.value;

ymaps.ready(init);

const cleanCoordsInput = () => {
  coordsInput.value = '';
}

const getCoordinatesFromAddress = () => {
  return dadata.address({query})
      .then((data) => {
        let coordinates = [];
        const {geo_lat, geo_lon} = data.suggestions[0].data;
        coordinates.push(formatStringToNumber(geo_lat), formatStringToNumber(geo_lon));
        return coordinates;
      })
      .catch(() => cleanCoordsInput());
};


function init() {
  if (!map) {
    return;
  }

  let myPlacemark;

  const myMap = new ymaps.Map('map', {
    center: MAIN_COORDINATES,
    zoom: 16,
    controls: [],
  });

  //Ищем адрес на карте
  const setAddressOnMap = async () => {
    query = addressInput.value;
    const data = await getCoordinatesFromAddress();

    if (!data) {
      return
    }

    if (myPlacemark) {
      myPlacemark.geometry.setCoordinates(data);
    } else {
      myPlacemark = createPlacemark(data);
      myMap.geoObjects.add(myPlacemark);
      // Слушаем событие окончания перетаскивания на метке.
      myPlacemark.events.add('dragend', findAddressbyCoords)
    }
    myMap.setCenter(data, 16);
    coordsInput.value = '';
    coordsInput.value = data;
  };

  addressButton.addEventListener('click', setAddressOnMap);
  addressInput.addEventListener('blur', setAddressOnMap);

  // Слушаем клик на карте.
  myMap.events.add('click', function (e) {
    let coords = e.get('coords');

    if (myPlacemark) {
      myPlacemark.geometry.setCoordinates(coords);
    } else {
      myPlacemark = createPlacemark(coords);
      myMap.geoObjects.add(myPlacemark);
      // Слушаем событие окончания перетаскивания на метке.
      myPlacemark.events.add('dragend', findAddressbyCoords);
    }

    const coordinatesToAddress = {
      lat: coords[0],
      lon: coords[1]
    }

    fetch(url, getOptions(coordinatesToAddress))
          .then((response) => response.json())
          .then((result) => {
            const address = result.suggestions[0].value;
            addressInput.value = address;
          })
  });

  // Создание метки.
  function createPlacemark(coords) {
    return new ymaps.Placemark(coords, {
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'img/svg/pin.svg',
      iconImageSize: [26, 38],
      iconImageOffset: [-10, -20],
      draggable: true,
    });
  }

  // // Определяем адрес по координатам (обратное геокодирование).
  const findAddressbyCoords = () => {
    const placemarkCoords = myPlacemark.geometry.getCoordinates();
    const coordinatesToAddress = {
      lat: placemarkCoords[0],
      lon: placemarkCoords[1]
    }

    fetch(url, getOptions(coordinatesToAddress))
      .then((response) => response.json())
      .then((result) => {
        const address = result.suggestions[0].value;
        addressInput.value = address;

      })
  }

  const getOptions = (query) => {
    return {
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Token " + token
      },
      body: JSON.stringify(query)
    }
  }
}
