// import { coordinates } from "./address-data";

const map = document.querySelector(['#map']);
const ymaps = window.ymaps;

const MAIN_COORDINATES = [59.9386300, 30.3141300];



const getMap = () => {
  let myMap = new ymaps.Map('map', {
    center: MAIN_COORDINATES,
    zoom: 16,
    controls: [ ],
  });

  let myPlacemark = new ymaps.Placemark( MAIN_COORDINATES, {
    balloonContent: '',
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/svg/pin.svg',
    iconImageSize: [26, 38],
    iconImageOffset: [-10, -20],
  });

  myMap.geoObjects.add(myPlacemark);
}

const initMap = () => {
  if (map) {
    ymaps.ready(getMap);
  }
}

initMap();

// const findAddressOnMap = () => {
  
// }


// const addresInputInit = () => {
//   addressInput.addEventListener('change', findAddressOnMap)
// }

// addresInputInit();