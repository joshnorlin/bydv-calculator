import { TextField, Typography, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import type { RootState } from "../../store/store";
import { setBushelPrice } from "../../store/userDecisionSlice";
import type { PlantingStatusType, PlantingDateType } from "../../types/types";
import { FormFieldCard } from "./FormFieldCard";
import { useHighlightedField, useStepNumber } from "./FormProgress";

export function CropPrice() {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const bushelPrice = useSelector((state: RootState) => state.userDecision.bushelPrice);
    const plantingStatus = useSelector((state: RootState) => state.userDecision.plantingStatus);
    const plantingDate = useSelector((state: RootState) => state.userDecision.plantingDate);
    const highlightedField = useHighlightedField();
    const stepNumber = useStepNumber("cropPrice");
    const isHighlighted = highlightedField === "cropPrice";
    
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

    // Focus the input field when highlighted
    useEffect(() => {
      if (isHighlighted && inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 200);
      }
    }, [isHighlighted]);

    if (inputDataIsValid(plantingStatus, plantingDate)) {
      return (
        <FormFieldCard
          title={`Step ${stepNumber}: Crop Value (Optional)`}
          description="We'll estimate recommendations based on a national average bushel price. Update it here if you want location-specific economics."
          isHighlighted={isHighlighted}
          infoMessage="A higher price makes more aggressive treatments economically justified."
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }} sx={{ mt: 2 }}>
            <TextField
              inputRef={inputRef}
              label="Price per bushel ($)"
              type="number"
              size="small"
              sx={{ width: { xs: "100%", sm: 140 } }}
              inputProps={{ step: 0.1, min: 0 }}
              value={bushelPrice.toFixed(2)}
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