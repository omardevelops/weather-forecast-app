import './reset.css';
import './style.css';
import getWeatherData from './weather-script';

const button = document.createElement('button');
button.textContent = 'Get Data';
button.addEventListener('click', async () => {
  const weatherData = await getWeatherData('Dubaiaasdfawer');
  console.log(weatherData);
});
document.body.appendChild(button);
