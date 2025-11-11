import { Recommendations } from "../../components/Recommendations";
import { RecommendationsOverview } from "../../components/RecommendationsOverview";
import { RecommendationsSidebarInfo } from "../../components/RecommendationsSidebarInfo";
import { RecommendationsNextSteps } from "../../components/RecommendationsNextSteps";
import { Box } from "@mui/material";

export function RecommendationsPage() {
    return (
        <Box sx={{ my: 2, display: 'grid', gap: 2 }}>
            <RecommendationsOverview />
            <Box sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
                alignItems: 'stretch',
                maxWidth: 1200,
                mx: 'auto',
                width: '100%'
            }}>
                <Recommendations />
                <RecommendationsSidebarInfo />
            </Box>
            <RecommendationsNextSteps />
        </Box>
    );
}