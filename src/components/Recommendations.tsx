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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
// Using CSS grid via Box to avoid Grid version/type issues
import { TreatmentOptionLabels } from "../types/types";

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

  return (
    <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2, display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <CardContent>
        <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" gap={3}>
          
          {/* Header */}
          <Box sx={{ width: '100%' }}>
            <Stack direction="row" alignItems="center" gap={1.5}>
              <CategoryIcon color="primary" sx={{ fontSize: 36 }} />
              <Box>
                <Typography variant="h4" fontWeight={700}>All Recommendations</Typography>
                <Typography variant="body2" color="text.secondary">
                  Complete breakdown by treatment type and timing
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Alert if all negative */}
          {allNegative && (
            <Alert severity="warning" sx={{ width: '100%' }}>
              <Typography variant="body2" fontWeight={600}>
                All treatment options show negative returns. The most profitable choice is to <strong>do nothing</strong>.
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                Expected aphid pressure appears low enough that treatment costs exceed yield benefits. Continue monitoring your fields.
              </Typography>
            </Alert>
          )}

          {/* Legend */}
          <Stack direction="row" gap={1} flexWrap="wrap" sx={{ width: '100%' }}>
            <Chip size="small" label="Excellent (dark green)" sx={{ bgcolor: theme.palette.success.dark, color: 'white' }} />
            <Chip size="small" label="Good (green)" color="success" variant="outlined" />
            <Chip size="small" label="Neutral (gray)" color="default" variant="filled" />
            <Chip size="small" label="Poor (red)" color="error" variant="filled" />
          </Stack>

          <Divider sx={{ width: '100%' }} />

          {/* Groups by treatment */}
          {sorted.length === 0 ? (
            <Typography color="text.secondary">No recommendations available.</Typography>
          ) : (
            <Box sx={{ width: '100%' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Detailed breakdown showing each treatment's profitability across different planting times
              </Typography>
              <Box sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: '1fr',
              }}>
                {groups.map((group) => (
                  <Card key={`group-${group.key}`} variant="outlined" sx={{ borderRadius: 2, borderWidth: 2 }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>{group.label}</Typography>
                      <Table size="small" aria-label={`${group.label} planting times`}>
                        <TableHead>
                          <TableRow>
                            <TableCell><Typography variant="body2" fontWeight={700}>Planting Time</Typography></TableCell>
                            <TableCell align="right"><Typography variant="body2" fontWeight={700}>Profit vs Doing Nothing</Typography></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {group.items.map((rec, idx) => {
                            const severity = getSeverity(rec.profit);
                            const colors = colorFor(severity);
                            return (
                              <TableRow 
                                key={`${group.key}-${idx}`} 
                                sx={{
                                  '&:last-child td, &:last-child th': { border: 0 },
                                  backgroundColor: colors.bg,
                                  borderLeft: `4px solid ${colors.main}`,
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  <Stack direction="row" alignItems="center" gap={1.5}>
                                    <Box sx={{ 
                                      width: 12, 
                                      height: 12, 
                                      borderRadius: 1, 
                                      bgcolor: colors.main,
                                      boxShadow: 1,
                                    }} />
                                    <Typography variant="body2" fontWeight={600}>{rec.date}</Typography>
                                  </Stack>
                                </TableCell>
                                <TableCell align="right">
                                  <Tooltip title="Estimated net profit per acre compared to doing nothing">
                                    <Chip 
                                      size="small" 
                                      color={colors.chip as any} 
                                      label={`${(rec.profit ?? 0) >= 0 ? '+' : ''}$${(rec.profit ?? 0).toFixed(2)} / acre`}
                                      sx={{ fontWeight: 600 }}
                                    />
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
        </Stack>
      </CardContent>
    </Card>
  );
}
