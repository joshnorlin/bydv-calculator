import { Autocomplete, TextField, Card, CardContent, Typography, Box } from "@mui/material";
import counties from '../data/virginia_counties_and_cities.json';

export function Location() {
    return (
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Enter your county to connect to a planting site and improve your suggestions.
                    </Typography>
                    <Box mt={2}>
                        <Autocomplete
                            options={counties}
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