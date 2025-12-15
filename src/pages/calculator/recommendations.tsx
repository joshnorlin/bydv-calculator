import { Recommendations } from "../../components/Recommendations";
import { RecommendationsOverview } from "../../components/RecommendationsOverview";
import { RecommendationsSidebarInfo } from "../../components/RecommendationsSidebarInfo";
import { RecommendationsNextSteps } from "../../components/RecommendationsNextSteps";
import { RecommendationsTreatmentInfo } from "../../components/RecommendationsTreatmentInfo";
import { RecommendationsDisclaimer } from "../../components/RecommendationsDisclaimer";
import { TopRecommendations } from "../../components/TopRecommendations";
import { Typography, Stack, Button, Container, Paper, Box, Alert, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Link as RouterLink } from "react-router-dom";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function RecommendationsPage() {
    const recommendations = useSelector((state: RootState) => state.recommendations.recommendations);
    const plantingStatus = useSelector((state: RootState) => state.userDecision.plantingStatus);

    const hasRecs = recommendations && recommendations.length > 0;
    const isPlanted = plantingStatus === 'planted';

    // Track if educational content is expanded (default: collapsed for returning users)
    const [expandEducational, setExpandEducational] = useState(false);

    const scrollToRecommendations = () => {
        const element = document.getElementById('recommendations-results');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

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
            <Stack spacing={5}>
                {/* ========== SECTION 1: HEADER & QUICK NAV ========== */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" fontWeight={900} gutterBottom sx={{ mb: 1 }}>
                        Your Aphid Management Plan
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                        Data-driven recommendations for profitable pest control
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 3 }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<ArrowDownwardIcon />}
                            onClick={scrollToRecommendations}
                            sx={{ fontWeight: 700 }}
                        >
                            Skip to My Recommendations
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => setExpandEducational(!expandEducational)}
                            sx={{ fontWeight: 700 }}
                        >
                            {expandEducational ? 'Hide' : 'Show'} How to Read This Page
                        </Button>
                    </Stack>

                    <Alert severity="info" icon={<InfoOutlinedIcon />} sx={{ maxWidth: 600, mx: 'auto', textAlign: 'left' }}>
                        <Typography variant="body2">
                            <strong>New here?</strong> Click "Show How to Read This Page" to learn about treatment options.
                            <strong> Returning user?</strong> Jump straight to your results above.
                        </Typography>
                    </Alert>
                </Box>

                {/* ========== SECTION 2: EDUCATIONAL CONTENT (COLLAPSIBLE) ========== */}
                {expandEducational && (
                    <>
                        <Box id="how-to-read">
                            <RecommendationsOverview />
                        </Box>

                        <Box id="treatment-info">
                            <RecommendationsTreatmentInfo plantedOnly={isPlanted} />
                        </Box>

                        <Divider sx={{ my: 2 }} />
                    </>
                )}

                {/* ========== SECTION 3: TOP RECOMMENDATIONS ========== */}
                <Box id="recommendations-results">
                    <TopRecommendations />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* ========== SECTION 4: FULL BREAKDOWN ========== */}
                <Box id="full-breakdown">
                    <Recommendations />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* ========== SECTION 5: ACTIONABLE GUIDANCE ========== */}
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="h4" fontWeight={800} gutterBottom>
                            Implementation & Next Steps
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Everything you need to make and execute your treatment decision
                        </Typography>
                    </Box>

                    {/* Sidebar Info in Accordion */}
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6" fontWeight={700}>
                                📚 Learn More About Treatments
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ bgcolor: 'grey.50' }}>
                            <Box sx={{ width: '100%' }}>
                                <RecommendationsSidebarInfo />
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* Next Steps */}
                    <Box id="next-steps">
                        <RecommendationsNextSteps />
                    </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* ========== SECTION 6: LEGAL DISCLAIMER ========== */}
                <Box id="disclaimer">
                    <RecommendationsDisclaimer />
                </Box>

                {/* Back to top button */}
                <Box sx={{ textAlign: 'center', pt: 3 }}>
                    <Button
                        variant="text"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        ↑ Back to Top
                    </Button>
                </Box>
            </Stack>
        </Container>
    );
}