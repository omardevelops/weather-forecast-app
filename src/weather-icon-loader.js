// Responsible for loading weather icons
import Clear from './assets/weather-icons/clear-day.svg';
import Clouds from './assets/weather-icons/cloudy.svg';
import Thunderstorm from './assets/weather-icons/thunderstorms-rain.svg';
import Drizzle from './assets/weather-icons/drizzle.svg';
import Rain from './assets/weather-icons/rain.svg';
import Snow from './assets/weather-icons/snow.svg';
import Mist from './assets/weather-icons/mist.svg';
import Smoke from './assets/weather-icons/smoke.svg';
import Haze from './assets/weather-icons/haze.svg';
import Dust from './assets/weather-icons/dust.svg'; // Use for Sand as well
import Fog from './assets/weather-icons/fog.svg';

const getIconBasedOnWeather = (weather) => {
  switch (weather) {
    case 'Clear':
      return Clear;
    case 'Clouds':
      return Clouds;
    case 'Thunderstorm':
      return Thunderstorm;
    case 'Drizzle':
      return Drizzle;
    case 'Rain':
      return Rain;
    case 'Snow':
      return Snow;
    case 'Mist':
      return Mist;
    case 'Smoke':
      return Smoke;
    case 'Haze':
      return Haze;
    case 'Sand':
    case 'Dust':
      return Dust;
    case 'Fog':
      return Fog;

    default:
      return Clouds;
  }
};

export default getIconBasedOnWeather;
