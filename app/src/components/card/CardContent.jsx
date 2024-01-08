import { CardContent as CardContentMui, Typography } from "@mui/material";

function CardContent({ temperature = "", details = "" }) {
  return (
    <CardContentMui>
      <Typography
        gutterBottom
        align="center"
        component="div"
        variant="text.primary"
      >
        {temperature}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {details}
      </Typography>
    </CardContentMui>
  );
}

export default CardContent;
