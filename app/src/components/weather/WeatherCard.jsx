import { Card } from "@mui/material";

import CardHeader from "../card/CardHeader";
import CardContent from "../card/CardContent";
import CardThumbnail from "../card/CardThumbnail";
import { WEATHER_CARD_STYLES } from "../../utils/constants";

function WeatherCard({ heading, headingAction, icons, temperature, details }) {
  return (
    <Card sx={WEATHER_CARD_STYLES}>
      <CardHeader heading={heading} headingAction={headingAction} />
      <CardThumbnail icons={icons} />
      <CardContent temperature={temperature} details={details} />
    </Card>
  );
}

export default WeatherCard;
