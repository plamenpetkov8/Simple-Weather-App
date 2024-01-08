import { Box, Tooltip } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

import { useNavigate } from "react-router-dom";
import { useFavourites } from "../../contexts/FavouritesContext";
import { useWeather } from "../../contexts/WeatherContext";

function FavouriteButton() {
  const {
    currentCity,
    currentArea,
    currentForecast,
    currentCityCode,
    currentCountry,
  } = useWeather();
  const navigate = useNavigate();
  const { favourites, addFavourite, removeFavourite } = useFavourites();

  const isFavourite = favourites.some((item) => item.id === currentCityCode);
  function handleFavouriteToggle() {
    if (isFavourite) removeFavourite(currentCityCode);
    else {
      addFavourite({
        city: currentCity,
        id: currentCityCode,
        country: currentCountry,
        area: currentArea,
        forecast: currentForecast,
      });

      navigate("/favourites");
    }
  }
  return (
    <Box onClick={handleFavouriteToggle} sx={{ cursor: "pointer" }}>
      {(isFavourite && (
        <Tooltip title="Remove from Favourites" placement="right">
          <StarRateRoundedIcon color="warning" fontSize="large" />
        </Tooltip>
      )) || (
        <Tooltip title="Add to Favourites">
          <StarBorderRoundedIcon color="warning" fontSize="large" />
        </Tooltip>
      )}
    </Box>
  );
}

export default FavouriteButton;
