import { Box } from "@mui/material";

import PageNav from "../components/PageNav";
import WeatherMain from "../components/weather/WeatherMain";

function Weather() {
  return (
    <Box sx={{ height: "100vh" }}>
      <PageNav />
      <WeatherMain />
    </Box>
  );
}

export default Weather;
