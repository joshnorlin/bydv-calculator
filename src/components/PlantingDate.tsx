import { Card, CardContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { setPlantingDate } from "../store/userDecisionSlice";
import { plantingDateOptions, plantingDateOptionLabels, type PlantingDateType } from "../types/types";

export function PlantingDate() {
  const dispatch = useDispatch();
  const selectedPlantingDate = useSelector((state: RootState) => state.userDecision.plantingDate);

  return (
    <Card>
      <CardContent>
        <FormControl>
          <FormLabel>When did you plant?</FormLabel>
          <RadioGroup
              value={selectedPlantingDate}
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
  );
}