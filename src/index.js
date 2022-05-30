import './reset.css';
import './style.css';
import sampleWeatherData from './sample-current-weather.json';
import {
  getCurrentWeatherData,
  getRequiredWeatherData,
} from './weather-script';

const button = document.querySelector('#welcome > form button');
const formInput = document.querySelector('#welcome #location');
button.addEventListener('click', async () => {
  // Fetch weather data from OpenWeather
  console.log(formInput);
  const weatherData = await getCurrentWeatherData(formInput.value);
  // const weatherData = sampleWeatherData;
  console.log(weatherData);
  if (weatherData.cod === '400') {
    alert('Empty');
  } else if (weatherData.cod === '404') {
    alert('City not found');
  } else {
    // Get needed fields only
    const neededWeatherData = getRequiredWeatherData(weatherData);
    console.log(neededWeatherData);

    // Remove welcome screen
    document.querySelector('#welcome').remove();
  }
});
