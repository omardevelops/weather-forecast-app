import './reset.css';
import './style.css';
import sampleWeatherData from './sample-current-weather.json';
import {
  getCurrentWeatherData,
  getRequiredWeatherData,
} from './weather-script';

// const button = document.createElement('button');
// button.textContent = 'Get Data';
// button.addEventListener('click', () => {
//   // Fetch weather data from OpenWeather
//   // const weatherData = await getCurrentWeatherData('Dubai');
//   const weatherData = sampleWeatherData;
//   console.log(weatherData);
//   // Get needed fields only
//   const neededWeatherData = getRequiredWeatherData(weatherData);
//   console.log(neededWeatherData);
// });
// document.body.appendChild(button);
