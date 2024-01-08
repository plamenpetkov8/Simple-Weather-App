import { Stack } from "@mui/material";

import UnitSwitch from "./UnitSwitch";
import WeatherInput from "./WeatherInput";
import WeatherBody from "./WeatherBody";

function WeatherMain() {
  return (
    <Stack
      spacing={5}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "90%" }}
    >
      <UnitSwitch />
      <WeatherInput />
      <WeatherBody />
    </Stack>
  );
}

export default WeatherMain;
