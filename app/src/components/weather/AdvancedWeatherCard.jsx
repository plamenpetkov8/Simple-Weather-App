import { useUserSettings } from "../../contexts/UserSettingsContext";
import WeatherCard from "./WeatherCard";

function AdvancedWeatherCard({ forecast }) {
  const { temperatureUnit } = useUserSettings();

  const dayObj = new Date(forecast?.Date);
  const heading = `${dayObj.toDateString()}`;
  const icons = [
    {
      key: "day" + forecast?.EpochDate,
      text: "Day Weather",
      code: forecast?.Day?.Icon,
      alt: forecast?.Day?.IconPhrase,
    },
    {
      key: "night" + forecast?.EpochDate,
      text: "Night Weather",
      code: forecast?.Night?.Icon,
      alt: forecast?.Night?.IconPhrase,
    },
  ];

  const minTemp = Math.round(forecast?.Temperature?.Minimum?.Value);
  const maxTemp = Math.round(forecast?.Temperature?.Maximum?.Value);
  const temperature = `${minTemp}\xB0${temperatureUnit} - ${maxTemp}\xB0${temperatureUnit}`;
  const details = (
    <>
      <span>
        <strong>Day:</strong> {forecast?.Day?.IconPhrase}
      </span>
      <br />
      <span>
        <strong>Night:</strong> {forecast?.Night?.IconPhrase}
      </span>
    </>
  );

  return (
    <WeatherCard
      heading={heading}
      icons={icons}
      temperature={temperature}
      details={details}
    />
  );
}

export default AdvancedWeatherCard;
