import { Card, CardContent, Stack, Typography, Divider, Chip, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function RecommendationsOverview() {
  return (
    <Card sx={{ maxWidth: 1200, mx: "auto", my: 2, p: { xs: 1, sm: 2 } }}>
      <CardContent>
        <Stack gap={2}>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap={2}>
            <Typography variant="h5">Aphid management profit recommendations</Typography>
            <Chip size="small" color="primary" label="Profits are per acre vs doing nothing" />
          </Stack>

          <Divider />

          <Typography variant="body1" color="text.secondary">
            Based on the information you provided about your field and expected aphid pressure, the tool estimates which actions are likely to be most profitable. All values are changes in net profit per acre relative to taking no action.
          </Typography>

          <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="assumptions-content" id="assumptions-header">
              <Typography fontWeight={700}>Assumptions, data, and limitations</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                These recommendations are based on limited datasets and simplifying assumptions (example values shown):
              </Typography>
              <List dense>
                <ListItem disableGutters>
                  <ListItemText primary="Aphid pressure" secondary="Average of 2 aphids per plant at early growth, varying by field and season." />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="Yield parameters" secondary="Mean yield X bu/ac with standard deviation Y bu/ac under baseline conditions." />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="Price assumptions" secondary="Commodity price of $P per bu; treatment and application costs as entered or typical for the region." />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="Efficacy ranges" secondary="Seed treatment provides early-season suppression; foliar efficacy depends on timing and coverage." />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="Statistical method" secondary="Simple profit comparison using mean expected yield impacts and costs; uncertainty not fully captured." />
                </ListItem>
              </List>
              <Typography variant="caption" color="text.secondary">
                This tool is informational and not a guarantee of performance. Always follow label directions and consult local agronomic guidance.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </CardContent>
    </Card>
  );
}
