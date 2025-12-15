import { Recommendations } from "../../components/Recommendations";
import { RecommendationsOverview } from "../../components/RecommendationsOverview";
import { RecommendationsSidebarInfo } from "../../components/RecommendationsSidebarInfo";
import { RecommendationsNextSteps } from "../../components/RecommendationsNextSteps";
import { RecommendationsTreatmentInfo } from "../../components/RecommendationsTreatmentInfo";
import { RecommendationsDisclaimer } from "../../components/RecommendationsDisclaimer";
import { Typography, Stack, Button, Container, Paper, Box } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Link as RouterLink } from "react-router-dom";

export function RecommendationsPage() {
    const recommendations = useSelector((state: RootState) => state.recommendations.recommendations);

    const hasRecs = recommendations && recommendations.length > 0;

    if (!hasRecs) {
        return (
            <Container maxWidth="md" sx={{ my: 4 }}>
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 1, textAlign: 'center' }}>
                    <Stack spacing={2} alignItems="center">
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            No recommendations are available
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Please provide your field information to generate recommendations, or learn more about how the calculator works.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 1 }}>
                            <Button variant="contained" component={RouterLink} to="/calculator">
                                Fill out your info
                            </Button>
                            <Button variant="text" component={RouterLink} to="/calculator/about">
                                Learn more about the calculator
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Stack spacing={4}>
                {/* Page Title */}
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h3" fontWeight={800} gutterBottom>
                        Your Aphid Management Recommendations
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Data-driven insights for profitable aphid control decisions
                    </Typography>
                </Box>

                {/* Step 1: Understanding the recommendations */}
                <RecommendationsOverview />
                
                {/* Step 2: Learn about treatments */}
                <RecommendationsTreatmentInfo />
                
                {/* Step 3: See the actual recommendations */}
                <Recommendations />
                
                {/* Step 4: Side information (optional reading) */}
                <RecommendationsSidebarInfo />
                
                {/* Step 5: Action steps */}
                <RecommendationsNextSteps />
                
                {/* Step 6: Legal disclaimer */}
                <RecommendationsDisclaimer />
            </Stack>
        </Container>
    );
}