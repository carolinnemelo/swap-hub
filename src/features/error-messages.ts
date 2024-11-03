export const temperatureErrors = {
  kelvin: "Kelvin can't be a negative value",
  celsius: "Celsius can't have a value bellow -273.15",
  fahrenheit: "Fahrenheit can't have a value bellow -459.67",
  invalidUnit:
    "Invalid unit. Accepted units are Celsius, Fahrenheit, and Kelvin.",
  missingParameters: "All three parameters are required.",
};

export const volumeErrors = {
  missingParameters: "All three parameters are required.",
  fileReadError: "error reading the file",
  invalidUnit:
    "Invalid unit. Accepted units are milliliter, liter, cubic centimeter, cubic millimeter, kiloliter, cubic meter, cubic kilometer, teaspoon, tablespoon, cubic inch and fluid ounce.",
  negativeValue: "Value must be a positive number",
  invalidValue: "Value must be a number",
};