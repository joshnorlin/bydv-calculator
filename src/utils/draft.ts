import type { InputDataType } from "../types/types";
import { plantedTreatmentOptions, allTreatmentOptions } from "../types/types";
import {
  BUSHEL_PRICE_IN_DOLLARS,
  NEONICOTINOID_SEED_MARGINAL_COST_PER_ACRE_IN_DOLLARS,
  WARRIOR_II_TOTAL_COST_PER_ACRE_IN_DOLLARS,
  COMBINED_TREATMENT_COST_PER_ACRE_IN_DOLLARS,
} from "../config/constants";

export function draft(
  inputData: InputDataType,
  config: any
) {
  // Prefer user-entered bushel price, fallback to constant
  const bushelPrice = inputData.bushelPrice ?? BUSHEL_PRICE_IN_DOLLARS;

  // Treatment cost lookup based on imported constants
  const treatmentCost: Record<string, number> = {
    cont: 0,
    neon: NEONICOTINOID_SEED_MARGINAL_COST_PER_ACRE_IN_DOLLARS,
    fallApp: WARRIOR_II_TOTAL_COST_PER_ACRE_IN_DOLLARS,
    springApp: WARRIOR_II_TOTAL_COST_PER_ACRE_IN_DOLLARS,
    neonFallApp: COMBINED_TREATMENT_COST_PER_ACRE_IN_DOLLARS,
    neonSpringApp: COMBINED_TREATMENT_COST_PER_ACRE_IN_DOLLARS,
  };

  // Our data in config currently stores yields, not profits.
  // Cast to access the JSON shape safely.
  const yieldsByLocation = (config as unknown as {
    yieldInBushelsPerAcre: Record<string, Record<string, Record<string, number | null>>>;
  }).yieldInBushelsPerAcre;

  const location = inputData.location;
  if (!location) {
    return {};
  }

  const dates = yieldsByLocation?.[location];
  if (!dates) {
    return { [location]: {} };
  }

  // Determine which treatments to compute based on plantingStatus
  const allowedTreatments = inputData.plantingStatus === 'planted'
    ? new Set(plantedTreatmentOptions as readonly string[])
    : new Set(allTreatmentOptions as readonly string[]);

  const resultForLocation: Record<string, Record<string, number | null>> = {};

  for (const [date, treatments] of Object.entries(dates)) {
    resultForLocation[date] = {};

    // Compute baseline: profit for 'cont' (do nothing)
    const contYield = treatments["cont"] as number | null | undefined;
    const contProfit =
      contYield === null || contYield === undefined
        ? null
        : contYield * bushelPrice; // cont has zero cost

    for (const [treatment, yieldBushels] of Object.entries(treatments)) {
      if (!allowedTreatments.has(treatment)) continue;

      if (yieldBushels === null || yieldBushels === undefined) {
        resultForLocation[date][treatment] = null;
        continue;
      }

      const revenue = yieldBushels * bushelPrice;
      const cost = treatmentCost[treatment] ?? 0;
      const absProfit = revenue - cost;
      const relProfit = contProfit == null ? null : absProfit - contProfit;
      resultForLocation[date][treatment] =
        relProfit != null && Number.isFinite(relProfit) ? relProfit : null;
    }
  }

  return { [location]: resultForLocation };
}