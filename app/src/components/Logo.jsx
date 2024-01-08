import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleRedirection(e) {
    if (pathname === "/weather") e.preventDefault();
    else navigate("/weather");
  }

  return (
    <Typography
      variant="h6"
      component="div"
      sx={{
        cursor: "pointer",
        display: { xs: "none", sm: "block" },
      }}
      onClick={handleRedirection}
    >
      Weather App
    </Typography>
  );
}

export default Logo;
