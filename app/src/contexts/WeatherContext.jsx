import { createContext, useContext, useEffect, useReducer } from "react";

import { ResponseError } from "../utils/errors";
import useGeolocation from "../hooks/useGeolocation";
import { useUserSettings } from "./UserSettingsContext";
import { useToastFactory } from "./UserSettingsContext";
import { celsius2Fahrenheit, fahrenheit2Celsius } from "../utils/helpers";
import {
  BASE_ACCUWEATHER_URL,
  DEFAULT_AREA,
  DEFAULT_CITY,
  DEFAULT_CITY_CODE,
  DEFAULT_CITY_LIST,
  DEFAULT_COUNTRY,
} from "../utils/constants";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WeatherContext = createContext();

const initialState = {
  errorCity: null,
  errorCurrent: null,
  error5Day: null,
  isLoadingCity: false,
  isLoadingCurrent: false,
  isLoading5Day: false,
  currentCity: DEFAULT_CITY,
  currentArea: DEFAULT_AREA,
  currentCountry: DEFAULT_COUNTRY,
  currentCityCode: DEFAULT_CITY_CODE,
  currentForecast: null,
  fiveDayForecast: null,
  isOwnLocationLoaded: false,
  cityList: DEFAULT_CITY_LIST,
};

function reducer(state, action) {
  switch (action.type) {
    case "city/loaded":
      return {
        ...state,
        errorCity: "",
        isLoadingCity: false,
        currentCity: action.payload.city,
        currentArea: action.payload.area,
        currentCityCode: action.payload.key,
        currentCountry: action.payload.country,
      };
    case "cityList/loaded":
      return {
        ...state,
        cityList: action.payload,
      };
    case "currForecast/loaded":
      return {
        ...state,
        errorCurrent: "",
        isLoadingCurrent: false,
        currentForecast: action.payload,
      };
    case "5DayForecast/loaded":
      return {
        ...state,
        error5Day: "",
        isLoading5Day: false,
        fiveDayForecast: action.payload,
      };
    case "loadingCity":
      return { ...state, isLoadingCity: true };
    case "loadingCurrent":
      return { ...state, isLoadingCurrent: true };
    case "loading5Day":
      return { ...state, isLoading5Day: true };
    case "tempUnit/change":
      return {
        ...state,
        fiveDayForecast: {
          ...state.fiveDayForecast,
          DailyForecasts: state.fiveDayForecast.DailyForecasts.map((item) => {
            return {
              ...item,
              Temperature: {
                ...item.Temperature,
                Minimum: {
                  ...item.Temperature.Minimum,
                  Value:
                    action.payload === "C"
                      ? fahrenheit2Celsius(item.Temperature.Minimum.Value)
                      : celsius2Fahrenheit(item.Temperature.Minimum.Value),
                },
                Maximum: {
                  ...item.Temperature.Maximum,
                  Value:
                    action.payload === "C"
                      ? fahrenheit2Celsius(item.Temperature.Maximum.Value)
                      : celsius2Fahrenheit(item.Temperature.Maximum.Value),
                },
              },
            };
          }),
        },
      };
    case "city/rejected":
      return { ...state, isLoadingCity: false, errorCity: action.payload };
    case "currForecast/rejected":
      return {
        ...state,
        isLoadingCurrent: false,
        errorCurrent: action.payload,
      };
    case "5DayForecast/rejected":
      return { ...state, isLoading5Day: false, error5Day: action.payload };
    case "ownLocation/loaded":
      return { ...state, isOwnLocationLoaded: true };
    default:
      throw new Error("Unknown action type");
  }
}

function WeatherProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fiveDayForecast, currentCityCode } = state;
  const { temperatureUnit } = useUserSettings();
  const { ownPosition, getOwnPosition } = useGeolocation();
  const errorToast = useToastFactory();

  useEffect(() => {
    if (!API_KEY?.length)
      errorToast(
        "Missing or empty AccuWeather API Key. Provide it and reload the App"
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Execute only on the Provider's initial creation
  useEffect(() => {
    getOwnPosition();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCityByCoordinates(ownPosition.lat, ownPosition.lng);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownPosition]);

  useEffect(() => {
    const getCurrForController = new AbortController();

    async function getCurrentForecast() {
      dispatch({ type: "loadingCurrent" });

      try {
        // TODO Uncomment when possible
        const res = await fetch(
          `${BASE_ACCUWEATHER_URL}/currentconditions/v1/${currentCityCode}?apikey=${API_KEY}`,
          { signal: getCurrForController.signal }
        );

        // In this case we don't really care what the error message is.
        // Just want to use some good practices
        if (!res.ok) throw new ResponseError("Bad fetch response", res);

        const data = await res.json();

        // "data" is array containing single object
        dispatch({ type: "currForecast/loaded", payload: data[0] });
      } catch {
        dispatch({
          type: "currForecast/rejected",
          payload: "There was an error loading city's current forecast...",
        });
      }
    }

    const get5DayForController = new AbortController();
    async function get5DayForecast() {
      dispatch({ type: "loading5Day" });

      try {
        const res = await fetch(
          `${BASE_ACCUWEATHER_URL}/forecasts/v1/daily/5day/${currentCityCode}?apikey=${API_KEY}&metric=${
            temperatureUnit === "C"
          }`,
          { signal: get5DayForController.signal }
        );

        // In this case we don't really care what the error message is.
        // Just want to use some good practices
        if (!res.ok) throw new ResponseError("Bad fetch response", res);

        const data = await res.json();

        dispatch({ type: "5DayForecast/loaded", payload: data });
      } catch {
        dispatch({
          type: "5DayForecast/rejected",
          payload:
            "There was an error loading city's forecast for the next five days...",
        });
      }
    }

    // We do not care which one arrives first
    getCurrentForecast();
    get5DayForecast();

    return () => {
      getCurrForController.abort();
      get5DayForController.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCityCode]);

  useEffect(() => {
    if (!fiveDayForecast) return;

    dispatch({ type: "tempUnit/change", payload: temperatureUnit });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperatureUnit]);

  var getCityController;
  async function getCity(chunk) {
    if (getCityController) getCityController.abort();
    getCityController = new AbortController();

    dispatch({ type: "loadingCity" });

    try {
      const res = await fetch(
        `${BASE_ACCUWEATHER_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${chunk}`,
        { signal: getCityController.signal }
      );

      // In this case we don't really care what the error message is.
      // Just want to use some good practices
      if (!res.ok) throw new ResponseError("Bad fetch response", res);

      const data = await res.json();

      // Only the the first matched city because it has the highest rank
      if (!data.length || data[0]?.Key == null) {
        dispatch({ type: "city/rejected", payload: "Invalid location" });
        return;
      }

      // Simplify it to satisfy our needs
      const cityList = data.map((city) => {
        return {
          key: city?.Key,
          city: city?.LocalizedName,
          country: city?.Country?.LocalizedName,
          area: city?.AdministrativeArea?.LocalizedName,
        };
      });

      const highestRankedCity = cityList[0];

      dispatch({ type: "city/loaded", payload: highestRankedCity });
      dispatch({ type: "cityList/loaded", payload: cityList });
    } catch {
      dispatch({
        type: "city/rejected",
        payload: "There was an error loading the city...",
      });
    }
  }

  var getCityByCoordController;
  async function getCityByCoordinates(lat, lng) {
    if (getCityByCoordController) getCityByCoordController.abort();
    getCityByCoordController = new AbortController();

    // Checks if "null" or "undefined"
    if (lat == null || lng == null) return;

    try {
      const res = await fetch(
        `${BASE_ACCUWEATHER_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lng}`,
        { signal: getCityByCoordController.signal }
      );

      // In this case we don't really care what the error message is.
      // Just want to use some good practices
      if (!res.ok) throw new ResponseError("Bad fetch response", res);

      const data = await res.json();

      // Data could be null if coordinates are not on land
      if (data === null) {
        return;
      }

      const cityObj = {
        key: data?.Key,
        city: data?.LocalizedName,
        country: data?.Country?.LocalizedName,
        area: data?.AdministrativeArea?.LocalizedName,
      };

      dispatch({ type: "city/loaded", payload: cityObj });
      dispatch({ type: "ownLocation/loaded" });
    } catch {}
  }

  function updateCurrent(newCurrent) {
    if (newCurrent.key === currentCityCode) return;

    dispatch({ type: "city/loaded", payload: newCurrent });
  }

  return (
    <WeatherContext.Provider value={{ ...state, getCity, updateCurrent }}>
      {children}
    </WeatherContext.Provider>
  );
}

function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined)
    throw new Error("WeatherContext was used outside the WeatherProvider");
  return context;
}

export { WeatherProvider, useWeather };
