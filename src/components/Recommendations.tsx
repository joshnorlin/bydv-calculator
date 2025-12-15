/**
 * UX GOALS FOR THIS COMPONENT:
 *
 * Audience:
 * - Farmers using a BYDV decision-support calculator
 * - Users have basic ag knowledge but limited patience for dense UI
 *
 * Primary user goal:
 * - Quickly understand what action (if any) they should take
 * - NOT analyze raw data or compare many tables
 *
 * UX PRINCIPLES FOLLOWED:
 * 1. Minimize cognitive effort
 *    - Show the best action first in a prominent summary box
 *    - Use large, obvious profit numbers
 *    - Alternatives hidden behind "Compare Other Options"
 *
 * 2. Decision-first, data-second layout
 *    - Start with a clear "Recommended Action" summary
 *    - Brief explanation ("why this makes sense")
 *    - Detailed comparisons only if the user asks
 *
 * 3. Different layouts based on planting status:
 *    - If planted: Action cards ("What should I do now?")
 *    - If not planted: Scenario tabs ("If you plant in Oct–Nov...")
 *
 * 4. Progressive disclosure:
 *    - Alternatives collapsed by default
 *    - "Compare Other Options" button for power users
 *
 * 5. Action-oriented language:
 *    - "Recommended Action" not "All Recommendations"
 *    - Arrow (→) points to recommended action
 *    - Clear "Do Nothing" guidance when all options are negative
 */

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Divider,
  useTheme,
  Alert,
  Tabs,
  Tab,
  Button,
  Collapse,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// Using CSS grid via Box to avoid Grid version/type issues
import { TreatmentOptionLabels, plantingDateOptionLabels } from "../types/types";

export function Recommendations() {
  const theme = useTheme();

  // Get recommendations from Redux
  const recommendations = useSelector(
    (state: RootState) => state.recommendations.recommendations
  );
  
  // Get user's planting status and date
  const plantingStatus = useSelector(
    (state: RootState) => state.userDecision.plantingStatus
  );
  const plantingDate = useSelector(
    (state: RootState) => state.userDecision.plantingDate
  );

  // Memoize pre-processing: keep all (including 0 profit), sort desc by profit
  // If user has already planted, only show recommendations for their specific planting date
  const sorted = useMemo(() => {
    let filtered = recommendations.filter(r => r.treatment !== 'cont');
    
    // If already planted, filter to only show their planting date
    if (plantingStatus === 'planted' && plantingDate) {
      filtered = filtered.filter(r => r.date === plantingDate);
    }
    
    return filtered
      .slice()
      .sort((a, b) => (b.profit ?? 0) - (a.profit ?? 0));
  }, [recommendations, plantingStatus, plantingDate]);

  // Check if all are negative
  const allNegative = useMemo(() => {
    return sorted.every(r => (r.profit ?? 0) <= 0);
  }, [sorted]);

  // Map profit -> visual severity buckets
  const getSeverity = (profit: number | null | undefined) => {
    const p = profit ?? 0;
    if (p >= 15) return "excellent" as const; // Strong positive
    if (p > 5) return "good" as const; // Modest positive
    if (p > -5) return "neutral" as const; // Near zero
    return "poor" as const; // Clearly negative
  };

  const colorFor = (severity: ReturnType<typeof getSeverity>) => {
    switch (severity) {
      case "excellent":
        return {
          main: theme.palette.success.dark,
          bg: theme.palette.success.light,
          chip: "success",
          border: theme.palette.success.main,
        } as const;
      case "good":
        return {
          main: theme.palette.success.main,
          bg: theme.palette.success.light,
          chip: "success",
          border: theme.palette.success.light,
        } as const;
      case "neutral":
        return {
          main: theme.palette.grey[700],
          bg: theme.palette.grey[100],
          chip: "default",
          border: theme.palette.grey[400],
        } as const;
      case "poor":
      default:
        return {
          main: theme.palette.error.main,
          bg: theme.palette.error.light,
          chip: "error",
          border: theme.palette.error.light,
        } as const;
    }
  };

  // State for expandable details section
  const [showAllDetails, setShowAllDetails] = useState(false);

  // ========== RENDER MODE 1: ALREADY PLANTED ==========
  // Show action-focused cards with no hypothetical scenarios
  if (plantingStatus === 'planted' && plantingDate) {
    const topRec = sorted[0];
    const topSeverity = topRec ? getSeverity(topRec.profit) : 'neutral';
    const topColors = colorFor(topSeverity);
    const isTopProfitable = topRec && (topRec.profit ?? 0) > 0;

    return (
      <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Stack gap={3}>
            {/* ===== SUMMARY: What should I do? ===== */}
            <Box sx={{ 
              p: 3, 
              borderRadius: 2, 
              bgcolor: allNegative ? 'warning.light' : topColors.bg,
              border: `2px solid ${allNegative ? theme.palette.warning.main : topColors.main}`,
            }}>
              <Typography variant="overline" fontWeight={700} color="text.secondary">
                Recommended Action
              </Typography>
              
              {allNegative ? (
                <>
                  <Typography variant="h4" fontWeight={800} sx={{ mt: 1 }}>
                    Do Nothing
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    All treatment options cost more than they're worth. Monitor your fields but skip treatment this season.
                  </Typography>
                </>
              ) : topRec ? (
                <>
                  <Typography variant="h4" fontWeight={800} sx={{ mt: 1, color: topColors.main }}>
                    {TreatmentOptionLabels[topRec.treatment]}
                  </Typography>
                  <Stack direction="row" alignItems="center" gap={2} sx={{ mt: 2 }}>
                    <Chip
                      icon={<TrendingUpIcon />}
                      label={`+$${(topRec.profit ?? 0).toFixed(2)}/acre`}
                      color={topColors.chip as any}
                      sx={{ fontWeight: 700, fontSize: 18, height: 'auto', py: 1.5, px: 2 }}
                    />
                  </Stack>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    Based on your {plantingDateOptionLabels[plantingDate]} planting, this treatment is projected to be most profitable.
                  </Typography>
                </>
              ) : null}
            </Box>

            {/* ===== WHY: Brief explanation ===== */}
            {!allNegative && topRec && isTopProfitable && (
              <Alert severity="info" icon={<CheckCircleIcon />}>
                <Typography variant="body2">
                  <strong>Why this recommendation?</strong> Given current aphid pressure estimates and your planting timing, 
                  this treatment has the best return on investment compared to other options or doing nothing.
                </Typography>
              </Alert>
            )}

            {/* ===== ALTERNATIVES: Other options (if they want to compare) ===== */}
            {sorted.length > 1 && (
              <Box>
                <Button
                  fullWidth
                  variant="outlined"
                  endIcon={showAllDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  onClick={() => setShowAllDetails(!showAllDetails)}
                  sx={{ mb: showAllDetails ? 2 : 0 }}
                >
                  {showAllDetails ? 'Hide' : 'Compare'} Other Options ({sorted.length - 1} alternatives)
                </Button>
                
                <Collapse in={showAllDetails}>
                  <Stack gap={2}>
                    <Typography variant="body2" color="text.secondary">
                      Here are the other treatment options ranked by profitability:
                    </Typography>
                    
                    {sorted.slice(1).map((rec, idx) => {
                      const severity = getSeverity(rec.profit);
                      const colors = colorFor(severity);
                      const isProfitable = (rec.profit ?? 0) > 0;
                      const rankNumber = idx + 2;
                      
                      return (
                        <Card
                          key={`alt-${idx}`}
                          variant="outlined"
                          sx={{
                            borderColor: colors.border,
                            borderWidth: 2,
                            borderLeftWidth: 4,
                            borderLeftColor: colors.main,
                            bgcolor: 'background.paper',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              bgcolor: colors.bg,
                              transform: 'translateX(4px)',
                            },
                          }}
                        >
                          <CardContent sx={{ py: 2, px: 2.5 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
                              <Stack direction="row" alignItems="center" gap={2} flex={1}>
                                {/* Rank badge */}
                                <Box
                                  sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    bgcolor: colors.bg,
                                    border: `2px solid ${colors.main}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                  }}
                                >
                                  <Typography variant="body2" fontWeight={700} color={colors.main}>
                                    #{rankNumber}
                                  </Typography>
                                </Box>
                                
                                <Box flex={1}>
                                  <Typography variant="subtitle1" fontWeight={600}>
                                    {TreatmentOptionLabels[rec.treatment]}
                                  </Typography>
                                  {!isProfitable && (
                                    <Typography variant="caption" color="error.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                      ⚠️ Costs exceed expected benefit
                                    </Typography>
                                  )}
                                </Box>
                              </Stack>
                              
                              <Chip
                                icon={<TrendingUpIcon sx={{ fontSize: 16 }} />}
                                label={`${(rec.profit ?? 0) >= 0 ? '+' : ''}$${(rec.profit ?? 0).toFixed(2)}/acre`}
                                color={colors.chip as any}
                                sx={{ fontWeight: 700, fontSize: 13, height: 32 }}
                              />
                            </Stack>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </Stack>
                </Collapse>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    );
  }

  // ========== RENDER MODE 2: NOT PLANTED YET ==========
  // Show scenario tabs by planting window
  return <NotPlantedView 
    recommendations={recommendations}
    getSeverity={getSeverity}
    colorFor={colorFor}
  />;
}

// Component for "Not Planted Yet" users - shows tabs by planting window
function NotPlantedView({
  recommendations,
  getSeverity,
  colorFor,
}: {
  recommendations: any[];
  getSeverity: (profit: number | null | undefined) => "excellent" | "good" | "neutral" | "poor";
  colorFor: (severity: ReturnType<typeof getSeverity>) => any;
}) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showAllDetails, setShowAllDetails] = useState(false);

  // Get unique planting dates and sort them
  const plantingDates = [...new Set(recommendations.map(r => r.date))].filter(d => d !== null);
  const sortedDates = plantingDates.sort(); // sept-oct, oct-nov, nov-dec

  // Filter recommendations for selected tab
  const currentDate = sortedDates[selectedTab];
  const filteredRecs = recommendations
    .filter(r => r.date === currentDate && r.treatment !== 'cont')
    .sort((a, b) => (b.profit ?? 0) - (a.profit ?? 0));

  const allNegative = filteredRecs.every(r => (r.profit ?? 0) <= 0);
  const topRec = filteredRecs[0];
  const topSeverity = topRec ? getSeverity(topRec.profit) : 'neutral';
  const topColors = topRec ? colorFor(topSeverity) : colorFor('neutral');
  const isTopProfitable = topRec && (topRec.profit ?? 0) > 0;

  return (
    <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2, bgcolor: 'background.paper' }}>
      <CardContent>
        <Stack gap={3}>
          {/* Header */}
          <Box>
            <Typography variant="overline" fontWeight={700} color="text.secondary">
              Planning Mode
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              When should you plant?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Select a planting window to see your best treatment option for that scenario.
            </Typography>
          </Box>

          {/* Scenario Tabs */}
          <Tabs 
            value={selectedTab} 
            onChange={(_, newValue) => {
              setSelectedTab(newValue);
              setShowAllDetails(false); // Reset details when switching tabs
            }}
            variant="fullWidth"
            sx={{
              bgcolor: 'grey.100',
              borderRadius: 2,
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: { xs: '0.8rem', sm: '0.95rem' },
                py: 1.5,
              },
              '& .Mui-selected': {
                bgcolor: 'background.paper',
              },
            }}
          >
            {sortedDates.map((date) => (
              <Tab key={date} label={plantingDateOptionLabels[date] || date} />
            ))}
          </Tabs>

          <Divider />

          {/* Tab Content */}
          {currentDate && (
            <Box>
              {/* ===== SUMMARY: Best action for this scenario ===== */}
              <Box sx={{ 
                p: 3, 
                borderRadius: 2, 
                bgcolor: allNegative ? 'warning.light' : topColors.bg,
                border: `2px solid ${allNegative ? '#ed6c02' : topColors.main}`,
                mb: 3,
              }}>
                <Typography variant="overline" fontWeight={700} color="text.secondary">
                  If you plant in {plantingDateOptionLabels[currentDate]}
                </Typography>
                
                {allNegative ? (
                  <>
                    <Typography variant="h5" fontWeight={800} sx={{ mt: 1 }}>
                      → Do Nothing
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      For this planting window, all treatments cost more than they're worth.
                    </Typography>
                  </>
                ) : topRec ? (
                  <>
                    <Typography variant="h5" fontWeight={800} sx={{ mt: 1, color: topColors.main }}>
                      → {TreatmentOptionLabels[topRec.treatment]}
                    </Typography>
                    <Chip
                      icon={<TrendingUpIcon />}
                      label={`+$${(topRec.profit ?? 0).toFixed(2)}/acre profit`}
                      color={topColors.chip as any}
                      sx={{ fontWeight: 700, fontSize: 14, mt: 1.5, height: 'auto', py: 1 }}
                    />
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No data available for this scenario.
                  </Typography>
                )}
              </Box>

              {/* ===== WHY: Brief explanation ===== */}
              {!allNegative && topRec && isTopProfitable && (
                <Alert severity="info" icon={<CheckCircleIcon />} sx={{ mb: 3 }}>
                  <Typography variant="body2">
                    <strong>Why?</strong> Based on expected aphid pressure and treatment costs, 
                    this option gives you the best return if you plant during this window.
                  </Typography>
                </Alert>
              )}

              {/* ===== ALTERNATIVES: Compare other options ===== */}
              {filteredRecs.length > 1 && (
                <Box>
                  <Button
                    fullWidth
                    variant="outlined"
                    endIcon={showAllDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    onClick={() => setShowAllDetails(!showAllDetails)}
                    sx={{ mb: showAllDetails ? 2 : 0 }}
                  >
                    {showAllDetails ? 'Hide' : 'Compare'} Other Options ({filteredRecs.length - 1} alternatives)
                  </Button>
                  
                  <Collapse in={showAllDetails}>
                    <Stack gap={1.5}>
                      {filteredRecs.slice(1).map((rec, idx) => {
                        const severity = getSeverity(rec.profit);
                        const colors = colorFor(severity);
                        const isProfitable = (rec.profit ?? 0) > 0;
                        const rankNumber = idx + 2;

                        return (
                          <Card
                            key={`scenario-alt-${idx}`}
                            variant="outlined"
                            sx={{ 
                              borderColor: colors.border,
                              borderWidth: 2,
                              borderLeftWidth: 4,
                              borderLeftColor: colors.main,
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: colors.bg,
                                transform: 'translateX(4px)',
                              },
                            }}
                          >
                            <CardContent sx={{ py: 1.5, px: 2 }}>
                              <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
                                <Stack direction="row" alignItems="center" gap={1.5} flex={1}>
                                  {/* Rank badge */}
                                  <Box
                                    sx={{
                                      width: 28,
                                      height: 28,
                                      borderRadius: '50%',
                                      bgcolor: colors.bg,
                                      border: `2px solid ${colors.main}`,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      flexShrink: 0,
                                    }}
                                  >
                                    <Typography variant="caption" fontWeight={700} color={colors.main}>
                                      #{rankNumber}
                                    </Typography>
                                  </Box>
                                  
                                  <Box>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                      {TreatmentOptionLabels[rec.treatment]}
                                    </Typography>
                                    {!isProfitable && (
                                      <Typography variant="caption" color="error.main">
                                        ⚠️ Not recommended
                                      </Typography>
                                    )}
                                  </Box>
                                </Stack>
                                
                                <Chip
                                  icon={<TrendingUpIcon sx={{ fontSize: 14 }} />}
                                  label={`${(rec.profit ?? 0) >= 0 ? '+' : ''}$${(rec.profit ?? 0).toFixed(2)}/acre`}
                                  color={colors.chip as any}
                                  size="small"
                                  sx={{ fontWeight: 600 }}
                                />
                              </Stack>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </Stack>
                  </Collapse>
                </Box>
              )}
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
