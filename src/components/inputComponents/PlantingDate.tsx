import { useDispatch, useSelector } from "react-redux";
import { setPlantingDate } from '../../store/userDecisionSlice';
import type { RootState } from "../../store/store";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import type { PlantingDateType } from "../../types/types";

function PlantingDate() {
  const dispatch = useDispatch();
  const plantingDate = useSelector((state: RootState) => state.userDecision.plantingDate);

  const handleChange = (_: unknown, value: PlantingDateType) => {
    if (value) dispatch(setPlantingDate(value));
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={4} alignItems="center">
          <Grid>
            <Box>
              <Typography variant="h5" color="success.main" gutterBottom>
                Awesome!
              </Typography>
              <Typography>
                Great, <strong>when</strong> did you plant?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                For information on planting times, click <Link href="/help#planting-times">here</Link>.
              </Typography>
            </Box>
          </Grid>
          <Grid>
            <Box>
              <ToggleButtonGroup
                exclusive
                value={plantingDate || null}
                onChange={handleChange}
                orientation="vertical"
                fullWidth
              >
                <ToggleButton value="sept-oct">
                  <Box display="flex" justifyContent="space-between" width="100%">
                    <span>Early!</span>
                    <Typography variant="caption" color="text.secondary">mid-September</Typography>
                  </Box>
                </ToggleButton>
                <ToggleButton value="oct-nov">
                  <Box display="flex" justifyContent="space-between" width="100%">
                    <span>On time.</span>
                    <Typography variant="caption" color="text.secondary">mid- to late-October</Typography>
                  </Box>
                </ToggleButton>
                <ToggleButton value="nov-dec">
                  <Box display="flex" justifyContent="space-between" width="100%">
                    <span>A little later.</span>
                    <Typography variant="caption" color="text.secondary">late-November</Typography>
                  </Box>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PlantingDate;