import { DEFAULT_MAX_RADIUS_KM } from "../config/constants";
import type { CountyObjectType, LocationType } from "../types/types";

type LocationKey = "sparec" | "rusty" | "warsaw";

/* simple memo cache keyed by "countyName::maxRadius" */
const matchCountyCache = new Map<string, LocationType>();

export function clearMatchCountyCache() {
  matchCountyCache.clear();
}

export function matchCounty(
  selectedOption: string | undefined,
  countyList: ReadonlyArray<CountyObjectType>,
  maxRadiusKm: number = DEFAULT_MAX_RADIUS_KM
): LocationType {
  if (selectedOption === undefined) return null;

  const cacheKey = `${selectedOption}::${maxRadiusKm}`;
  if (matchCountyCache.has(cacheKey)) {
    return matchCountyCache.get(cacheKey) ?? null;
  }

  const match = countyList.find(c => c.county === selectedOption);
  if (!match) {
    matchCountyCache.set(cacheKey, null);
    return null;
  }

  const toNum = (v: unknown) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : Infinity;
  };

  const distances: Record<LocationKey, number> = {
    sparec: toNum(match.sparec_dist_in_km),
    rusty: toNum(match.rusty_dist_in_km),
    warsaw: toNum(match.warsaw_dist_in_km),
  };

  const entries = Object.entries(distances) as [LocationKey, number][];
  const [closestKey, closestDistance] = entries.reduce((a, b) => (a[1] <= b[1] ? a : b));

  let result: LocationType;
  if (closestDistance === Infinity) result = null;
  else if (closestDistance > maxRadiusKm) result = "not-applicable";
  else result = closestKey;

  matchCountyCache.set(cacheKey, result);
  return result;
}
