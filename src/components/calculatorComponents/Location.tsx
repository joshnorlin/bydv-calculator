import { Autocomplete, TextField, Card, CardContent, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setCounty, setLocation } from "../../store/userDecisionSlice";
import type { RootState } from "../../store/store";
import countyList from '../../data/counties.json';
import { matchCounty } from "../../utils/matchCounty";
import { createSelector } from "@reduxjs/toolkit";

// Selector to get the county string from state
const selectCountyString = (state: RootState) => state.userDecision.county;

// Memoized selector to get the full county object
const selectCountyValue = createSelector(
  [selectCountyString],
  (countyString) => countyList.find((c) => c.county === countyString) || null
);

export function Location() {
  const dispatch = useDispatch();

  // Use the memoized selector
  const countyValue = useSelector(selectCountyValue);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Enter your county to connect to a planting site and improve your suggestions.
        </Typography>
        <Box mt={2}>
          <Autocomplete
            value={countyValue}
            onChange={(_event, newCounty) => {
              const location = matchCounty(newCounty?.county, countyList);
              dispatch(setLocation(location));
              dispatch(setCounty(newCounty?.county));
            }}
            options={countyList}
            getOptionLabel={(opt) => opt.county}
            isOptionEqualToValue={(option, value) =>
              Boolean(value) && option.county === value!.county
            }
            renderInput={(params) => (
              <TextField {...params} label="County" placeholder="Start typing your county..." />
            )}
          />  
        </Box>
      </CardContent>
    </Card>
  );
}
