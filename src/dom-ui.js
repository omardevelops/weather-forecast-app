// This module is responsible for manipulating the DOM to produce the UI/UX of the weather app
import countries from './countries.json';
import getIconBasedOnWeather from './weather-icon-loader';
import { getWeekday, getMonthAsString } from './datetime_converter';

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

const updateDailyView = (dailyWeather) => {
  const dailyLabel = document.querySelector('#daily-weather h1');
  const container = document.querySelector('#daily-container');
  const containerChilds = Array.from(container.childNodes);
  // Remove container's children to reset daily view
  containerChilds.forEach((child) => child.remove());
  // Add divs for each day
  const days = Object.keys(dailyWeather);
  days.forEach((day, index) => {
    const times = Object.keys(dailyWeather[day]);
    console.log(times);
    const date = new Date(day);
    const weekday = getWeekday(date.getDay());
    const month = getMonthAsString(date.getMonth());
    const finalDate = `${weekday.slice(0, 3)} ${date.getDate()}`;
    console.log(finalDate);
    const div = document.createElement('div');
    if (index === 0) div.classList.add('selected'); // Today is selected initially

    const dayDate = document.createElement('h1');
    dayDate.textContent = finalDate;

    const weatherIcon = document.createElement('img');
    weatherIcon.src = getIconBasedOnWeather(
      dailyWeather[day][times[0]].weather[0].main
    );

    const weatherTemps = document.createElement('h1');
    weatherTemps.textContent = `${Math.round(
      dailyWeather[day].tempMax
    )} / ${Math.round(dailyWeather[day].tempMin)}`;

    const weatherDesc = document.createElement('h2');
    // eslint-disable-next-line operator-linebreak
    weatherDesc.textContent =
      dailyWeather[day][times[0]].weather[0].description;
    div.appendChild(dayDate);
    div.appendChild(weatherIcon);
    div.appendChild(weatherTemps);
    div.appendChild(weatherDesc);
    container.appendChild(div);
  });
};

export { updateCurrentWeatherView, updateDailyView };
