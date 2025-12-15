import { Card, CardContent, Stack, Typography, Box, Alert } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export function RecommendationsDisclaimer() {
  return (
    <Card sx={{ p: 3, borderRadius: 2, boxShadow: 1, bgcolor: 'grey.50', border: '1px solid', borderColor: 'warning.light' }}>
      <CardContent>
        <Stack gap={2}>
          <Alert severity="warning" sx={{ '& .MuiAlert-message': { width: '100%' } }}>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Read this carefully before making treatment decisions
            </Typography>
          </Alert>

          <Box>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Data Sources and Limitations
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              The recommendations provided by this tool are based on:
            </Typography>
            <Typography variant="body2" color="text.secondary" component="ul" sx={{ pl: 3, mb: 2 }}>
              <li>Limited historical field trial data from specific locations in Idaho</li>
              <li>Average aphid pressure levels that may not reflect your specific field conditions</li>
              <li>Yield and treatment efficacy estimates derived from research trials</li>
              <li>Treatment cost assumptions that may differ from actual local pricing</li>
              <li>Statistical models with inherent uncertainty and assumptions</li>
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              No Guarantees
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              This tool provides <strong>estimates only</strong>. Actual results will vary based on:
            </Typography>
            <Typography variant="body2" color="text.secondary" component="ul" sx={{ pl: 3, mb: 2 }}>
              <li>Your specific field conditions, soil type, and microclimate</li>
              <li>Actual aphid pressure and timing of infestations</li>
              <li>Weather conditions during the growing season</li>
              <li>Application timing, coverage, and technique</li>
              <li>Crop variety, vigor, and overall field management</li>
              <li>Market prices at harvest versus estimates used in calculations</li>
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Limitation of Liability
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>The University of Idaho, Virginia Tech, their researchers, developers, and affiliates make no warranties</strong> about the accuracy, reliability, completeness, or timeliness of this tool or the information it provides. 
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>We are not responsible for any losses, damages, or crop failures</strong> that may result from decisions made based on this tool's recommendations. Users assume all risks associated with treatment decisions.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Professional Guidance Required
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              This tool is designed to be an informational resource, not a replacement for professional agronomic advice. You should:
            </Typography>
            <Typography variant="body2" color="text.secondary" component="ul" sx={{ pl: 3 }}>
              <li>Consult with certified crop advisors and agronomists familiar with your region</li>
              <li>Scout your fields regularly to assess actual pest pressure</li>
              <li>Always read and follow pesticide label directions and legal requirements</li>
              <li>Consider your specific risk tolerance and financial situation</li>
              <li>Verify current market prices and treatment costs before making decisions</li>
            </Typography>
          </Box>

          <Alert severity="info" sx={{ mt: 1 }}>
            <Typography variant="body2">
              <strong>By using this tool</strong>, you acknowledge that you have read and understood these limitations and agree that treatment decisions are made at your own risk and discretion.
            </Typography>
          </Alert>
        </Stack>
      </CardContent>
    </Card>
  );
}
