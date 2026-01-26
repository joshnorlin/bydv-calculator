/**
 * RecommendationSummary
 * 
 * The core decision summary: WHEN to plant + WHAT treatment to apply.
 * This is the "I should plant in X, and if I do, I should Y" answer.
 * 
 * Design Intent:
 * - Two-part decision: planting window AND treatment
 * - Farmer can read this and know exactly what to do
 * - Domain-grounded, not generic UX copy
 */

import { Box, Typography, Stack, Paper, Chip } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { TreatmentOptionLabels, plantingDateOptionLabels } from "../types/types";

// Plain language for planting windows
const plantingWindowDescriptions: Record<string, {
  shortName: string;
  dateRange: string;
  whyItMatters: string;
}> = {
  'sept-oct': {
    shortName: 'Early Fall',
    dateRange: 'September through early October',
    whyItMatters: 'Early planting means longer exposure to fall aphid flights. Higher BYDV risk, but protective treatments are often more profitable.'
  },
  'oct-nov': {
    shortName: 'Mid Fall',
    dateRange: 'October through early November',
    whyItMatters: 'Moderate aphid exposure window. Balanced risk - treatment profitability depends on local pressure forecasts.'
  },
  'nov-dec': {
    shortName: 'Late Fall',
    dateRange: 'November through early December',
    whyItMatters: 'Late planting reduces aphid exposure since cold weather limits flight activity. Often, no treatment is needed.'
  }
};

// Treatment descriptions in farmer language
const treatmentDescriptions: Record<string, {
  whatToBuy: string;
  whenToApply: string;
  whyThisCombination: string;
}> = {
  'neon': {
    whatToBuy: 'Neonicotinoid-treated seed (e.g., Gaucho, Cruiser)',
    whenToApply: 'Applied to seed before planting - order treated seed or treat your own',
    whyThisCombination: 'Seed treatment protects seedlings during the critical 4-6 week window when aphids transmit BYDV most actively.'
  },
  'fallApp': {
    whatToBuy: 'Pyrethroid insecticide (e.g., lambda-cyhalothrin, bifenthrin)',
    whenToApply: 'Scout fields 2-3 weeks after emergence; spray if aphid counts exceed threshold (~20-25 per foot of row)',
    whyThisCombination: 'Fall spray targets aphids before they transmit virus. Only apply if scouting confirms economically damaging populations.'
  },
  'springApp': {
    whatToBuy: 'Pyrethroid insecticide (e.g., lambda-cyhalothrin, bifenthrin)',
    whenToApply: 'Scout in early spring as temperatures warm; spray if aphid activity is high before virus transmission peaks',
    whyThisCombination: 'Spring spray is a reactive option when fall populations were low but spring conditions favor aphid resurgence.'
  },
  'neonFallApp': {
    whatToBuy: 'Neonicotinoid-treated seed PLUS pyrethroid foliar spray',
    whenToApply: 'Seed treatment at planting + scout 2-3 weeks after emergence for foliar decision',
    whyThisCombination: 'Maximum protection for high-risk fields. Seed treatment handles early pressure; foliar spray catches late-season flushes.'
  },
  'neonSpringApp': {
    whatToBuy: 'Neonicotinoid-treated seed PLUS pyrethroid foliar spray',
    whenToApply: 'Seed treatment at planting + scout in spring and spray if aphids resurge',
    whyThisCombination: 'Seed treatment provides fall protection; spring spray is held in reserve if aphid pressure returns with warm weather.'
  }
};

export function RecommendationSummary() {
  const recommendations = useSelector(
    (state: RootState) => state.recommendations.recommendations
  );
  const plantingStatus = useSelector(
    (state: RootState) => state.userDecision.plantingStatus
  );
  const plantingDate = useSelector(
    (state: RootState) => state.userDecision.plantingDate
  );

  // Get the top recommendation (planting window + treatment combination)
  let filtered = recommendations.filter(r => r.treatment !== 'cont');
  if (plantingStatus === 'planted' && plantingDate) {
    filtered = filtered.filter(r => r.date === plantingDate);
  }
  const sorted = filtered.sort((a, b) => (b.profit ?? 0) - (a.profit ?? 0));
  const topRec = sorted[0];
  
  const allNegative = sorted.every(r => (r.profit ?? 0) <= 0);
  const isPlanted = plantingStatus === 'planted';

  // Get descriptive content
  const plantingWindow = topRec?.date ? plantingWindowDescriptions[topRec.date] : null;
  const treatment = topRec?.treatment ? treatmentDescriptions[topRec.treatment] : null;

  if (!topRec && !allNegative) return null;

  return (
    <Box>
      <Stack spacing={3}>
        {/* Section Header */}
        <Box>
          <Chip 
            label="Your Plan" 
            size="small" 
            color="primary" 
            sx={{ mb: 1, fontWeight: 600 }}
          />
          <Typography variant="h5" fontWeight={700}>
            What this recommendation means for your operation
          </Typography>
        </Box>

        {/* Two-Part Decision Display */}
        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: 2, 
            border: '2px solid',
            borderColor: allNegative ? 'warning.main' : 'primary.main',
            overflow: 'hidden'
          }}
        >
          {/* PART 1: WHEN TO PLANT */}
          <Box sx={{ 
            p: 3, 
            bgcolor: allNegative ? 'warning.light' : 'warning.light',
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <CalendarMonthIcon 
                sx={{ 
                  fontSize: 32, 
                  color: allNegative ? 'warning.dark' : 'warning.main',
                  mt: 0.5 
                }} 
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="overline" fontWeight={700} color="text.secondary">
                  {isPlanted ? 'YOUR PLANTING WINDOW' : 'RECOMMENDED PLANTING WINDOW'}
                </Typography>
                
                {allNegative ? (
                  <>
                    <Typography variant="h5" fontWeight={800} sx={{ mt: 0.5 }}>
                      {isPlanted && plantingDate 
                        ? plantingWindowDescriptions[plantingDate]?.shortName || plantingDateOptionLabels[plantingDate]
                        : 'Any window - treatment not cost-effective'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {isPlanted 
                        ? 'Given your planting timing, aphid pressure is low enough that treatments cost more than they save.'
                        : 'Current forecasts suggest BYDV risk is low across all planting windows. No treatment is economically justified.'}
                    </Typography>
                  </>
                ) : plantingWindow ? (
                  <>
                    <Typography variant="h5" fontWeight={800} sx={{ mt: 0.5 }}>
                      {isPlanted ? `You planted in ${plantingWindow.shortName}` : `Plant in ${plantingWindow.shortName}`}
                    </Typography>
                    <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
                      {plantingWindow.dateRange}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {plantingWindow.whyItMatters}
                    </Typography>
                  </>
                ) : null}
              </Box>
            </Stack>
          </Box>

          {/* PART 2: WHAT TREATMENT */}
          <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <LocalFloristIcon 
                sx={{ 
                  fontSize: 32, 
                  color: allNegative ? 'text.secondary' : 'success.main',
                  mt: 0.5 
                }} 
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="overline" fontWeight={700} color="text.secondary">
                  RECOMMENDED TREATMENT
                </Typography>
                
                {allNegative ? (
                  <>
                    <Typography variant="h5" fontWeight={800} sx={{ mt: 0.5 }}>
                      Do Nothing
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Skip treatment this season. The expected yield loss from BYDV is smaller than the cost of any treatment option.
                      This isn't ignoring the problem - it's the economically rational choice based on current conditions.
                    </Typography>
                  </>
                ) : treatment ? (
                  <>
                    <Typography variant="h5" fontWeight={800} sx={{ mt: 0.5 }}>
                      {TreatmentOptionLabels[topRec.treatment]}
                    </Typography>
                    
                    <Stack spacing={2} sx={{ mt: 2 }}>
                      <Box>
                        <Typography variant="caption" fontWeight={700} color="text.secondary">
                          WHAT TO BUY OR ORDER
                        </Typography>
                        <Typography variant="body2">
                          {treatment.whatToBuy}
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="caption" fontWeight={700} color="text.secondary">
                          WHEN TO APPLY
                        </Typography>
                        <Typography variant="body2">
                          {treatment.whenToApply}
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="caption" fontWeight={700} color="text.secondary">
                          WHY THIS COMBINATION WORKS
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {treatment.whyThisCombination}
                        </Typography>
                      </Box>
                    </Stack>
                  </>
                ) : null}
              </Box>
            </Stack>
          </Box>

          {/* PROFIT SUMMARY */}
          {!allNegative && topRec && (
            <Box sx={{ 
              p: 2, 
              bgcolor: 'success.light', 
              borderTop: '1px solid',
              borderColor: 'success.main'
            }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TrendingUpIcon color="success" />
                  <Typography variant="subtitle1" fontWeight={700}>
                    Projected profit from this combination:
                  </Typography>
                </Stack>
                <Chip 
                  label={`+$${(topRec.profit ?? 0).toFixed(2)} per acre`}
                  color="success"
                  sx={{ fontWeight: 700, fontSize: 16 }}
                />
              </Stack>
            </Box>
          )}
        </Paper>
      </Stack>
    </Box>
  );
}
