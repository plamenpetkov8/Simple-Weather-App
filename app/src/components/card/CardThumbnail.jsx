import { Box, CardMedia, Tooltip } from "@mui/material";
import { Fragment } from "react";

function CardThumbnail({ icons = [] }) {
  const spacer = <Box sx={{ flexGrow: 1 }} />;

  return (
    <CardMedia component="div" sx={{ display: "flex" }}>
      {spacer}
      {icons.map((icon) =>
        icon?.key ? (
          <Fragment key={icon.key}>
            <Tooltip title={`${icon.text}`}>
              <CardMedia
                component="img"
                alt={icon.alt}
                image={`/assets/${icon.code}.png`}
                sx={{ width: "auto" }}
              />
            </Tooltip>
            {spacer}
          </Fragment>
        ) : null,
      )}
    </CardMedia>
  );
}

export default CardThumbnail;
