import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { setPlantingStatus } from "../../store/userDecisionSlice";
import { plantingStatusOptions, plantingStatusOptionLabels, type PlantingStatusType, type LocationType } from "../../types/types";
import { FormFieldCard } from "./FormFieldCard";
import { useHighlightedField } from "./FormProgress";

export function PlantingStatus() {
  const dispatch = useDispatch();
  const selectedPlantingStatus = useSelector((state: RootState) => state.userDecision.plantingStatus);
  const location = useSelector((state: RootState) => state.userDecision.location);
  const highlightedField = useHighlightedField();
  const isHighlighted = highlightedField === "plantingStatus";

  const locationIsApplicable = (location: LocationType) => {
    if (
      location === 'rusty' ||
      location === 'warsaw' ||
      location === 'sparec'
    ) { 
      return true; 
    } else {
      return false;
    } 
  }

  if (locationIsApplicable(location)) {
    return (
      <FormFieldCard
        title="Step 2: Have you planted?"
        description="Let us know your planting status so we can provide season-specific recommendations."
        isHighlighted={isHighlighted}
        infoMessage="Your answer affects which management options are available for your field."
      >
        <FormControl fullWidth>
          <RadioGroup 
            value={selectedPlantingStatus || ''}
            onChange={(e) => {dispatch(setPlantingStatus(e.target.value as PlantingStatusType))}}
          >
            {plantingStatusOptions.map(option => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={plantingStatusOptionLabels[option] ?? option}
                sx={{ mb: 1 }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </FormFieldCard>
    );
  } else {
    return null;
  }
}