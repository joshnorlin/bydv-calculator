import { Autocomplete, TextField, Card, CardContent, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setCounty, setLocation } from "../store/userDecisionSlice";
import type { RootState } from "../store/store";
import countyList from '../data/counties.json';
import { matchCounty } from "../utils/matchCounty";
import type { CountyObjectType } from "../types/types";

export function Location() {
    const dispatch = useDispatch();
    const selectedCountyString = useSelector((state: RootState) => state.userDecision.county) as string | null;
    const selectedCountyObject = (selector: string | null, countyList: CountyObjectType[]) => {
        return countyList.find((c) => c.county === selector);
    }

    return (
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Enter your county to connect to a planting site and improve your suggestions.
                    </Typography>
                    <Box mt={2}>
                        <Autocomplete
                            value={selectedCountyObject(selectedCountyString, countyList)}
                            onChange={(_event, newCounty) => {
                                const location = matchCounty(newCounty?.county, countyList);
                                dispatch(setLocation(location));
                                dispatch(setCounty(newCounty?.county));
                            }}
                            options={countyList as CountyObjectType[]}
                            getOptionLabel={(opt: CountyObjectType) => opt.county}
                            isOptionEqualToValue={(option: CountyObjectType, value: CountyObjectType | null) =>
                                Boolean(value) && option.county === value!.county
                            }
                            sx={{ width: "100%" }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="County"
                                    placeholder="Start typing your county..."
                                    fullWidth
                                />
                            )}
                        />
                    </Box>
                </CardContent>
            </Card>
    );
}