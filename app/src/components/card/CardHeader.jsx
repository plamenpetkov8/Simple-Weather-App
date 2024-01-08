import { CardHeader as CardHeaderMui } from "@mui/material";
function CardHeader({ heading = "", headingAction = null }) {
  return (
    <CardHeaderMui
      align="center"
      title={`${heading}`}
      action={headingAction}
      titleTypographyProps={{ variant: "h5" }}
    />
  );
}

export default CardHeader;
