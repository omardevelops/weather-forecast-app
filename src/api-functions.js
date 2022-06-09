// This module is responsible for fetching data from OpenWeather's API
// https://api.openweathermap.org/data/2.5/weather?q=Dubai&APPID=8230c0b0d2c568cf07b2de9c2d671edc&units=metric

import countries from './countries.json';
import {
  getCelsiusFromKelvin,
  getFahrenheitFromKelvin,
} from './units-converter';

// Based on an input city name, return search results
const searchLocation = async (cityName) => {
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

  console.log(aggregateDaily);

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

// Unit conversion from Kelvin. Returns weather object with converted data.
// Unit is either 'C' or 'F'
const convertCurrentWeather = (weatherInKelvin, unit) => {
  const finalWeather = weatherInKelvin;
  const { temp } = weatherInKelvin.main;
  const feelsLike = weatherInKelvin.main.feels_like;
  const tempMin = weatherInKelvin.main.temp_min;
  const tempMax = weatherInKelvin.main.temp_max;

  if (unit === 'C') {
    finalWeather.main.temp = getCelsiusFromKelvin(temp);
    finalWeather.main.feels_like = getCelsiusFromKelvin(feelsLike);
    finalWeather.main.temp_min = getCelsiusFromKelvin(tempMin);
    finalWeather.main.temp_max = getCelsiusFromKelvin(tempMax);
  } else {
    // else unit is F
    finalWeather.main.temp = getFahrenheitFromKelvin(temp);
    finalWeather.main.feels_like = getFahrenheitFromKelvin(feelsLike);
    finalWeather.main.temp_min = getFahrenheitFromKelvin(tempMin);
    finalWeather.main.temp_max = getFahrenheitFromKelvin(tempMax);
  }

  return finalWeather;
};

// Unit conversion from Kelvin. Returns weather object with converted data.
// Unit is either 'C' or 'F'
const getFiveDayWeather = (weatherInKelvin, unit) => {
  if (unit === 'C') {
  } else {
  }
};

export {
  searchLocation,
  getCurrentWeather,
  getFiveDayWeatherData,
  aggregateWeatherData,
  convertCurrentWeather,
};
