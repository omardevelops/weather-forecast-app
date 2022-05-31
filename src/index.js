import './reset.css';
import './style.css';
// import sampleWeatherData from './sample-current-weather.json';

import LocationSearch from './location-search';

const welcomeContainer = document.querySelector('#welcome');
const locationSearchContainer = LocationSearch().createSearchboxElement();
welcomeContainer.appendChild(locationSearchContainer);
