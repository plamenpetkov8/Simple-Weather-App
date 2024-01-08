import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { NavLink as ReactRouterLink } from "react-router-dom";

import { useFavourites } from "../../contexts/FavouritesContext";
import { useUserSettings } from "../../contexts/UserSettingsContext";

function FavouritesListItem({ data }) {
  const { id, city, country, area, forecast } = data;
  const { WeatherText, WeatherIcon, EpochTime, Temperature } = forecast;
  const { Metric, Imperial } = Temperature;
  const { Value: CelsiusValue } = Metric;
  const { Value: FahrenheitValue } = Imperial;
  const { temperatureUnit } = useUserSettings();
  const { selectFavourite } = useFavourites();

  // Derived state
  const displayName = `${city}, ${area}, ${country}`;

  function handleOnClick() {
    const selectedItem = {
      key: id,
      city: city,
      country: country,
      area: area,
    };

    selectFavourite(selectedItem);
  }

  return (
    <ListItemButton
      component={ReactRouterLink}
      replace
      to={`/weather/${id}?city=${city}&area=${area}&country=${country}`}
      onClick={handleOnClick}
      alignItems="flex-start"
    >
      <ListItemAvatar>
        <Avatar
          alt={`${WeatherText}`}
          src={`/assets/${WeatherIcon}.png`}
          key={`favourite${EpochTime}`}
        />
      </ListItemAvatar>
      <ListItemText
        primary={`${displayName}`}
        secondary={`${Math.round(
          temperatureUnit === "C" ? CelsiusValue : FahrenheitValue
        )}\xB0${temperatureUnit}`}
      />
    </ListItemButton>
  );
}

export default FavouritesListItem;
