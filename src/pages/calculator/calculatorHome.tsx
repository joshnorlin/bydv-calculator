import { Box, Container, Typography, Alert, Stack, Card, CardContent, Divider, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Location } from "../../components/calculatorComponents/Location";
import { PlantingStatus } from "../../components/calculatorComponents/PlantingStatus";
import { PlantingDate } from "../../components/calculatorComponents/PlantingDate";
import { CalculateButton } from "../../components/calculatorComponents/CalculateButton";
import { CropPrice } from "../../components/calculatorComponents/CropPrice";

export function CalculatorHome() {
    return (
        <>
            <Container maxWidth="md" sx={{ mt: { xs: 3, md: 6 } }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                    BYDV Risk Calculator
                </Typography>
                <Alert severity="warning" sx={{ mb: 3 }}>
                    Virginia-only: This calculator is designed for winter wheat fields in Virginia.
                    Results and recommendations reflect Virginia conditions and current research.
                </Alert>

                <Grid container columns={12} spacing={3} sx={{ mb: 3 }}>
                    <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 7' } }}>
                        <Card elevation={1}>
                            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                    What it does
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    Estimates aphid pressure and barley yellow dwarf virus (BYDV) risk
                                    for your field and timing, then highlights actions most likely to pay.
                                </Typography>
                                <Divider sx={{ my: 1.5 }} />

                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                    What it's about
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    Climate shifts have made older aphid management guidance outdated. This
                                    tool distills ongoing research for Virginia growers into clear, practical
                                    guidance.
                                </Typography>
                                <Divider sx={{ my: 1.5 }} />

                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                    How it works
                                </Typography>
                                <Typography variant="body1">
                                    Enter your location and planting details. The tool combines scouting
                                    observations with local context to estimate risk and compare options like
                                    planting date adjustments, seed treatments, or targeted foliar sprays.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 5' } }}>
                        <Stack spacing={2}>
                            <Card elevation={2}>
                                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                        What the recommendations look like
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        You’ll see clear next steps with brief rationale—and when an action is
                                        unlikely to pay. Results support, not replace, your scouting and
                                        judgment.
                                    </Typography>
                                    <Paper variant="outlined" sx={{ p: 1.5, mt: 1 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                                            Sample output
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Based on your inputs, a seed treatment is likely to pay this season.
                                            Avoid calendar-based foliar sprays at current risk levels.
                                        </Typography>
                                    </Paper>
                                </CardContent>
                            </Card>

                            <Card variant="outlined">
                                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                        Quick steps
                                    </Typography>
                                    <Box component="ol" sx={{ pl: 3, m: 0 }}>
                                        <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                                            Select your location and planting status/date
                                        </Typography>
                                        <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                                            Note aphids/symptoms from scouting
                                        </Typography>
                                        <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                                            Review risk and recommendations
                                        </Typography>
                                        <Typography component="li" variant="body2">
                                            Compare options and next steps
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>

                <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 1 }}>
                    Get started below
                </Typography>
            </Container>

            <Box 
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                    my: 5,
                }}
            >
                <Location />
                <PlantingStatus />
                <PlantingDate />
                <CropPrice />
                <CalculateButton />
            </Box>
        </>
    )
}