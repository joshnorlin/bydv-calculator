import { Box, Button, Container, Card, CardContent, Typography, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";

export function Home() {
  // Resolve hero image (remote) so it loads reliably in production
  const heroUrl = "https://smallgrainsbydv.nkn.uidaho.edu/assets/img/Firefly_BYDV_r4.jpg";
  // Local images for feature cards
  const imgLeavesUrl = new URL("../assets/images/healthy vs discolored leaves.jpg", import.meta.url).href;
  const imgFieldUrl = new URL("../assets/images/wheat field with healthy and infected plants.jpg", import.meta.url).href;
  const imgAphidUrl = new URL("../assets/images/bird cherry-oat aphid.png", import.meta.url).href;

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 420, md: 560 },
          display: "flex",
          alignItems: "center",
          color: "common.white",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mt: { xs: 6, md: 10 } }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
              BYDV Risk Calculator for Virginia Wheat
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Climate shifts have made older aphid management guidance outdated. This tool helps
              Virginia farmers assess current aphid pressure and barley yellow dwarf virus (BYDV)
              risk, so you can focus on actions that are most likely to pay.
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Built from ongoing research, it translates scouting and local conditions into
              practical recommendations—like planting date adjustments, seed treatments, and when a
              foliar spray is warranted vs. when it isn’t.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button variant="contained" size="large" component={RouterLink} to="/calculator">
                View Calculator
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/about"
                color="secondary"
                sx={{
                  color: "common.white",
                  borderColor: "rgba(255,255,255,0.7)",
                  backgroundColor: "rgba(0,0,0,0.2)",
                  '&:hover': {
                    borderColor: "common.white",
                    backgroundColor: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                Learn more about the project
              </Button>
            </Stack>
            <Typography variant="caption" sx={{ display: "block", mt: 1, opacity: 0.9 }}>
              For farmers in Virginia. Results and recommendations are scoped to Virginia field
              conditions.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container columns={12} spacing={3}>
          <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Data-driven assessments
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 2, alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Turn simple scouting into an objective risk picture.
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Combine scouting observations with local context to estimate aphid pressure and
                      potential BYDV risk.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Look for leaf yellowing/reddening and check grassy edges where aphids and virus
                      reservoirs persist.
                    </Typography>
                  </Box>
                  <Box>
                    <Box component="img" src={imgLeavesUrl} alt="Healthy vs discolored BYDV-affected wheat leaves" sx={{ width: '100%', height: { xs: 160, md: 220 }, objectFit: 'cover', borderRadius: 1 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Economic thresholds
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 2, alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Clear, Virginia-specific guidance on when actions are likely to pay.
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Translate field conditions into actionable thresholds to support economical
                      treatment decisions.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Updated for today’s climate and costs—know when planting date or seed treatment
                      provide value, and when a foliar spray is unlikely to pay.
                    </Typography>
                  </Box>
                  <Box>
                    <Box component="img" src={imgFieldUrl} alt="Wheat field with healthy and BYDV-affected areas" sx={{ width: '100%', height: { xs: 160, md: 220 }, objectFit: 'cover', borderRadius: 1 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Transparent recommendations
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 2, alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Understand the “why” behind every suggestion.
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      See why suggestions are made and how changes in inputs affect outcomes.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Guidance reflects aphid pressure, timing, and local context so you can preview
                      next steps and fine‑tune actions that fit your farm.
                    </Typography>
                  </Box>
                  <Box>
                    <Box component="img" src={imgAphidUrl} alt="Bird cherry-oat aphid on wheat" sx={{ width: '100%', height: { xs: 160, md: 220 }, objectFit: 'cover', borderRadius: 1 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 6, md: 10 } }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            Managing BYDV and cereal aphids in winter wheat
          </Typography>
          <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
            Project motivation
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            BYDV, spread by cereal aphids, threatens winter wheat across the Southeast. While IPM
            remains the best approach, much of the guidance on planting date, seed treatments, and
            foliar sprays comes from data over 20 years old and no longer fits today’s climate
            patterns. This project updates those recommendations for Virginia growers.
          </Typography>

          <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
            Objectives (2024–2027)
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 0 }}>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Identify regional reservoirs of BYDV and aphid vectors
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Establish field plots to demonstrate practices that minimize the virus
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Estimate farm profitability impacts using decision-support tools
            </Typography>
            <Typography component="li" variant="body1">
              Develop educational materials and workshops to increase grower awareness
            </Typography>
          </Box>
        </Box>

        <Box sx={{ textAlign: "center", mt: { xs: 6, md: 10 } }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            Get started
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Quickly estimate BYDV risk and see which actions are likely to provide value this
            season.
          </Typography>
          <Typography variant="caption" sx={{ display: "block", mb: 3, opacity: 0.9 }}>
            Virginia-only calculator. Designed for winter wheat fields in Virginia.
          </Typography>
          <Button variant="contained" size="large" component={RouterLink} to="/calculator">
            View Calculator
          </Button>
        </Box>
        <Box component="footer" sx={{ mt: { xs: 6, md: 12 }, pt: 4, pb: 6, borderTop: 1, borderColor: "divider" }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
            Acknowledgements
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.5 }}>
            This work is supported by the CARE Program from the USDA National Institute of Food and
            Agriculture. Grant number 2024-68008-42760.
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Conducted in conjunction with Virginia Tech and the University of Idaho.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}