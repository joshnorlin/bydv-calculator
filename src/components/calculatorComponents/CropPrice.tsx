import { TextField, Typography, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setBushelPrice } from "../../store/userDecisionSlice";
import type { PlantingStatusType, PlantingDateType } from "../../types/types";
import { FormFieldCard } from "./FormFieldCard";

export function CropPrice() {
    const dispatch = useDispatch();
    const bushelPrice = useSelector((state: RootState) => state.userDecision.bushelPrice);
    const plantingStatus = useSelector((state: RootState) => state.userDecision.plantingStatus);
    const plantingDate = useSelector((state: RootState) => state.userDecision.plantingDate);
    
    const inputDataIsValid = (plantingStatus: PlantingStatusType, plantingDate: PlantingDateType) => {
      if (plantingStatus === 'not-planted' ||
        plantingStatus === 'planted' &&
        (
          plantingDate === 'sept-oct' ||
          plantingDate === 'oct-nov' ||
          plantingDate === 'nov-dec'
        )
      ) return true;
      else return false;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = parseFloat(e.target.value);
        if (Number.isNaN(next)) {
            dispatch(setBushelPrice(0));
        } else {
            dispatch(setBushelPrice(next));
        }
    };

    if (inputDataIsValid(plantingStatus, plantingDate)) {
      return (
        <FormFieldCard
          title="Step 4: Crop Value (Optional)"
          description="We'll estimate recommendations based on a national average bushel price. Update it here if you want location-specific economics."
          infoMessage="A higher price makes more aggressive treatments economically justified."
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }} sx={{ mt: 2 }}>
            <TextField
              label="Price per bushel ($)"
              type="number"
              size="small"
              sx={{ width: { xs: "100%", sm: 180 } }}
              inputProps={{ step: 0.1, min: 0 }}
              value={bushelPrice}
              onChange={handleChange}
            />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Used to calculate ROI of treatment options
            </Typography>
          </Stack>
        </FormFieldCard>
      );
    } else {
      return null;
    }
}