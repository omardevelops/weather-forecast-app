// This module is responsible for fetching data from OpenWeather's API
// https://api.openweathermap.org/data/2.5/weather?q=Dubai&APPID=8230c0b0d2c568cf07b2de9c2d671edc&units=metric

import countries from './countries.json';

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
  const { list, city } = fullWeatherData;
  list.forEach((item) => {
    const [date, time] = item.dt_txt.split(' ');
    if (aggregateDaily[date] === undefined) aggregateDaily[date] = {}; // if not avail, new entry
    aggregateDaily[date][time] = item; // adds entire object
  });
  return { city, weatherInfo: aggregateDaily }; // returns aggregated data with city info as well
};

// // Filters weather data to needed fields only, returns object of data
// const getRequiredWeatherData = (weatherData) => ({
//   cityName: weatherData.name,
//   countryCode: weatherData.sys.country,
//   countryName: countries[weatherData.sys.country],
//   currentWeatherLabel: weatherData.weather[0].main,
//   currentTemps: {
//     min: weatherData.main.temp_min,
//     max: weatherData.main.temp_max,
//     temp: weatherData.main.temp,
//     feelsLike: weatherData.main.feels_like,
//     humidity: weatherData.main.humidity,
//   },
//   visibility: weatherData.visibility,
//   wind: weatherData.wind,
// });

// export { getCurrentWeatherData, getRequiredWeatherData };
export { searchLocation, getFiveDayWeatherData, aggregateWeatherData };
