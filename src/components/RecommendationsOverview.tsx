import { Card, CardContent, Stack, Typography, Divider, Chip, Box, Alert } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

export function RecommendationsOverview() {
  return (
    <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2, bgcolor: 'grey.50', border: '2px solid', borderColor: 'primary.main' }}>
      <CardContent>
        <Stack gap={3}>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <InfoOutlinedIcon color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h4" fontWeight={700}>How to Read Your Recommendations</Typography>
              <Typography variant="body2" color="text.secondary">
                Understanding profit comparisons and what the numbers mean
              </Typography>
            </Box>
          </Stack>

          <Divider />

          <Alert severity="info" sx={{ '& .MuiAlert-message': { width: '100%' } }}>
            <Typography variant="body1" fontWeight={600}>
              All profit values show the gain or loss per acre compared to doing nothing (the baseline).
            </Typography>
          </Alert>

          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              What Do The Numbers Mean?
            </Typography>
            <Stack gap={2}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <TrendingUpIcon color="success" sx={{ fontSize: 28, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} color="success.main">
                    Positive Values (e.g., +$45.20/acre)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This treatment is expected to <strong>increase profit</strong> compared to doing nothing. 
                    For example, +$45.20 means you'd make $45.20 more per acre by using this treatment than by taking no action.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <TrendingDownIcon color="error" sx={{ fontSize: 28, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} color="error.main">
                    Negative Values (e.g., -$12.50/acre)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This treatment is expected to <strong>decrease profit</strong> compared to doing nothing.
                    For example, -$12.50 means you'd lose $12.50 per acre by using this treatment. The treatment cost exceeds the yield benefit.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <TrendingFlatIcon color="action" sx={{ fontSize: 28, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                    Zero or Near-Zero Values (e.g., $0.00 - $5.00/acre)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Treatment costs and benefits roughly balance out. These options are <strong>economically neutral</strong> - 
                    neither significantly better nor worse than doing nothing.
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Divider />

          <Box sx={{ bgcolor: 'warning.light', p: 2, borderRadius: 2, border: '1px solid', borderColor: 'warning.main' }}>
            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#000' }}>
              When All Values Are Negative
            </Typography>
            <Typography variant="body2" color="text.secondary">
              If <strong>all recommendations show negative profit values</strong>, the best economic decision is to 
              <strong> do nothing</strong>. This means expected aphid pressure is low enough that treatment costs would 
              exceed any yield benefits. You would lose money on every treatment option compared to leaving the field untreated.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Key Points to Remember
            </Typography>
            <Stack gap={1.5}>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Chip label="1" size="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  <strong>Per Acre Values:</strong> All profits are per acre. Multiply by your total acres to estimate field-level impact.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Chip label="2" size="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  <strong>Baseline is "Doing Nothing":</strong> Every number compares to taking no action at all. 
                  "Doing nothing" always has a profit of $0 because it's the reference point.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Chip label="3" size="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  <strong>Estimates Only:</strong> These are projections based on historical data and assumptions. 
                  Actual results depend on weather, actual aphid pressure, application quality, and many other factors.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Chip label="4" size="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  <strong>Scout Your Fields:</strong> Use these recommendations as a guide, but always monitor your specific 
                  fields and adjust decisions based on actual observed aphid pressure.
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
