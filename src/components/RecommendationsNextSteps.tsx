import { Card, CardContent, Stack, Typography, List, ListItem, ListItemText, Divider, Box } from "@mui/material";

export function RecommendationsNextSteps() {
  return (
    <Card sx={{ maxWidth: 1200, mx: "auto", my: 2, p: { xs: 1, sm: 2 } }}>
      <CardContent>
        <Stack gap={2}>
          <Box>
            <Typography variant="overline" color="text.secondary">Action plan</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -0.2 }}>Next steps</Typography>
          </Box>
          <Divider />
          <Box>
            <List sx={{ '& .MuiListItem-root': { mb: 1.5, p: 0 } }}>
              <ListItem>
                <Box sx={{
                  mr: 1.5,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: 'grey.200',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 12,
                  color: 'text.primary'
                }}>1</Box>
                <ListItemText
                  primary="Scout regularly"
                  secondary="Check aphid levels weekly during vulnerable stages and after planting. Increase frequency if pressure rises."
                />
              </ListItem>
              <ListItem>
                <Box sx={{ mr: 1.5, width: 28, height: 28, borderRadius: '50%', bgcolor: 'grey.200', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: 'text.primary' }}>2</Box>
                <ListItemText
                  primary="Choose a strategy"
                  secondary="Use the Top 3 and By treatment tables above to pick the highest per-acre profit for your timing and conditions."
                />
              </ListItem>
              <ListItem>
                <Box sx={{ mr: 1.5, width: 28, height: 28, borderRadius: '50%', bgcolor: 'grey.200', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: 'text.primary' }}>3</Box>
                <ListItemText
                  primary="Plan timing and logistics"
                  secondary="For seed treatments, arrange before planting. For foliar sprays, target the correct growth stage and a good weather window."
                />
              </ListItem>
              <ListItem>
                <Box sx={{ mr: 1.5, width: 28, height: 28, borderRadius: '50%', bgcolor: 'grey.200', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: 'text.primary' }}>4</Box>
                <ListItemText
                  primary="Run the math for your acres"
                  secondary="Multiply the per-acre profit by your field size to estimate total impact and verify it pencils out."
                />
              </ListItem>
              <ListItem>
                <Box sx={{ mr: 1.5, width: 28, height: 28, borderRadius: '50%', bgcolor: 'grey.200', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: 'text.primary' }}>5</Box>
                <ListItemText
                  primary="Review labels and compliance"
                  secondary="Confirm products, rates, PHIs/REIs, and safety requirements with your advisor and follow all label directions."
                />
              </ListItem>
            </List>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
