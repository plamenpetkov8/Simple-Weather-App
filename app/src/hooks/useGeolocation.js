import { useState } from "react";

import {
  GEOLOCATION_MAXIMUM_AGE,
  GEOLOCATION_TIMEOUT,
} from "../utils/constants";

export default function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [ownPosition, setOwnPosition] = useState({});
  const [error, setError] = useState(null);

  function getOwnPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOwnPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(`Unable to retrieve your location: ${error.message}`);
        setIsLoading(false);
      },
      {
        maximumAge: GEOLOCATION_MAXIMUM_AGE,
        timeout: GEOLOCATION_TIMEOUT,
        enableHighAccuracy: true,
      }
    );
  }

  return { isLoading, ownPosition, error, getOwnPosition };
}
