import {
  getCurrentWeatherData,
  getRequiredWeatherData,
} from './weather-script';

import createWeatherDetailsBox from './weather-city-page';

// This module is responsible for the logic
// of the location search box that allows
// the user to submit a request to the API
const LocationSearch = () => {
  let container;
  let input;
  let label;
  let button;
  // Event for verifying input value
  const verifySearchBoxOnInput = () => {
    // Get DOM elements
    if (input.validity.valid) {
      button.disabled = false;
      input.classList.remove('invalid');
    } else {
      button.disabled = true;
      if (input.validity.valueMissing === false) {
        input.classList.add('invalid');
      } else {
        input.classList.remove('invalid');
      }
    }
  };

  // Event for clicking on Search button
  const searchButtonEvent = async () => {
    // Get DOM Element
    // Fetch weather data from OpenWeather
    console.log(input);
    const weatherData = await getCurrentWeatherData(input.value);
    // const weatherData = sampleWeatherData;
    console.log(weatherData);
    if (weatherData.cod === '400') {
      alert('Empty');
    } else if (weatherData.cod === '404') {
      alert('Location not found.');
    } else {
      // Get needed fields only
      const neededWeatherData = getRequiredWeatherData(weatherData);
      console.log(neededWeatherData);

      // Remove welcome screen
      document.querySelector('#welcome').remove();
    }
  };

  // Creates and returns a container element
  // of the weather location search box
  const createSearchboxElement = () => {
    const containerDOM = document.createElement('div');
    containerDOM.id = 'location-search';
    //   Search Box Label
    const labelDOM = document.createElement('label');
    labelDOM.textContent = 'Location';
    labelDOM.for = 'location';
    // Search Box Input Element
    const inputDOM = document.createElement('input');
    inputDOM.type = 'text';
    inputDOM.name = 'location';
    inputDOM.id = 'location';
    inputDOM.pattern = '^[A-Za-z -]+$';
    inputDOM.placeholder = 'Enter a Location';
    inputDOM.required = true;
    inputDOM.addEventListener('input', verifySearchBoxOnInput); // Search box event
    //   Span for error messages
    const span = document.createElement('span');
    span.classList.add('error-msg');
    // Submit Button
    const buttonDOM = document.createElement('button');
    buttonDOM.textContent = 'Search';
    buttonDOM.disabled = true; // Initially disabled
    buttonDOM.addEventListener('click', searchButtonEvent); // Search button event
    // Appending to container
    containerDOM.appendChild(labelDOM);
    containerDOM.appendChild(inputDOM);
    containerDOM.appendChild(span);
    containerDOM.appendChild(buttonDOM);

    container = containerDOM;
    label = labelDOM;
    input = inputDOM;
    button = buttonDOM;

    return container;
  };

  return {
    createSearchboxElement,
  };
};

export default LocationSearch;
