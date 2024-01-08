import { useLocation, useParams, useSearchParams } from "react-router-dom";

export default function usePreloadedLocation() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  // Derived states
  const city = searchParams.get("city");
  const area = searchParams.get("area");
  const country = searchParams.get("country");

  function getPreloadedLocation() {
    const prelLocObj = { key: id, city: city, country: country, area: area };
    return prelLocObj;
  }

  function isLocationPreloaded() {
    if (pathname.split("/").length > 3) return false;
    if (isNaN(Number(id))) return false;
    if (!city || !area || !country) return false;

    return true;
  }

  return { getPreloadedLocation, isLocationPreloaded };
}
