import A from "../visualComponents/A";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';

function CalculatorInformation() {
  return (
    <Box component="section">
      {/* Spacer to avoid overlap with fixed AppBar */}
      <Toolbar />
      <Container maxWidth="lg">
        <Box py={4} textAlign="center">
          <Grid container spacing={3} justifyContent="center">
            <Grid>
              <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  What is this page about?
                </Typography>
                <Typography variant="body1" color="text.primary">
                  This page helps farmers better understand <A href="/calculator/help#pest-management" text="pest management techniques"/> and become more aware of their agricultural situation.
                </Typography>
              </Paper>
            </Grid>
            <Grid>
              <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  How you can use this page.
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Enter information about your crops and farming season, then find out which pest methods may be best for you, keeping your revenue in mind.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default CalculatorInformation;