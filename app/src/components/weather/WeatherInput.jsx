import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Box, TextField } from "@mui/material";

import { useWeather } from "../../contexts/WeatherContext";
import { useFavourites } from "../../contexts/FavouritesContext";
import usePreloadedLocation from "../../hooks/usePreloadedLocation";
import { ENGLISH_ALPHABET_FILTER } from "../../utils/constants";

function WeatherInput() {
  const {
    currentCode,
    currentArea,
    currentCity,
    currentCountry,
    cityList,
    getCity,
    updateCurrent,
    isOwnLocationLoaded,
  } = useWeather();

  // These are private dedicated states. There is no need to
  // manage them with the global reducer
  // const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState(currentCity);
  const [options, setOptions] = useState(cityList);
  const { getPreloadedLocation, isLocationPreloaded } = usePreloadedLocation();
  const navigate = useNavigate();

  const { selectedFavourite, resetFavourite } = useFavourites();

  // We want to apply this effect only once upon apps loading
  useEffect(() => {
    if (selectedFavourite || !isLocationPreloaded()) return;

    const prelLocObj = getPreloadedLocation();
    setInputValue(prelLocObj.city);

    setOptions([prelLocObj]);
    updateCurrent(prelLocObj);

    // Reset the URL
    navigate("/weather");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOptions(cityList);
  }, [cityList]);

  // Try to load own location only if there isn't any other preloaded location
  useEffect(() => {
    if (!isLocationPreloaded() && isOwnLocationLoaded) {
      // setValue(currentCity);
      setInputValue(currentCity);
      setOptions([
        {
          key: currentCode,
          area: currentArea,
          city: currentCity,
          country: currentCountry,
        },
      ]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOwnLocationLoaded]);

  // When jumping in from the "Favourites" page using a link
  useEffect(() => {
    if (selectedFavourite) {
      setInputValue(selectedFavourite.city);
      setOptions([selectedFavourite]);

      // "onChange" is not triggered when updating input's value programaticaly
      updateCurrent(selectedFavourite);
      resetFavourite();
    }
  }, [selectedFavourite, resetFavourite, updateCurrent]);

  function handleInputChange(e, newInputValue) {
    if (!e) return;

    const inputCharacter = e.nativeEvent?.data;

    // "inputCharacter === null" means that a character got deleted
    const isValid =
      inputCharacter == null ||
      inputCharacter.search(ENGLISH_ALPHABET_FILTER) !== -1;
    if (!isValid) return;

    const loc = newInputValue;
    setInputValue(loc);

    const locTrimmed = loc.trim();
    if (locTrimmed.length > 0) getCity(loc.trim());

    // Reset the URL
    navigate("/weather");
  }

  return (
    <Autocomplete
      freeSolo={true}
      handleHomeEndKeys={true}
      noOptionsText="No suggestions"
      onChange={(event, newValue, reason) => {
        if (reason === "selectOption") {
          updateCurrent(newValue);

          // Reset the URL
          navigate("/weather");
        }
      }}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      getOptionKey={(option) => option.key + option.city}
      getOptionLabel={(option) => {
        return option.city;
      }}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.city}, {option.area}, {option.country}
        </Box>
      )}
      options={options}
      sx={{ width: "50%" }}
      renderInput={(params) => (
        <TextField
          {...params}
          autoFocus={true}
          color="primary"
          variant="outlined"
          placeholder="Search for city ..."
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default WeatherInput;
