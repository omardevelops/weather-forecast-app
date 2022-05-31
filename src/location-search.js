// This module is responsible for the DOM
// of the location search box that allows
// the user to submit a request to the API

// Creates and returns a container element
// of the weather location search box
const createSearchboxElement = () => {
  const container = document.createElement('div');
  container.id = 'location-search';
  //   Search Box Label
  const label = document.createElement('label');
  label.textContent = 'Location';
  label.for = 'location';
  // Search Box Input Element
  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'location';
  input.id = 'location';
  input.pattern = '^[A-Za-z -]+$';
  input.placeholder = 'Enter a Location';
  input.required = true;
  console.log(input);
  //   Span for error
  const span = document.createElement('span');
  span.classList.add('error-msg');
  // Submit Button
  const button = document.createElement('button');
  button.textContent = 'Search';
  button.disabled = true; // Initially disabled
  // Appending to container
  container.appendChild(label);
  container.appendChild(input);
  container.appendChild(span);
  container.appendChild(button);

  return container;
};

export default createSearchboxElement;
