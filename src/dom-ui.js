// This module is responsible for manipulating the DOM to produce the UI/UX of the weather app
import countries from './countries.json';
import getIconBasedOnWeather from './weather-icon-loader';
import { getWeekday } from './datetime_converter';

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

const updateHourlyView = (dayWeather) => {
  const container = document.querySelector('#hourly-container');
  const containerChilds = Array.from(container.childNodes);
  // Remove existing content
  containerChilds.forEach((child) => child.remove());

  const timings = Object.keys(dayWeather.timings);
  timings.forEach((timing) => {
    const data = dayWeather.timings[timing];
    const div = document.createElement('div');
    const timingLabel = document.createElement('h1');
    timingLabel.textContent = timing.slice(0, 5);
    const weatherIcon = document.createElement('img');
    weatherIcon.src = getIconBasedOnWeather(data.weather[0].main);
    const tempLabel = document.createElement('h1');
    tempLabel.textContent = Math.round(data.main.temp);
    const weatherDesc = document.createElement('h2');
    weatherDesc.textContent = data.weather[0].description;

    div.appendChild(timingLabel);
    div.appendChild(weatherIcon);
    div.appendChild(tempLabel);
    div.appendChild(weatherDesc);
    container.appendChild(div);
  });
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
    weatherTemps.textContent = `${Math.round(
      dailyWeather[day].tempMax
    )} / ${Math.round(dailyWeather[day].tempMin)}`;

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

export { updateCurrentWeatherView, updateDailyView, updateHourlyView };
