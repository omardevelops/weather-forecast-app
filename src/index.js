// ### Import CSS Files ###
import './reset.css';
import './style.css';
// ### Import JS Modules ###
import {
  searchLocation,
  getFiveDayWeatherData,
  aggregateWeatherData,
  getCurrentWeather,
} from './api-functions';

import sampleWeather from './sample-data.json';
import {
  updateDailyView,
  updateCurrentWeatherView,
  updateHourlyView,
  loadingView,
  initializeEventListeners,
} from './dom-ui';

import sampleCurrentWeather from './sample-current-weather.json';

initializeEventListeners();

// Code segment for searching geolocation
// let timer = null;
// searchbox.addEventListener('keyup', (key) => {
//   if (key.code !== 'Enter' && searchbox.value !== '') {
//     clearTimeout(timer);
//     timer = setTimeout(() => searchLocation(searchbox.value), 500);
//   }
// });

// console.log(getFiveDayWeatherData(40.7127281, -74.0060152));
// console.log(sampleWeather);
console.log(aggregateWeatherData(sampleWeather));
