// This module is responsible for manipulating the DOM to produce the UI/UX of the weather app
import countries from './countries.json';
import getIconBasedOnWeather from './weather-icon-loader';
import { getWeekday } from './datetime_converter';
import loadingSvg from './assets/loading.svg';

import WeatherData from './weather-data-save';

import {
  getCelsiusFromKelvin,
  getFahrenheitFromKelvin,
} from './units-converter';

import { startGeoAPIRequest, startWeatherAPIRequest } from './api-functions';

const getTempInSelectedUnit = (temp) => {
  const celsiusBtn = document.querySelector('#celsius');
  if (celsiusBtn.classList.contains('selected')) {
    return `${getCelsiusFromKelvin(temp)}°`;
  }
  return `${getFahrenheitFromKelvin(temp)}°`;
};

// Shows a spinning loading component
const loadingView = () => {
  const div = document.createElement('div');
  div.classList.add('loading');
  const loadingImg = document.createElement('img');
  loadingImg.src = loadingSvg;
  div.appendChild(loadingImg);
  return div;
};

const updateCurrentWeatherView = (countryCode, cityName, weatherData) => {
  const container = document.querySelector('#current-weather');
  const locationName = container.querySelector('h1');
  const weatherIcon = container.querySelector('#temperature-container img');
  const tempLabel = container.querySelector('#temperature-container h1');
  const weatherDesc = container.querySelector('#weather-description');
  const weatherDetailsDiv = container.querySelector('#details');
  const weatherDetailsInfo = [];
  locationName.textContent = `${cityName}, ${countries[countryCode]}`;
  weatherIcon.src = getIconBasedOnWeather(weatherData.weather[0].main);
  tempLabel.textContent = getTempInSelectedUnit(weatherData.main.temp);
  weatherDesc.textContent = weatherData.weather[0].main;
  weatherDetailsInfo.push(
    `Feels Like ${getTempInSelectedUnit(weatherData.main.feels_like)}`
  );
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

const updateHourlyView = (dayWeather) => {
  const container = document.querySelector('#hourly-container');
  const containerChilds = Array.from(container.childNodes);
  // Remove existing content
  containerChilds.forEach((child) => child.remove());

  // Display none for animation
  container.style.display = 'none';

  const timings = Object.keys(dayWeather.timings);
  timings.forEach((timing) => {
    const data = dayWeather.timings[timing];
    const div = document.createElement('div');
    const timingLabel = document.createElement('h1');
    timingLabel.textContent = timing.slice(0, 5);
    const weatherIcon = document.createElement('img');
    weatherIcon.src = getIconBasedOnWeather(data.weather[0].main);
    const tempLabel = document.createElement('h1');
    tempLabel.textContent = getTempInSelectedUnit(data.main.temp);
    const weatherDesc = document.createElement('h2');
    weatherDesc.textContent = data.weather[0].description;

    div.appendChild(timingLabel);
    div.appendChild(weatherIcon);
    div.appendChild(tempLabel);
    div.appendChild(weatherDesc);
    container.appendChild(div);
  });

  // Restore view for animation to run
  container.style.display = 'flex';
};

const selectDay = (dayDiv) => {
  const allDayDivs = document.querySelector('#daily-container');
  allDayDivs.childNodes.forEach((div) => {
    div.classList.remove('selected');
  });
  dayDiv.classList.add('selected');
};

const updateDailyView = (dailyWeather) => {
  const container = document.querySelector('#daily-container');
  const containerChilds = Array.from(container.childNodes);
  // Remove container's children to reset daily view
  containerChilds.forEach((child) => child.remove());
  // Add divs for each day
  const days = Object.keys(dailyWeather);
  days.forEach((day, index) => {
    const times = Object.keys(dailyWeather[day].timings);
    const date = new Date(day);
    const weekday = getWeekday(date.getDay());
    const finalDate = `${weekday.slice(0, 3)} ${date.getDate()}`;

    const div = document.createElement('div');
    if (index === 0) div.classList.add('selected'); // Today is selected initially
    div.addEventListener('click', () => {
      selectDay(div);
      updateHourlyView(dailyWeather[day]);
    });

    const dayDate = document.createElement('h1');
    dayDate.textContent = finalDate;

    const weatherIcon = document.createElement('img');
    weatherIcon.src = getIconBasedOnWeather(
      dailyWeather[day].timings[times[0]].weather[0].main
    );

    const weatherTemps = document.createElement('h1');
    weatherTemps.textContent = `${getTempInSelectedUnit(
      dailyWeather[day].tempMax
    )} / ${getTempInSelectedUnit(dailyWeather[day].tempMin)}`;

    const weatherDesc = document.createElement('h2');
    // eslint-disable-next-line operator-linebreak
    weatherDesc.textContent =
      dailyWeather[day].timings[times[0]].weather[0].description;
    div.appendChild(dayDate);
    div.appendChild(weatherIcon);
    div.appendChild(weatherTemps);
    div.appendChild(weatherDesc);
    container.appendChild(div);
  });
};

// Fetches from the WeatherData object to update all views
const updateAllWeatherViews = () => {
  const daysKeys = Object.keys(WeatherData.fiveDayWeather);

  updateCurrentWeatherView(
    WeatherData.countryCode,
    WeatherData.cityName,
    WeatherData.currentWeather
  );
  updateDailyView(WeatherData.fiveDayWeather);
  updateHourlyView(WeatherData.fiveDayWeather[daysKeys[0]]);
};

// Creates and adds the event listeners for the UI elements
// Searchbox and temperature unit buttons (C and F)
const initializeEventListeners = () => {
  const celsiusBtn = document.querySelector('#celsius');
  const fahrenheitBtn = document.querySelector('#fahrenheit');
  const tempBtns = [celsiusBtn, fahrenheitBtn];

  tempBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tempBtns.forEach((button) => button.classList.remove('selected'));
      btn.classList.add('selected');
      updateAllWeatherViews();
    });
  });

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

        const geoResult = await startGeoAPIRequest(searchbox.value);
        await startWeatherAPIRequest(geoResult[0]); // Data stored in WeatherData object

        updateAllWeatherViews();
      } catch (error) {
        console.error(error);
        alert(error);
      }
      // Show main container
      mainContainer.style.display = 'block';
      loadingComponent.remove();
    }
  });
};

export {
  updateCurrentWeatherView,
  updateDailyView,
  updateHourlyView,
  loadingView,
  initializeEventListeners,
};
