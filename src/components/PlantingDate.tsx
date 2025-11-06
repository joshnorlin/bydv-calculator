import { Card, CardContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { setPlantingDate } from "../store/userDecisionSlice";
import { plantingDateOptions, plantingDateOptionLabels, type PlantingDateType, type PlantingStatusType } from "../types/types";

export function PlantingDate() {
  const dispatch = useDispatch();
  const plantingDate = useSelector((state: RootState) => state.userDecision.plantingDate);
  
  // For conditional rendering.
  const plantingStatus = useSelector((state: RootState) => state.userDecision.plantingStatus);

  const plantingStatusIsPlanted = (plantingStatus: PlantingStatusType) => {
    if (plantingStatus === 'planted') return true;
    else return false;
  }

  if (plantingStatusIsPlanted(plantingStatus)) {
    return (
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>When did you plant?</FormLabel>
            <RadioGroup
              value={plantingDate}
              onChange={(e) => {dispatch(setPlantingDate(e.target.value as PlantingDateType))}}
            >
              {plantingDateOptions.map(option => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={plantingDateOptionLabels[option] ?? option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    )
  } else {
    return (
      <div></div>
    )
  }
}