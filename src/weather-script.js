// This module is responsible for fetching data from OpenWeather's API
// https://api.openweathermap.org/data/2.5/weather?q=Dubai&APPID=8230c0b0d2c568cf07b2de9c2d671edc&units=metric

// Based on an input location returns object of weather data
const getWeatherData = async (location) => {
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

export default getWeatherData;
