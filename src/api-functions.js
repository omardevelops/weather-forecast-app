// This module is responsible for fetching data from OpenWeather's API
// https://api.openweathermap.org/data/2.5/weather?q=Dubai&APPID=8230c0b0d2c568cf07b2de9c2d671edc&units=metric

import WeatherData from './weather-data-save';

// Based on an input location name, return search results
const startGeoAPIRequest = async (cityName) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=8230c0b0d2c568cf07b2de9c2d671edc`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

// Based on input latitude and longitude, return current weather for that location
const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8230c0b0d2c568cf07b2de9c2d671edc`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Based on input latitude and longitude, return comprehensive weather data
// Returns an object with a list of 3 hour interval segments of weather data over 5 days
const getFiveDayWeatherData = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8230c0b0d2c568cf07b2de9c2d671edc`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Aggregates weather data into each date and 3hr timeslot and prepares it for UI functions
/* Example: {"2022-06-06": { "6:00": data1, "9:00": data2 }, "2022-06-07: {etc...}"...} */
const aggregateWeatherData = (fullWeatherData) => {
  const aggregateDaily = {};
  const { list } = fullWeatherData;
  list.forEach((item) => {
    const [date, time] = item.dt_txt.split(' ');
    if (aggregateDaily[date] === undefined) aggregateDaily[date] = {}; // if not avail, new entry
    if (aggregateDaily[date].timings === undefined) {
      aggregateDaily[date].timings = {};
    }
    aggregateDaily[date].timings[time] = item; // adds entire object
  });

  // Find max temp and min temp for each day
  const dates = Object.keys(aggregateDaily);
  dates.forEach((date) => {
    let max = -999;
    let min = 999;
    const times = Object.keys(aggregateDaily[date].timings);
    times.forEach((time) => {
      const tempMin = aggregateDaily[date].timings[time].main.temp_min;
      const tempMax = aggregateDaily[date].timings[time].main.temp_max;
      if (tempMin < min) min = tempMin;
      if (tempMax > max) max = tempMax;
    });
    aggregateDaily[date].tempMax = max;
    aggregateDaily[date].tempMin = min;
  });
  return aggregateDaily; // returns aggregated data with city info as well
};

// Performs an API Request and fills in the WeatherData object
const startWeatherAPIRequest = async (geoResult) => {
  // Begin API Request
  // eslint-disable-next-line object-curly-newline
  const { lat, lon, country, name } = geoResult;
  WeatherData.countryCode = country;
  WeatherData.cityName = name;

  WeatherData.currentWeather = await getCurrentWeather(lat, lon);
  const fiveDayWeather = await getFiveDayWeatherData(lat, lon);
  WeatherData.fiveDayWeather = aggregateWeatherData(fiveDayWeather);
};

export { startGeoAPIRequest, startWeatherAPIRequest };
