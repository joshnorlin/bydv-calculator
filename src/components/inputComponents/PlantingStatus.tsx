import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setPlantingStatus } from "../../store/userDecisionSlice";
import type { PlantingStatusType } from "../../types/types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Stack from '@mui/material/Stack';

function PlantingStatus() {
  const dispatch = useDispatch();
  const plantingStatus = useSelector((state: RootState) => state.userDecision.plantingStatus);

  const handleChange = (_: unknown, value: string | null) => {
    if (value) dispatch(setPlantingStatus(value as PlantingStatusType));
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography variant="h4" color="success.main">Let's get started</Typography>
          <Typography variant="subtitle1">
            We'll start simple. <strong>Have you planted your wheat yet?</strong>
          </Typography>
          <ToggleButtonGroup
            exclusive
            value={plantingStatus || null}
            onChange={handleChange}
            orientation="horizontal"
          >
            <ToggleButton value="planted">Yes!</ToggleButton>
            <ToggleButton value="not-planted">No, not yet.</ToggleButton>
            <ToggleButton value="not-farmer">I'm not a farmer...</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PlantingStatus;