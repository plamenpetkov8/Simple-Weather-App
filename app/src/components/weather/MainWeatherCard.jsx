import WeatherCard from "./WeatherCard";
import FavouritesButton from "../favourites/FavouritesButton";

import { useWeather } from "../../contexts/WeatherContext";
import { useUserSettings } from "../../contexts/UserSettingsContext";

function MainWeatherCard() {
  const { currentCity, currentArea, currentCountry, currentForecast } =
    useWeather();
  const { temperatureUnit } = useUserSettings();

  // Derived States
  const displayLocation = `${currentCity}, ${currentArea}, ${currentCountry}`;
  const heading = displayLocation;

  const icons = [
    {
      text: "Current Weather",
      key: currentForecast?.EpochTime,
      alt: currentForecast?.WeatherText,
      code: currentForecast?.WeatherIcon,
    },
  ];

  const temperature = `${Math.round(
    currentForecast?.Temperature[
      temperatureUnit === "C" ? "Metric" : "Imperial"
    ]?.Value
  )}\xB0${temperatureUnit}`;

  const details = currentForecast?.WeatherText;
  const headingAction = <FavouritesButton />;

  return (
    <WeatherCard
      heading={heading}
      headingAction={headingAction}
      icons={icons}
      temperature={temperature}
      details={details}
    />
  );
}

export default MainWeatherCard;
