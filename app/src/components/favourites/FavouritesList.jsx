import { CircularProgress, List } from "@mui/material";

import { useFavourites } from "../../contexts/FavouritesContext";
import FavouritesListItem from "./FavouritesListItem";

function FavouritesList() {
  const { favourites, isLoading } = useFavourites();

  return isLoading ? (
    <CircularProgress />
  ) : (
    <List
      sx={{
        bgcolor: "background.paper",
      }}
    >
      {favourites.map((item) => (
        <FavouritesListItem data={item} />
      ))}
    </List>
  );
}

export default FavouritesList;
