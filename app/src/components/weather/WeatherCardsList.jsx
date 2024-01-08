import { useEffect } from "react";
import { CircularProgress, Stack } from "@mui/material";

import { useWeather } from "../../contexts/WeatherContext";
import AdvancedWeatherCard from "./AdvancedWeatherCard";
import { useToastFactory } from "../../contexts/UserSettingsContext";
import { WEATHER_CARD_LIST_MINHEIGHT } from "../../utils/constants";

function WeatherCardsList() {
  const { error5Day, isLoading5Day, fiveDayForecast } = useWeather();
  const errorToast = useToastFactory();

  // Derived states
  const forecasts = fiveDayForecast?.DailyForecasts;

  useEffect(() => {
    if (error5Day) errorToast(error5Day);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error5Day]);

  return isLoading5Day ? (
    <CircularProgress />
  ) : error5Day ? null : (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        minHeight: WEATHER_CARD_LIST_MINHEIGHT,
      }}
    >
      {forecasts?.map((forecast) => (
        <AdvancedWeatherCard key={forecast?.EpochDate} forecast={forecast} />
      ))}
    </Stack>
  );
}

export default WeatherCardsList;
