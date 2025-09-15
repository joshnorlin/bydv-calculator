import type { ConfigType } from '../types/types';
import type { InputDataType } from '../types/types';
import { TreatmentList } from '../types/types';

// Returns an array of recommendation objects: { date, treatment, profit }
export function calculateRecommendations(inputData: InputDataType, config: ConfigType) {
  const location = inputData.location;
  if (!location) return [];

  // User has not planted: all date ranges, all treatments
  if (inputData.plantingDate === null) {
    const allDateRanges = Object.keys(config.treatmentProfitsPerAcre[location]);
    const allTreatments = TreatmentList.HasNotPlantedTreatments;
    return allDateRanges.flatMap(date =>
      allTreatments.map(treatment => ({
        date,
        treatment,
        profit: config["treatmentProfitsPerAcre"][location][date][treatment] ?? null,
      }))
    );
  }

  // User has planted: only 1 date range, 3 treatments
  const plantedTreatments = TreatmentList.HasPlantedTreatments;
  const date = inputData.plantingDate;
  return plantedTreatments.map(treatment => ({
    date,
    treatment,
    profit: config["treatmentProfitsPerAcre"][location][date][treatment] ?? null,
  }));
}