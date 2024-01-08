import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

import MainWeatherCard from "./MainWeatherCard";
import WeatherCardsList from "./WeatherCardsList";

import { useWeather } from "../../contexts/WeatherContext";
import { useToastFactory } from "../../contexts/UserSettingsContext";

function WeatherBody() {
  const { errorCity, errorCurrent, isLoadingCity, isLoadingCurrent } =
    useWeather();
  const errorToast = useToastFactory();

  useEffect(() => {
    if (errorCity) errorToast(errorCity);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorCity]);

  useEffect(() => {
    if (errorCurrent) errorToast(errorCurrent);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorCurrent]);

  return (
    <>
      {isLoadingCity ? (
        <CircularProgress />
      ) : errorCity ? null : (
        <>
          {isLoadingCurrent ? (
            <CircularProgress />
          ) : errorCurrent ? null : (
            <MainWeatherCard />
          )}

          <WeatherCardsList />
        </>
      )}
    </>
  );
}

export default WeatherBody;
