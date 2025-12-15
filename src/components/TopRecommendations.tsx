import { Stack, Typography, Box, Chip, useTheme, Tooltip, Button, Card, CardContent } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { TreatmentOptionLabels } from "../types/types";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export function TopRecommendations() {
  const theme = useTheme();
  const recommendations = useSelector(
    (state: RootState) => state.recommendations.recommendations
  );

  const sorted = recommendations
    .filter(r => r.treatment !== 'cont')
    .slice()
    .sort((a, b) => (b.profit ?? 0) - (a.profit ?? 0));

  const topThree = sorted.slice(0, 3);

  const getSeverity = (profit: number | null | undefined) => {
    const p = profit ?? 0;
    if (p >= 15) return "excellent" as const;
    if (p > 5) return "good" as const;
    if (p > -5) return "neutral" as const;
    return "poor" as const;
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

  if (sorted.length === 0) {
    return null;
  }

  return (
    <Box>
      <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 3 }}>
        <EmojiEventsIcon color="warning" sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Your Top Recommendations
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Most profitable treatment and timing combinations for your situation
          </Typography>
        </Box>
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        These are the three most economically attractive options based on your field data. Each shows estimated profit per acre compared to doing nothing.
      </Typography>

      <Box sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        mb: 4,
      }}>
        {topThree.map((rec, i) => {
          const severity = getSeverity(rec.profit);
          const colors = colorFor(severity);
          const rankBadges = ['🥇', '🥈', '🥉'];
          
          return (
            <Card
              key={`top-${i}`}
              sx={{
                height: '100%',
                borderRadius: 2,
                border: `3px solid ${colors.border}`,
                bgcolor: colors.bg,
                position: 'relative',
                overflow: 'visible',
                transform: i === 0 ? 'scale(1.02)' : 'scale(1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: i === 0 ? 4 : 2,
                '&:hover': {
                  transform: i === 0 ? 'scale(1.04)' : 'scale(1.02)',
                  boxShadow: 6,
                }
              }}
            >
              {i === 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -16,
                    left: 16,
                    bgcolor: 'warning.main',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: 14,
                    textAlign: 'center',
                  }}
                >
                  Top Pick
                </Box>
              )}
              
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
                  <Typography variant="h3" sx={{ fontSize: 48, lineHeight: 1 }}>
                    {rankBadges[i]}
                  </Typography>
                  <Chip
                    label={`#${i + 1}`}
                    color={colors.chip as any}
                    sx={{ fontWeight: 700, height: 32, fontSize: 12 }}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    {TreatmentOptionLabels[rec.treatment]}
                  </Typography>

                  <Stack gap={1.5}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        PLANTING TIME
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {rec.date}
                      </Typography>
                    </Box>

                    <Chip
                      icon={<TrendingUpIcon />}
                      size="medium"
                      color={colors.chip as any}
                      label={`${(rec.profit ?? 0) >= 0 ? '+' : ''}$${(rec.profit ?? 0).toFixed(2)}/acre`}
                      sx={{ fontWeight: 700, fontSize: 14, height: 'auto', py: 1 }}
                    />
                  </Stack>
                </Box>

                <Tooltip title="See detailed breakdown below for all treatment options">
                  <Button
                    size="small"
                    variant="outlined"
                    color={colors.chip as any}
                    fullWidth
                    sx={{ mt: 'auto' }}
                  >
                    View Details
                  </Button>
                </Tooltip>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Box sx={{
        p: 2,
        bgcolor: 'info.light',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'info.main',
      }}>
        <Stack direction="row" gap={1.5}>
          <TrendingUpIcon sx={{ color: 'info.main', flexShrink: 0 }} />
          <Stack gap={0.5}>
            <Typography variant="body2" fontWeight={700} color="info.dark">
              What these numbers mean
            </Typography>
            <Typography variant="body2" fontSize={12} color="info.dark">
              <strong>Positive values</strong> = more profit than doing nothing. <strong>Negative values</strong> = less profit than doing nothing. The highest number represents your best economic choice.
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
