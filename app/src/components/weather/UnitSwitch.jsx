import { useEffect, useState } from "react";
import { Stack, Switch, Typography } from "@mui/material";

import { useUserSettings } from "../../contexts/UserSettingsContext";

function UnitSwitch() {
  const { temperatureUnit, toggleTemperatureUnit } = useUserSettings();
  const [isChecked, setIsChecked] = useState(temperatureUnit !== "C");

  useEffect(() => {
    if (isChecked === (temperatureUnit !== "C")) return;

    setIsChecked(temperatureUnit !== "C");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperatureUnit]);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="h6">Celsius</Typography>
      <Switch
        checked={isChecked}
        onChange={(e) => {
          setIsChecked(e.target.checked);
          toggleTemperatureUnit();
        }}
      />
      <Typography variant="h6">Fahrenheit</Typography>
    </Stack>
  );
}

export default UnitSwitch;
