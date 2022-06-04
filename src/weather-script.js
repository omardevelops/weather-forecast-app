// This module is responsible for fetching data from OpenWeather's API
// https://api.openweathermap.org/data/2.5/weather?q=Dubai&APPID=8230c0b0d2c568cf07b2de9c2d671edc&units=metric

import countries from './countries.json';
// Based on an input location returns object of weather data
const getCurrentWeatherData = async (location) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=8230c0b0d2c568cf07b2de9c2d671edc&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Filters weather data to needed fields only, returns object of data
const getRequiredWeatherData = (weatherData) => ({
  cityName: weatherData.name,
  countryCode: weatherData.sys.country,
  countryName: countries[weatherData.sys.country],
  currentWeatherLabel: weatherData.weather[0].main,
  currentTemps: {
    min: weatherData.main.temp_min,
    max: weatherData.main.temp_max,
    temp: weatherData.main.temp,
    feelsLike: weatherData.main.feels_like,
    humidity: weatherData.main.humidity,
  },
  visibility: weatherData.visibility,
  wind: weatherData.wind,
});

export { getCurrentWeatherData, getRequiredWeatherData };
