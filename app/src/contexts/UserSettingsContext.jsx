import { toast } from "react-toastify";
import { createContext, useContext, useEffect, useReducer } from "react";

import { ResponseError } from "../utils/errors";
import {
  DEFAULT_PORT,
  DEFAULT_TEMPERATURE_UNIT,
  DEFAULT_THEME,
  TOAST_OPTIONS,
} from "../utils/constants";

const UserSettingsContext = createContext();

var toastRefArray = [];
const initialState = {
  theme: DEFAULT_THEME,
  temperatureUnit: DEFAULT_TEMPERATURE_UNIT,
};

function reducer(state, action) {
  switch (action.type) {
    case "userSettings/loaded":
      return {
        ...state,
        theme: action.payload.theme,
        temperatureUnit: action.payload.temperatureUnit,
      };
    case "tempUnit/toggle":
      return {
        ...state,
        temperatureUnit: state.temperatureUnit === "C" ? "F" : "C",
      };
    case "theme/toggle":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    default:
      throw new Error("Unknown action type");
  }
}

var SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
console.log("VITE SERVER PORT");
console.log(SERVER_PORT);

SERVER_PORT = SERVER_PORT || DEFAULT_PORT;
function UserSettingsProvider({ children }) {
  const [{ theme, temperatureUnit }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const errorToast = useToastFactory();

  // Preload User Settings if there are some stored in our MongoDB Atlas cloud
  useEffect(() => {
    async function getUserSettings() {
      try {
        const res = await fetch(
          `http://localhost:${SERVER_PORT}/userSettings/get`
        );

        // In this case we don't really care what the error message is.
        // Just want to use some good practices
        if (!res.ok) throw new ResponseError("Bad fetch response", res);

        const resData = await res.json();

        // On initial load it is null. Use Context's defaults.
        if (!resData.data) {
          return;
        }

        dispatch({ type: "userSettings/loaded", payload: resData.data });
      } catch {
        errorToast("There was an error loading the User Settings from Db...");
      }
    }

    getUserSettings();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function updateUserSettings() {
      try {
        const res = await fetch(
          `http://localhost:${SERVER_PORT}/userSettings/update`,
          {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ theme, temperatureUnit }),
          }
        );

        // In this case we don't really care what the error message is.
        // Just want to use some good practices
        if (!res.ok) throw new ResponseError("Bad fetch response", res);
      } catch {
        errorToast("There was an error updating the User Settings in Db...");
      }
    }

    updateUserSettings();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, temperatureUnit]);

  // Synchronize all toasters' theme with App's theme
  useEffect(() => {
    toastRefArray.forEach((toastRef) =>
      toast.update(toastRef, { theme: theme })
    );
  }, [theme]);

  function toggleTemperatureUnit() {
    dispatch({ type: "tempUnit/toggle" });
  }

  function toggleTheme() {
    dispatch({ type: "theme/toggle" });
  }

  return (
    <UserSettingsContext.Provider
      value={{
        theme,
        temperatureUnit,
        toggleTemperatureUnit,
        toggleTheme,
        errorToast,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
}

function useToastFactory() {
  const context = useContext(UserSettingsContext);
  let appTheme = "dark";
  if (context !== undefined) {
    appTheme = context.theme;
  }

  function errorToast(message) {
    const toastId = toast.error(message, {
      ...TOAST_OPTIONS,
      theme: appTheme,
    });
    toastRefArray.push(toastId);
  }

  return errorToast;
}

function useUserSettings() {
  const context = useContext(UserSettingsContext);
  if (context === undefined)
    throw new Error(
      "UserSettingsContext was used outside the UserSettingsProvider"
    );
  return context;
}

export { UserSettingsProvider, useUserSettings, useToastFactory };
