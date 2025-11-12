import { Card, CardContent, List, ListItem, ListItemText, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function RecommendationsSidebarInfo() {
  return (
    <Card sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Helpful Info</Typography>

        <Accordion disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={700}>What are these treatments?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              <ListItem disableGutters>
                <ListItemText
                  primary="Foliar insecticide spray"
                  secondary="Applied to foliage after emergence when scouting indicates pressure near a threshold. Works by contact or ingestion. Includes product and application costs."
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText
                  primary="Neonicotinoid seed treatment (seed coating)"
                  secondary="Applied to seed before planting. Provides early-season systemic protection as seedlings grow. Timing is pre-plant; protection window is early season."
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText
                  primary="Both seed treatment + foliar spray"
                  secondary="Seed treatment for early protection, and a foliar spray later if scouting shows pressure. More control and more cost; profitability depends on pressure and timing."
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText
                  primary="Do nothing"
                  secondary="Sometimes most profitable when expected pressure and yield impact are low. This is the baseline for comparison."
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={700}>How to read the data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              <ListItem disableGutters>
                <ListItemText primary="Per acre" secondary="Every profit value is per acre. Multiply by your acres for total impact." />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Baseline = doing nothing" secondary="Numbers show change in net profit compared to no treatment. Positive = more profit than doing nothing; negative = less." />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Timing matters" secondary="Different planting or application times affect profitability. Choose the row best matching your timing." />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Uncertainty" secondary="Estimates are based on limited data and assumptions; results vary with conditions." />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}
