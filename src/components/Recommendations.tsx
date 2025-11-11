import { useMemo } from "react";
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
  Tooltip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
// Using CSS grid via Box to avoid Grid version/type issues
import { TreatmentOptionLabels } from "../types/types";

export function Recommendations() {
  const theme = useTheme();

  // Get recommendations from Redux
  const recommendations = useSelector(
    (state: RootState) => state.recommendations.recommendations
  );

  // Memoize pre-processing: keep all (including 0 profit), sort desc by profit
  const sorted = useMemo(() => {
    return recommendations
      .filter(r => r.treatment !== 'cont')
      .slice()
      .sort((a, b) => (b.profit ?? 0) - (a.profit ?? 0));
  }, [recommendations]);

  // Top 3 overall
  const topThree = useMemo(() => sorted.slice(0, 3), [sorted]);

  // Group by treatment -> array of up to 3 planting times
  const groups = useMemo(() => {
    const map = new Map<string | number, typeof sorted>();
    for (const rec of sorted) {
      const key = rec.treatment as unknown as string | number;
      const arr = map.get(key) ?? [] as any[];
      arr.push(rec);
      map.set(key, arr);
    }
    return Array.from(map.entries()).map(([key, arr]) => ({
      key,
      label: TreatmentOptionLabels as any ? (TreatmentOptionLabels as any)[key as any] ?? String(key) : String(key),
      items: arr.sort((a, b) => (b.profit ?? 0) - (a.profit ?? 0)),
    }));
  }, [sorted]);

  // Map profit -> visual severity buckets
  const getSeverity = (profit: number | null | undefined) => {
    const p = profit ?? 0;
    if (p >= 1000) return "good" as const; // strong positive
    if (p > 0) return "fair" as const; // modest positive
    if (p === 0) return "neutral" as const;
    return "poor" as const; // negative
  };

  const colorFor = (severity: ReturnType<typeof getSeverity>) => {
    switch (severity) {
      case "good":
        return {
          // Light green emphasis
          main: theme.palette.success.main,
          bg: theme.palette.success.light,
          chip: "success",
        } as const;
      case "fair":
        return {
          // Also green, but same light scheme for clarity
          main: theme.palette.success.main,
          bg: theme.palette.success.light,
          chip: "success",
        } as const;
      case "neutral":
        return {
          // Medium gray to de-emphasize
          main: theme.palette.grey[600],
          bg: theme.palette.grey[200],
          chip: "default",
        } as const;
      case "poor":
      default:
        return {
          main: theme.palette.error.main,
          bg: theme.palette.error.light,
          chip: "error",
        } as const;
    }
  };

  return (
    <Card sx={{ height: '100%', p: { xs: 1, sm: 2 }, display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap={2}>
          <Typography variant="h5">Recommendations (profit per acre vs doing nothing)</Typography>
          <Stack direction="row" gap={1} flexWrap="wrap">
            <Chip size="small" label="Best (green)" color="success" variant="filled" />
            <Chip size="small" label="Good (green)" color="success" variant="outlined" />
            <Chip size="small" label="Neutral (gray)" color="default" variant="filled" />
            <Chip size="small" label="Poor (red)" color="error" variant="filled" />
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Values shown are estimated net profit per acre compared to doing nothing. Positive = more profit than no treatment; negative = less profit.
        </Typography>

        {/* Top 3 overall */}
        {sorted.length === 0 ? (
          <Typography color="text.secondary">No recommendations available.</Typography>
        ) : (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }} fontWeight={600}>Top 3 overall (profit per acre vs doing nothing)</Typography>
            <Box sx={{
              mb: 3,
              display: 'grid',
              gap: 1,
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            }}>
              {topThree.map((rec, i) => {
                const severity = getSeverity(rec.profit);
                const colors = colorFor(severity);
                return (
                  <Paper key={`top-${i}`} elevation={0} sx={{ p: 1.5, borderRadius: 2, border: `1px solid ${colors.main}`, bgcolor: colors.bg }}>
                    <Stack gap={0.5}>
                      <Typography variant="body2" fontWeight={600}>
                        {TreatmentOptionLabels[rec.treatment]} — {rec.date}
                      </Typography>
                      <Chip size="small" color={colors.chip as any} label={`Profit: $${(rec.profit ?? 0).toFixed(2)}`} sx={{ alignSelf: 'flex-start' }} />
                    </Stack>
                  </Paper>
                );
              })}
            </Box>

            {/* Groups by treatment */}
            <Typography variant="subtitle1" sx={{ mb: 1 }} fontWeight={600}>By treatment</Typography>
            <Box sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            }}>
              {groups.map((group) => (
                <Card key={`group-${group.key}`} variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>{group.label}</Typography>
                    <Table size="small" aria-label={`${group.label} planting times`}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Planting time</TableCell>
                          <TableCell align="right">Profit vs doing nothing</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {group.items.map((rec, idx) => {
                          const severity = getSeverity(rec.profit);
                          const colors = colorFor(severity);
                          return (
                            <TableRow key={`${group.key}-${idx}`} sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                              backgroundColor: colors.bg,
                            }}>
                              <TableCell component="th" scope="row">
                                <Stack direction="row" alignItems="center" gap={1}>
                                  <Box sx={{ width: 8, height: 8, borderRadius: 1, bgcolor: colors.main }} />
                                  <Typography variant="body2">{rec.date}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="right">
                                <Tooltip title="Estimated net profit per acre">
                                  <Chip size="small" color={colors.chip as any} label={`$${(rec.profit ?? 0).toFixed(2)} / acre`} />
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
