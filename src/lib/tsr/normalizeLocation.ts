import { Location } from "history";
import { RouterLocation } from "./Route";

export function normalizeLocation(location: Location): RouterLocation {
  return (location.pathname + location.search) as RouterLocation;
}
