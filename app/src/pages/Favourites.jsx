import { Box } from "@mui/material";

import PageNav from "../components/PageNav";
import FavouritesList from "../components/favourites/FavouritesList";

function Favourites() {
  return (
    <Box sx={{ height: "100vh" }}>
      <PageNav />
      <FavouritesList />
    </Box>
  );
}

export default Favourites;
