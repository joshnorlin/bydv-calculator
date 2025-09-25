import { Card, CardContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { setPlantingStatus } from "../store/userDecisionSlice";
import { plantingStatusOptions, plantingStatusOptionLabels, type PlantingStatusType } from "../types/types";

export function PlantingStatus() {
  const dispatch = useDispatch();
  const selectedPlantingStatus = useSelector((state: RootState) => state.userDecision.plantingStatus);

  return (
    <Card>
      <CardContent>
        <FormControl>
          <FormLabel>Have you planted?</FormLabel>
          <RadioGroup 
            value={selectedPlantingStatus}
            onChange={(e) => {dispatch(setPlantingStatus(e.target.value as PlantingStatusType))}}
          >
            {plantingStatusOptions.map(option => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={plantingStatusOptionLabels[option] ?? option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}