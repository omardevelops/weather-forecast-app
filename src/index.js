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
} from './dom-ui';

import sampleCurrentWeather from './sample-current-weather.json';

const searchbox = document.querySelector('input');
searchbox.addEventListener('keypress', async (key) => {
  if (key.code === 'Enter') {
    const loadingComponent = loadingView();
    // Hide main container
    const mainContainer = document.querySelector('main');
    mainContainer.style.display = 'none';
    try {
      // Show loading component
      document.body.appendChild(loadingComponent);
      const coordinates = await searchLocation(searchbox.value);

      // Begin API Request
      // eslint-disable-next-line object-curly-newline
      const { lat, lon, country, name } = coordinates[0];

      const currentWeather = await getCurrentWeather(lat, lon);
      const fiveDayWeather = await getFiveDayWeatherData(lat, lon);
      const aggregatedFiveDay = aggregateWeatherData(fiveDayWeather);

      const daysKeys = Object.keys(aggregatedFiveDay);
      updateCurrentWeatherView(country, name, currentWeather);
      updateDailyView(aggregatedFiveDay);
      // Update hourly view by fetching first day data
      updateHourlyView(aggregatedFiveDay[daysKeys[0]]);
    } catch (error) {
      console.error(error);
      alert(error);
    }
    // Show main container
    mainContainer.style.display = 'block';
    loadingComponent.remove();
  }
});
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
