// This component is responsible for showing weather data of a particular city or location
import getIconBasedOnWeather from './weather-icon-loader';
// Creates and returns a container with weather information
const createWeatherDetailsBox = (weatherInfo) => {
  const weatherInfoSample = {
    cityName: 'Dubai',
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    currentWeatherLabel: 'Clear',
    currentTemps: {
      min: 41.14,
      max: 42.16,
      temp: 41.77,
      feelsLike: 40.18,
      humidity: 15,
    },
    visibility: 10000,
    wind: {
      speed: 4.63,
      deg: 310,
    },
  };

  // Container Element
  const container = document.createElement('div');
  container.classList.add('dialog-box');
  container.id = 'weather-details-box';

  // Location Name Header
  const locationName = document.createElement('h1');
  locationName.textContent = `${weatherInfo.cityName}, ${weatherInfo.countryName}`;
  locationName.classList.add('header');

  const infoContainer = document.createElement('div');

  // Weather Icon
  const weatherIcon = document.createElement('img');
  weatherIcon.src = getIconBasedOnWeather(weatherInfo.currentWeatherLabel);

  // Weather Description Label
  const weatherLabel = document.createElement('h1');
  weatherLabel.textContent = weatherInfo.currentWeatherLabel;

  // Current Temperature
  const currentTempHeader = document.createElement('h1');
  currentTempHeader.textContent = `${Math.round(
    weatherInfo.currentTemps.temp
  )}°C`;

  // Feels like
  const feelsLikeHeader = document.createElement('h2');
  feelsLikeHeader.textContent = `Feels Like ${Math.round(
    weatherInfo.currentTemps.feelsLike
  )}°C`;

  // Max/Low Temps
  const maxLowTempsHeader = document.createElement('h2');
  maxLowTempsHeader.textContent = `${Math.round(
    weatherInfo.currentTemps.max
  )}°C / ${Math.round(weatherInfo.currentTemps.min)}°C`;

  // Humidity
  const humidityHeader = document.createElement('h2');
  humidityHeader.textContent = `Humidity: ${Math.round(
    weatherInfo.currentTemps.humidity
  )}%`;
  // Wind
  const windHeader = document.createElement('h2');
  windHeader.textContent = `Wind Speed: ${Math.round(
    weatherInfo.wind.speed
  )} km/h`;
  // Visibility
  const visiblityHeader = document.createElement('h2');
  visiblityHeader.textContent = `Visiblity: ${Math.round(
    weatherInfo.visibility / 1000
  )} km`;

  container.appendChild(locationName);
  container.appendChild(weatherIcon);
  infoContainer.appendChild(weatherLabel);
  infoContainer.appendChild(currentTempHeader);
  infoContainer.appendChild(feelsLikeHeader);
  infoContainer.appendChild(maxLowTempsHeader);
  container.appendChild(infoContainer);
  container.appendChild(humidityHeader);
  container.appendChild(windHeader);
  container.appendChild(visiblityHeader);
  return container;
};

export default createWeatherDetailsBox;
