// This module is responsible for manipulating the DOM to produce the UI/UX of the weather app
import countries from './countries.json';
import getIconBasedOnWeather from './weather-icon-loader';

const updateCurrentWeatherView = (cityName, weatherData) => {
  const container = document.querySelector('#current-weather');
  const locationName = container.querySelector('h1');
  const weatherIcon = container.querySelector('#temperature-container img');
  const tempLabel = container.querySelector('#temperature-container h1');
  const weatherDesc = container.querySelector('#weather-description');
  const weatherDetailsDiv = container.querySelector('#details');
  const weatherDetailsInfo = [];
  locationName.textContent = `${cityName}, ${
    countries[weatherData.sys.country]
  }`;
  weatherIcon.src = getIconBasedOnWeather(weatherData.weather[0].main);
  tempLabel.textContent = Math.round(weatherData.main.temp);
  weatherDesc.textContent = weatherData.weather[0].main;
  weatherDetailsInfo.push(`Feels Like ${weatherData.main.feels_like}`);
  weatherDetailsInfo.push(
    `Wind ${weatherData.wind.speed} km/h, ${weatherData.wind.deg}°`
  );
  weatherDetailsInfo.push(`Visibility ${weatherData.visibility / 1000} km`);
  weatherDetailsInfo.push(`Pressure ${weatherData.main.pressure} mb`);
  weatherDetailsInfo.push(`Humidity ${weatherData.main.humidity}%`);

  //   Remove current details
  const oldSpan = weatherDetailsDiv.querySelector('span');
  if (oldSpan !== null) oldSpan.remove();
  //   Add new info
  const span = document.createElement('span');
  weatherDetailsInfo.forEach((item) => {
    const text = document.createElement('p');
    text.textContent = item;
    span.appendChild(text);
  });
  weatherDetailsDiv.appendChild(span);
};

export default updateCurrentWeatherView;
