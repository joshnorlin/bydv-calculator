export type InputDataType = {
  location: 'sparec' | 'rusty' | 'warsaw'
  plantingDate: 'sept-oct' | 'oct-nov' | 'nov-dec' | null
}

/* ----------------------------------------------- */

const HasNotPlantedTreatments = [
  "cont",
  "neon",
  "fallApp",
  "springApp",
  "neonFallApp",
  "neonSpringApp"
]

const HasPlantedTreatments = [
  "cont",
  "fallApp",
  "springApp"
]

export const TreatmentList = {
  HasNotPlantedTreatments,
  HasPlantedTreatments
}

/* ----------------------------------------------- */

export type ConfigType = {
  "bushelPrice": number,
  treatmentCostsPerAcre: {
    [treatment: string]: number
  },
  treatmentProfitsPerAcre: {
    [location: string]: {
      [date: string]: {
        [treatment: string]: number
      }
    }
  }
};