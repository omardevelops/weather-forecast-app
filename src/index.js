import './reset.css';
import './style.css';
import countries from './countries.json';
import sampleWeatherData from './sample-current-weather.json';
// import getCurrentWeatherData from './weather-script';

const getCountryFromCode = (countryCode) => countries[countryCode];

const button = document.createElement('button');
button.textContent = 'Get Data';
button.addEventListener('click', () => {
  // Fetch weather data from OpenWeather
  // const weatherData = await getCurrentWeatherData('Dubai');
  const weatherData = sampleWeatherData;
  console.log(weatherData);
  // Get needed fields only
  const neededWeatherData = {
    cityName: weatherData.name,
    countryCode: weatherData.sys.country,
    countryName: getCountryFromCode(weatherData.sys.country),
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
    clouds: weatherData.clouds,
  };
  console.log(neededWeatherData);
});
document.body.appendChild(button);
