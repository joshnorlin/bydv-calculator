export const locationOptions = ['warsaw', 'sparec', 'rusty', 'not-applicable'] as const;
export type LocationType = typeof locationOptions[number] | null;

export const plantingDateOptions = ['sept-oct', 'oct-nov', 'nov-dec'] as const;
export type PlantingDateType = typeof plantingDateOptions[number] | null;

export const plantingDateOptionLabels: Record<string, string> = {
    "sept-oct": "September - October",
    "oct-nov": "October - November",
    "nov-dec": "November - December",
};

export const plantingStatusOptions = ['planted', 'not-planted', 'not-farmer'] as const;
export type PlantingStatusType = typeof plantingStatusOptions[number] | null;

export const plantingStatusOptionLabels: Record<string, string> = {
    "planted": "Yes, I have planted",
    "not-planted": "No, I have not planted yet",
    "not-farmer": "I'm not a farmer",
};

export type InputDataType = {
  location: LocationType;
  plantingStatus: PlantingStatusType;
  plantingDate: PlantingDateType;
  bushelPrice: number;
}

/* ----------------------------------------------- */

export const allTreatmentOptions = [
  "cont",
  "neon",
  "fallApp",
  "springApp",
  "neonFallApp",
  "neonSpringApp"
]

export const plantedTreatmentOptions = [
  "cont",
  "fallApp",
  "springApp"
]

export const TreatmentOptionLabels: Record<AllTreatmentType, string> = {
  "cont": "Continue doing nothing",
  "neon": "Neonicotinoid seed coating",
  "fallApp": "Foliar spray in fall",
  "springApp": "Foliar spray in spring",
  "neonFallApp": "Neonicotinoid seed coating with fall foliar spray",
  "neonSpringApp": "Neonicotinoid seed coating with spring foliar spray"
};

export type AllTreatmentType = typeof allTreatmentOptions[number];
export type PlantedTreatmentType = typeof plantedTreatmentOptions[number];

/* ----------------------------------------------- */

export type RecommendationType<Treatment extends string> = {
  date: PlantingDateType;
  treatment: Treatment;
  profit: number | null;
};

/* ----------------------------------------------- */

export type CountyObjectType = {
  id: number;
  county: string;
  latitude: number,
  longitude: number,
  sparec_dist_in_km: number,
  rusty_dist_in_km: number,
  warsaw_dist_in_km: number,
}