const toasifyColors = {
  "--toastify-color-error": "#e74c3c",
};

const TOAST_OPTIONS = {
  theme: "dark",
  position: "top-center",
  autoClose: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  style: { border: `1px solid ${toasifyColors["--toastify-color-error"]}` },
};
const TOAST_CONTAINER_ATTRIBUTES = {
  limit: 2,
  newestOnTop: true,
};

const DEFAULT_CITY_CODE = "328328"; //London AccuWeather code
const DEFAULT_CITY = "London";
const DEFAULT_AREA = "London";
const DEFAULT_COUNTRY = "United Kingdom";
const DEFAULT_CITY_LIST = [
  {
    key: DEFAULT_CITY_CODE,
    city: DEFAULT_CITY,
    area: DEFAULT_AREA,
    country: DEFAULT_COUNTRY,
  },
];

const DEFAULT_THEME = "dark";
const DEFAULT_TEMPERATURE_UNIT = "C";
const BASE_ACCUWEATHER_URL = "http://dataservice.accuweather.com";
const WEATHER_CARD_STYLES = {
  maxWidth: 345,
  minHeight: 200,
  flexDirection: "column",
};
const WEATHER_CARD_LIST_MINHEIGHT = 200;

// Matches all english alphabet characters and empty space
const ENGLISH_ALPHABET_FILTER = /[A-Za-z\s]/g;

const GEOLOCATION_TIMEOUT = 60000; // 1 minute
const GEOLOCATION_MAXIMUM_AGE = 600000; // 10 minutes

const DEFAULT_PORT = 5050;

export {
  TOAST_CONTAINER_ATTRIBUTES,
  TOAST_OPTIONS,
  DEFAULT_CITY_CODE,
  DEFAULT_CITY,
  DEFAULT_AREA,
  DEFAULT_COUNTRY,
  DEFAULT_CITY_LIST,
  DEFAULT_THEME,
  DEFAULT_TEMPERATURE_UNIT,
  BASE_ACCUWEATHER_URL,
  WEATHER_CARD_STYLES,
  WEATHER_CARD_LIST_MINHEIGHT,
  ENGLISH_ALPHABET_FILTER,
  GEOLOCATION_TIMEOUT,
  GEOLOCATION_MAXIMUM_AGE,
  DEFAULT_PORT,
};
