import { Card, CardContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useState } from "react";

export function PlantingStatus() {
    const [value, setValue] = useState("");

    return (
            <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>Have you planted?</FormLabel>
                        <RadioGroup
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        >
                            <FormControlLabel value="planted" control={<Radio />} label="Yes, I have planted" />
                            <FormControlLabel value="not-planted" control={<Radio />} label="No, I have not planted yet" />
                            <FormControlLabel value="not-farmer" control={<Radio />} label="I'm not a farmer" />
                        </RadioGroup>
                    </FormControl>
                </CardContent>
            </Card>
    );
}