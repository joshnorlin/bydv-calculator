import { Autocomplete, TextField, Card, CardContent, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setCounty, setLocation } from "../store/userDecisionSlice";
import type { RootState } from "../store/store";
import countyList from '../data/counties.json';
import { matchCounty } from "../utils/matchCounty";
import { useMemo } from "react";

export function Location() {
  const dispatch = useDispatch();
  const selectedCountyString = useSelector((state: RootState) => state.userDecision.county);
  const countyValue = useMemo(
    () => countyList.find((c) => c.county === selectedCountyString),
    [countyList, selectedCountyString]
  );


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