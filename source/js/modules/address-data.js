// var token = "f1881142d674484b8bc475c39e0045ee1d5cc866";
// var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
// var token = "f1881142d674484b8bc475c39e0045ee1d5cc866";
// var coordinatesToAddress = { lat: 55.878, lon: 37.653 };
// const addressInput = document.querySelector('.contacts-input__input--address');

// const getOptions = (query) => {
//   return {
//     method: "POST",
//     mode: "cors",
//     headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//         "Authorization": "Token " + token
//     },
//     body: JSON.stringify(query)
//   }
// }

// fetch(url, getOptions(coordinatesToAddress))
//   .then(response => response.json())
//   .then(result => addressInput.value = result.suggestions[0].value)
//   .catch(error => console.log("error", error));




// let query = addressInput.value;

// const Dadata = require('dadata-suggestions');
// const dadata = new Dadata(token);


// addressInput.addEventListener('change', (() => {
//   query = addressInput.value;
//   console.log(query);
//   getData(query, onSuccess, onFail)
// }))

// const onFail = () => {
//   console.log("Fail - try again");
// }

// let coordinates = [];

// const onSuccess = (data) => {
//   if (data.suggestions && data.suggestions.length) {
//     const {geo_lat, geo_lon} = data.suggestions[0].data;
//     coordinates.push(geo_lat, geo_lon);
//     console.log(coordinates);
//     return coordinates;
//   }
// }

// const getData = (onSuccess, onFail) => {
//   dadata.address({query})
//     .then((data) => {
//       onSuccess(data)
//     })
//     .catch(onFail)
// }

// getData(onSuccess, onFail);


///


// dadata.address({ query })
//     .then((data) => {
//       if (data.suggestions.length) {
//         console.log(data);
//         const {geo_lat, geo_lon} = data.suggestions[0].data;
//         coordinates.push(geo_lat, geo_lon);
//       }
//     })
//     .catch(console.error);

//     console.log(query);
//     console.log(coordinates);

// export {coordinates};