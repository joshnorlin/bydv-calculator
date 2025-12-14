import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { setPlantingDate } from "../../store/userDecisionSlice";
import { plantingDateOptions, plantingDateOptionLabels, type PlantingDateType, type PlantingStatusType } from "../../types/types";
import { FormFieldCard } from "./FormFieldCard";
import { useHighlightedField } from "./FormProgress";

export function PlantingDate() {
  const dispatch = useDispatch();
  const plantingDate = useSelector((state: RootState) => state.userDecision.plantingDate);
  const plantingStatus = useSelector((state: RootState) => state.userDecision.plantingStatus);
  const highlightedField = useHighlightedField();
  const isHighlighted = highlightedField === "plantingDate";

  const plantingStatusIsPlanted = (plantingStatus: PlantingStatusType) => {
    if (plantingStatus === 'planted') return true;
    else return false;
  }

  if (plantingStatusIsPlanted(plantingStatus)) {
    return (
      <FormFieldCard
        title="Step 3: When did you plant?"
        description="Select the planting window that matches your field. This helps us estimate the risk period for your crop."
        isHighlighted={isHighlighted}
        infoMessage="Earlier plantings face different aphid pressure than later ones."
      >
        <FormControl fullWidth>
          <RadioGroup
            value={plantingDate || ''}
            onChange={(e) => {dispatch(setPlantingDate(e.target.value as PlantingDateType))}}
          >
            {plantingDateOptions.map(option => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={plantingDateOptionLabels[option] ?? option}
                sx={{ mb: 1 }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </FormFieldCard>
    )
  } else {
    return null;
  }
}