function celsius2Fahrenheit(value) {
  return Math.round((value * 9) / 5 + 32);
}

function fahrenheit2Celsius(value) {
  return Math.round(((value - 32) * 5) / 9);
}

export { celsius2Fahrenheit, fahrenheit2Celsius };
