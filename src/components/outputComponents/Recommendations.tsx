import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { Recommendation } from "../../store/recommendationsSlice";
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Recommendations() {
  const { recommendations, loading, error } = useSelector((state: RootState) => state.recommendations);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info">Calculating recommendations…</Alert>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">No recommendations available. Please complete the calculator to see your personalized recommendations.</Alert>
      </Container>
    );
  }

  // Sort by revenue (highest first)
  const sortedRecommendations: Recommendation[] = [...recommendations].sort((a, b) => b.profit - a.profit);
  // Determine a continuation (baseline) revenue:
  // 1) Prefer a treatment that looks like "no treatment"/"none"
  // 2) Otherwise use the lowest revenue as a conservative baseline
  const explicitBaseline = sortedRecommendations.find(r => /^(none|no[ _-]?treat(ment)?)$/i.test(r.treatment));
  const contRevenue = explicitBaseline
    ? explicitBaseline.profit
    : (sortedRecommendations[sortedRecommendations.length - 1]?.profit ?? 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Your Farm Management Recommendations
      </Typography>

      <Paper variant="outlined" sx={{ mb: 3 }}>
        <Box p={2}>
          <Typography variant="subtitle1" gutterBottom>
            Comparison with No Action (Continuation) Option
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The following options are compared to doing nothing (continuation).
          </Typography>
        </Box>
        <Divider />
        <Box>
          {sortedRecommendations.map((rec, index) => (
            <Box key={index} p={2}>
              <Typography variant="subtitle2">{rec.treatment}</Typography>
              <Box mt={1}>
                <Typography variant="caption">Revenue</Typography>
                <Typography variant="body2">${rec.profit.toLocaleString()}</Typography>
                {contRevenue !== 0 && (
                  <Typography variant="caption" color="text.secondary">
                    {rec.profit >= contRevenue ? '↑' : '↓'}
                    {Math.abs(((rec.profit - contRevenue) / contRevenue) * 100).toFixed(1)}% {rec.profit >= contRevenue ? 'higher' : 'lower'} than continuation
                  </Typography>
                )}
              </Box>
              <Accordion sx={{ mt: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="body2">More about this treatment</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              {index < sortedRecommendations.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
        </Box>
      </Paper>

      <Alert severity="info">
        <Typography variant="subtitle2">How to interpret these results</Typography>
        <Box component="ul" sx={{ pl: 2, my: 1 }}>
          <Box component="li"><strong>Best Choice:</strong> Significantly better than doing nothing (20%+ better revenue)</Box>
          <Box component="li"><strong>Good Option:</strong> Slightly better than doing nothing (5-20% better revenue)</Box>
          <Box component="li"><strong>Not Recommended:</strong> Worse than doing nothing (lower revenue)</Box>
        </Box>
      </Alert>
    </Container>
  );
}

export default Recommendations;