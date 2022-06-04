import './reset.css';
import './style.css';

import LocationSearch from './location-search';

const welcomeContainer = document.querySelector('#welcome');
const locationSearchContainer = LocationSearch().createSearchboxElement();
welcomeContainer.appendChild(locationSearchContainer);
