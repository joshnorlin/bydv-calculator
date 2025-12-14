import { Box, Stepper, Step, StepLabel } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

/**
 * Visual progress indicator showing which step of the form the user is on.
 * Steps are dynamic based on planting status:
 * - If not-planted: Location → Planting Status → Review & Calculate
 * - If planted: Location → Planting Status → Planting Date → Review & Calculate
 */
export function FormProgress() {
  const location = useSelector((state: RootState) => state.userDecision.location);
  const plantingStatus = useSelector((state: RootState) => state.userDecision.plantingStatus);
  const plantingDate = useSelector((state: RootState) => state.userDecision.plantingDate);

  // Build steps array dynamically based on planting status
  const steps = ["Location", "Planting Status"];
  let activeStep = 0;

  if (location) activeStep = 1;
  if (plantingStatus) activeStep = 2;

  // Only add Planting Date step if planted
  if (plantingStatus === 'planted') {
    steps.push("Planting Date");
    if (plantingDate) activeStep = 3;
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
 * Hook to determine which field should be highlighted for user focus
 */
export function useHighlightedField() {
  const location = useSelector((state: RootState) => state.userDecision.location);
  const plantingStatus = useSelector((state: RootState) => state.userDecision.plantingStatus);
  const plantingDate = useSelector((state: RootState) => state.userDecision.plantingDate);

  // Determine which field should be highlighted (the next incomplete one)
  if (!location) return "location";
  if (!plantingStatus) return "plantingStatus";
  if (plantingStatus === 'planted' && !plantingDate) return "plantingDate";
  return null;
}
