import './reset.css';
import './style.css';
// import sampleWeatherData from './sample-current-weather.json';
import {
  getCurrentWeatherData,
  getRequiredWeatherData,
} from './weather-script';
import createSearchboxElement from './location-search';

const welcomeContainer = document.querySelector('#welcome');
const locationSearchContainer = createSearchboxElement();
welcomeContainer.appendChild(locationSearchContainer);

const button = document.querySelector('#welcome > #location-search button');
const formInput = document.querySelector('#welcome #location');

formInput.addEventListener('input', () => {
  if (formInput.validity.valid) {
    button.disabled = false;
    formInput.classList.remove('invalid');
  } else {
    button.disabled = true;
    if (formInput.validity.valueMissing === false) {
      formInput.classList.add('invalid');
    } else {
      formInput.classList.remove('invalid');
    }
  }
});
button.addEventListener('click', async () => {
  // Fetch weather data from OpenWeather
  console.log(formInput);
  const weatherData = await getCurrentWeatherData(formInput.value);
  // const weatherData = sampleWeatherData;
  console.log(weatherData);
  if (weatherData.cod === '400') {
    alert('Empty');
  } else if (weatherData.cod === '404') {
    alert('Location not found.');
  } else {
    // Get needed fields only
    const neededWeatherData = getRequiredWeatherData(weatherData);
    console.log(neededWeatherData);

    // Remove welcome screen
    document.querySelector('#welcome').remove();
  }
});
