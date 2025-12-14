import { Autocomplete, TextField, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setCounty, setLocation } from "../../store/userDecisionSlice";
import type { RootState } from "../../store/store";
import countyList from '../../data/counties.json';
import { matchCounty } from "../../utils/matchCounty";
import { createSelector } from "@reduxjs/toolkit";
import { FormFieldCard } from "./FormFieldCard";
import { useHighlightedField } from "./FormProgress";

// Selector to get the county string from state
const selectCountyString = (state: RootState) => state.userDecision.county;

// Memoized selector to get the full county object
const selectCountyValue = createSelector(
  [selectCountyString],
  (countyString) => countyList.find((c) => c.county === countyString) || null
);

export function Location() {
  const dispatch = useDispatch();
  const countyValue = useSelector(selectCountyValue);
  const highlightedField = useHighlightedField();
  const isHighlighted = highlightedField === "location";

  return (
    <FormFieldCard
      title="Step 1: Where is your farm?"
      description="Select your Virginia county to connect to a local planting site and get location-specific recommendations."
      isHighlighted={isHighlighted}
      infoMessage="This calculator is designed for Virginia farmers only. Your county helps us match you with nearby weather and pest monitoring data."
    >
      <Box mt={2}>
        <Autocomplete
          value={countyValue}
          onChange={(_event, newCounty) => {
            if (newCounty) {
              const location = matchCounty(newCounty.county, countyList);
              dispatch(setLocation(location));
              dispatch(setCounty(newCounty.county));
            } else {
              // Clear county and location when user clears the selection
              dispatch(setCounty(undefined));
              dispatch(setLocation(null));
            }
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
    </FormFieldCard>
  );
}
