import { Box, Stepper, Step, StepLabel } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { BUSHEL_PRICE_IN_DOLLARS } from "../../config/constants";

/**
 * Visual progress indicator showing which step of the form the user is on.
 * Steps are dynamic based on planting status:
 * - If not-planted: Location → Planting Status → Crop Value → Review & Calculate
 * - If planted: Location → Planting Status → Planting Date → Crop Value → Review & Calculate
 */
export function FormProgress() {
  const location = useSelector((state: RootState) => state.userDecision.location);
  const plantingStatus = useSelector((state: RootState) => state.userDecision.plantingStatus);
  const plantingDate = useSelector((state: RootState) => state.userDecision.plantingDate);
  const bushelPrice = useSelector((state: RootState) => state.userDecision.bushelPrice);

  // Build steps array dynamically based on planting status
  const steps = ["Location", "Planting Status"];
  let activeStep = 0;

  if (location) activeStep = 1;
  if (plantingStatus) activeStep = 2;

  // Only add Planting Date step if planted
  if (plantingStatus === 'planted') {
    steps.push("Planting Date");
    if (plantingDate) activeStep = 3;
    // Advance to Crop Value only when both plantingDate and bushelPrice are filled
    steps.push("Crop Value");
    if (bushelPrice !== BUSHEL_PRICE_IN_DOLLARS) {
      activeStep = 4;
    }
  } else if (plantingStatus === 'not-planted') {
    // For not-planted, Crop Value is step 3, advance only when bushelPrice is filled
    steps.push("Crop Value");
    if (bushelPrice !== BUSHEL_PRICE_IN_DOLLARS) {
      activeStep = 3;
    }
  }

  // Add final step
  steps.push("Review & Calculate");

  return (
    <Box sx={{ mb: 4 }}>
      <Stepper activeStep={activeStep} sx={{ pt: 2 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

/**
 * Hook to get the currently highlighted field that should receive focus
 * Returns which field should be animated and focused based on form completion
 */
export function useHighlightedField() {
  const location = useSelector((state: RootState) => state.userDecision.location);
  const plantingStatus = useSelector((state: RootState) => state.userDecision.plantingStatus);
  const plantingDate = useSelector((state: RootState) => state.userDecision.plantingDate);
  const bushelPrice = useSelector((state: RootState) => state.userDecision.bushelPrice);

  // Progressively highlight the next incomplete field
  if (!location) return "location";
  if (!plantingStatus) return "plantingStatus";
  if (plantingStatus === "planted" && !plantingDate) return "plantingDate";
  if (bushelPrice === BUSHEL_PRICE_IN_DOLLARS) return "cropPrice"; // Only highlight if not yet filled
  
  return null; // All fields complete
}

/**
 * Hook to determine the current step number for a given field
 * Returns the step number (1-indexed) for the field, accounting for dynamic steps
 * Steps: Location (1), Planting Status (2), Planting Date (3 if planted), Crop Value (3 if not-planted, 4 if planted), Review & Calculate
 */
export function useStepNumber(fieldName: "location" | "plantingStatus" | "plantingDate" | "cropPrice") {
  const plantingStatus = useSelector((state: RootState) => state.userDecision.plantingStatus);

  if (fieldName === "location") return 1;
  if (fieldName === "plantingStatus") return 2;
  if (fieldName === "plantingDate") {
    return plantingStatus === "planted" ? 3 : null; // null if not applicable
  }
  if (fieldName === "cropPrice") {
    return plantingStatus === "planted" ? 4 : 3; // Step 4 if planted (after Planting Date), Step 3 if not-planted
  }
  return null;
}
