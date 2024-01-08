import { createContext, useContext, useEffect, useReducer } from "react";

import { ResponseError } from "../utils/errors";
import { DEFAULT_PORT } from "../utils/constants";

const FavouritesContext = createContext();
const initialState = {
  favourites: [],
  isLoading: false,
  selectedFavourite: null,
  error: null,
};

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || DEFAULT_PORT;
function reducer(state, action) {
  switch (action.type) {
    case "favourite/added":
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
        error: null,
      };
    case "favourite/removed":
      return {
        ...state,
        favourites: state.favourites.filter(
          (item) => item.id !== action.payload
        ),
        error: null,
      };
    case "loadingFavourites":
      return { ...state, isLoading: true };
    case "favourites/loaded":
      return {
        ...state,
        favourites: action.payload,
        isLoading: false,
        error: null,
      };
    case "favourite/selected":
      return { ...state, selectedFavourite: action.payload };
    case "favourite/reset":
      return { ...state, selectedFavourite: null };
    case "error":
      let newState = { ...state, error: action.payload.data };
      if (action.payload.abortLoading) {
        newState = { ...newState, isLoading: false };
      }

      return newState;
    default:
      throw new Error("Unknown action type");
  }
}

function FavouritesProvider({ children }) {
  const [{ favourites, isLoading, selectedFavourite, error }, dispatch] =
    useReducer(reducer, initialState);

  // Preload list of favourites if there are some stored in our MongoDB Atlas cloud
  useEffect(() => {
    async function getFavourites() {
      try {
        dispatch({ type: "loadingFavourites" });

        const res = await fetch(
          `http://localhost:${SERVER_PORT}/favourites/get`
        );

        // In this case we don't really care what the error message is.
        // Just want to use some good practices
        if (!res.ok) throw new ResponseError("Bad fetch response", res);

        const resData = await res.json();

        dispatch({ type: "favourites/loaded", payload: resData.data });
      } catch {
        dispatch({
          type: "error",
          payload: {
            abortLoading: true,
            data: "There was an error loading favourites list from Db...",
          },
        });
      }
    }

    getFavourites();
  }, []);

  // Proxy effect happening each time the "favourite" array gets changed somehow
  useEffect(() => {
    async function updateFavourites() {
      try {
        const res = await fetch(
          `http://localhost:${SERVER_PORT}/favourites/update`,
          {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(favourites),
          }
        );

        // In this case we don't really care what the error message is.
        // Just want to use some good practices
        if (!res.ok) throw new ResponseError("Bad fetch response", res);
      } catch {
        dispatch({
          type: "error",
          payload: {
            abortLoading: false,
            data: "There was an error updating favourites list in Db...",
          },
        });
      }
    }
    updateFavourites();
  }, [favourites]);

  function addFavourite(newItem) {
    // Already added
    if (favourites.some((item) => item.id === newItem.id)) return;

    // Should have "id", "name" and "current weather"
    dispatch({ type: "favourite/added", payload: newItem });
  }

  function removeFavourite(itemId) {
    dispatch({ type: "favourite/removed", payload: itemId });
  }

  function selectFavourite(favourite) {
    dispatch({ type: "favourite/selected", payload: favourite });
  }

  function resetFavourite() {
    dispatch({ type: "favourite/reset" });
  }

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        isLoading,
        selectedFavourite,
        error,
        addFavourite,
        removeFavourite,
        selectFavourite,
        resetFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

function useFavourites() {
  const context = useContext(FavouritesContext);
  if (context === undefined)
    throw new Error(
      "FavouritesContext was used outside the FavouritesProvider"
    );
  return context;
}

export { FavouritesProvider, useFavourites };
