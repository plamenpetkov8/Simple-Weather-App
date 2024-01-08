import { Box, CardMedia, Tooltip } from "@mui/material";

function CardThumbnail({ icons = [] }) {
  const spacer = <Box sx={{ flexGrow: 1 }} />;

  return (
    <CardMedia component="div" sx={{ display: "flex" }}>
      {spacer}
      {icons.map((icon) => {
        return (
          <>
            <Tooltip key={icon.code} title={`${icon.text}`}>
              <CardMedia
                component="img"
                alt={icon.alt}
                image={`/assets/${icon.code}.png`}
                sx={{ width: "auto" }}
              />
            </Tooltip>
            {spacer}
          </>
        );
      })}
    </CardMedia>
  );
}

export default CardThumbnail;
