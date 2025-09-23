import { Autocomplete, TextField, Card, CardContent, Typography, Container, Box } from "@mui/material";
import counties from '../data/virginia_counties_and_cities.json';

export function Location() {
    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Card sx={{ width: "100%", boxShadow: 3, }}>
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
        </Container>
    );
}