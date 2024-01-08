import { CssBaseline } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Weather from "./pages/Weather";
import Favourites from "./pages/Favourites";
import { WeatherProvider } from "./contexts/WeatherContext";
import { FavouritesProvider } from "./contexts/FavouritesContext";
import ThemeProvider from "./contexts/ThemeContext";
import { UserSettingsProvider } from "./contexts/UserSettingsContext";
import ToastContainer from "./components/ToastContainer";

function App() {
  return (
    <>
      <UserSettingsProvider>
        <ThemeProvider>
          <CssBaseline />
          <FavouritesProvider>
            <WeatherProvider>
              <BrowserRouter>
                <Routes>
                  <Route index element={<Navigate replace to="weather" />} />
                  <Route path="weather" element={<Weather />} />
                  <Route path="weather/:id" element={<Weather />} />
                  <Route path="favourites" element={<Favourites />} />
                </Routes>
              </BrowserRouter>
            </WeatherProvider>
          </FavouritesProvider>
        </ThemeProvider>
      </UserSettingsProvider>
      <ToastContainer />
    </>
  );
}

export default App;
