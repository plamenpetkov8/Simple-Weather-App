import { Link, useLocation } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { useUserSettings } from "../contexts/UserSettingsContext";

function NavBtnsList() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useUserSettings();

  function handleRedirection(e) {
    if (pathname === e.target.pathname) e.preventDefault();
  }

  return (
    <Box>
      <IconButton onClick={toggleTheme} color="inherit">
        {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Button
        component={Link}
        to="/weather"
        onClick={handleRedirection}
        sx={{ color: "#fff" }}
      >
        Weather
      </Button>
      <Button
        component={Link}
        onClick={handleRedirection}
        to="/favourites"
        sx={{ color: "#fff" }}
      >
        Favourites
      </Button>
    </Box>
  );
}

export default NavBtnsList;
