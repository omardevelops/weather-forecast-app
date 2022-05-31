// This module is responsible for the DOM
// of the location search box that allows
// the user to submit a request to the API

const createSearchboxElement = () => {
  const container = document.createElement('div');
  container.id = 'location-search';

  const label = document.createElement('label');
  label.textContent = 'Location';
  label.for = 'location';

  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'location';
  input.id = 'location';
  input.requred = true;
  input.pattern = '^[A-Za-z -]+$';
  input.placeholder = 'Enter a Location';

  const button = document.createElement('button');
  button.textContent = 'Search';
  button.disabled = true; // Initially disabled

  container.appendChild(label);
  container.appendChild(input);
  container.appendChild(button);

  return container;
};

export default createSearchboxElement;
