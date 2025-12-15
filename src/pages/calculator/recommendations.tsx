import { Recommendations } from "../../components/Recommendations";
import { RecommendationsOverview } from "../../components/RecommendationsOverview";
import { RecommendationsTreatmentInfo } from "../../components/RecommendationsTreatmentInfo";
import { RecommendationsDisclaimer } from "../../components/RecommendationsDisclaimer";
import { TopRecommendations } from "../../components/TopRecommendations";
import { RecommendationTransition } from "../../components/RecommendationTransition";
import { RecommendationSummary } from "../../components/RecommendationSummary";
import { OperationalNextSteps } from "../../components/OperationalNextSteps";
import { Typography, Stack, Button, Container, Paper, Box, Alert, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Link as RouterLink } from "react-router-dom";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
                            <Button variant="contained" startIcon={<ArrowBackIcon />} component={RouterLink} to="/calculator?noAutoFocus=true">
                                Back to Calculator
                            </Button>
                            <Button variant="text" component={RouterLink} to="/about">
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
                        <Button
                            variant="text"
                            size="large"
                            startIcon={<EditIcon />}
                            component={RouterLink}
                            to="/calculator?noAutoFocus=true"
                        >
                            Edit Input
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

                {/* ========== SECTION 3.5: TRANSITION CUE ========== */}
                <RecommendationTransition />

                {/* ========== SECTION 4: RECOMMENDATION SUMMARY ========== */}
                {/* The two-part decision: WHEN to plant + WHAT treatment */}
                <Box id="your-plan">
                    <RecommendationSummary />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* ========== SECTION 5: OPERATIONAL NEXT STEPS ========== */}
                {/* Step-by-step action plan with concrete instructions */}
                <Box id="action-plan">
                    <OperationalNextSteps />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* ========== SECTION 6: DISCLAIMER (PROMINENT) ========== */}
                <Accordion defaultExpanded={false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6" fontWeight={700}>
                            ⚠️ Important Disclaimer & Data Limitations
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ bgcolor: 'grey.50' }}>
                        <Box sx={{ width: '100%' }}>
                            <RecommendationsDisclaimer />
                        </Box>
                    </AccordionDetails>
                </Accordion>

                <Divider sx={{ my: 2 }} />

                {/* ========== SECTION 7: ALL RECOMMENDATIONS BREAKDOWN ========== */}
                {/* Full comparison data for power users who want to dig deeper */}
                <Accordion defaultExpanded={false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6" fontWeight={700}>
                            📊 Full Recommendations Breakdown
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ width: '100%' }}>
                            <Recommendations />
                        </Box>
                    </AccordionDetails>
                </Accordion>

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