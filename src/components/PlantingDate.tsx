import { Card, CardContent, Container, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useState } from "react";

export function PlantingDate() {
    const [value, setValue] = useState("");

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>When did you plant?</FormLabel>
                        <RadioGroup
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        >
                            <FormControlLabel value="sept-oct" control={<Radio />} label="September - October" />
                            <FormControlLabel value="oct-nov" control={<Radio />} label="October - November" />
                            <FormControlLabel value="nov-dec" control={<Radio />} label="November - December" />
                        </RadioGroup>
                    </FormControl>
                </CardContent>
            </Card>
        </Container>
    );
}