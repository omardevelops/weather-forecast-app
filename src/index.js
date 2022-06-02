import './reset.css';
import './style.css';
// import sampleWeatherData from './sample-current-weather.json';
import createWeatherDetailsBox from './weather-city-page';

import LocationSearch from './location-search';

// const welcomeContainer = document.querySelector('#welcome');
// const locationSearchContainer = LocationSearch().createSearchboxElement();
// welcomeContainer.appendChild(locationSearchContainer);
document.querySelector('main').appendChild(createWeatherDetailsBox());
