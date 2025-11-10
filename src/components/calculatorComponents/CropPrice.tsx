import { Card, CardContent, TextField, Typography, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setBushelPrice } from "../../store/userDecisionSlice";
import type { PlantingStatusType, PlantingDateType } from "../../types/types";

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
            // If cleared, don't dispatch NaN; keep 0 or previous. Here we use 0.
            dispatch(setBushelPrice(0));
        } else {
            dispatch(setBushelPrice(next));
        }
    };

    if (inputDataIsValid(plantingStatus, plantingDate)) {
      return (
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" flexWrap="wrap">
              <Typography variant="subtitle2" sx={{ flex: 1, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                We will calculate your treatment recommendations using a national average bushel price. Change it here if you want to use your own price.
              </Typography>
              <TextField
                label="Price per bushel ($)"
                type="number"
                size="small"
                sx={{ width: 180 }}
                inputProps={{ step: 0.1, min: 0 }}
                value={bushelPrice}
                onChange={handleChange}
              />
            </Stack>
          </CardContent>
        </Card>
      );
    } else {
      return <></>
    }
}