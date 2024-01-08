import {
  ThemeProvider as ThemeProviderMui,
  createTheme,
} from "@mui/material/styles";
import { useMemo } from "react";

import { useUserSettings } from "./UserSettingsContext";

function ThemeProvider({ children }) {
  const { theme: mode } = useUserSettings();
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return <ThemeProviderMui theme={theme}>{children}</ThemeProviderMui>;
}

export default ThemeProvider;
