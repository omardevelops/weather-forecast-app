// Component responsible for converting units on the client side
// For example, Celsius to Fahrenheit / Kelvin

// Temperature Units
const getCelsiusFromKelvin = (kelvin) => Math.round(kelvin - 273);
const getFahrenheitFromCelsius = (celsius) =>
  Math.round((celsius * 9) / 5 + 32);
const getFahrenheitFromKelvin = (kelvin) => {
  const celsius = getCelsiusFromKelvin(kelvin);
  return getFahrenheitFromCelsius(celsius);
};

export { getCelsiusFromKelvin, getFahrenheitFromKelvin };
