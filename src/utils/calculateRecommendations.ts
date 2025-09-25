import { allTreatmentOptions, plantedTreatmentOptions, plantingDateOptions, type ConfigType, type InputDataType } from "../types/types";

export function calculateRecommendations(
  inputData: InputDataType,
  config: ConfigType
) {
  const location = inputData.location;
  if (!location) return [];

  // User has not planted
  if (inputData.plantingStatus === "not-planted") {
    return plantingDateOptions.flatMap(date =>
      allTreatmentOptions.map(treatment => ({
        date, // guaranteed string
        treatment,
        profit: config.treatmentProfitsPerAcre[location][date][treatment] ?? 0, // guaranteed number
      }))
    );
  }

  // User has planted
  if (inputData.plantingStatus === "planted" && inputData.plantingDate) {
    const date = inputData.plantingDate; // TS knows this is not null
    return plantedTreatmentOptions.map(treatment => ({
      date,
      treatment,
      profit: config.treatmentProfitsPerAcre[location][date][treatment] ?? 0, // guaranteed number
    }));
  }

  return [];
}
