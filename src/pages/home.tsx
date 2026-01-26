import { Box, Button, Container, Paper, Typography, Stack } from "@mui/material";
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
          aligns: "center",
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
              practical recommendations - like planting date adjustments, seed treatments, and when a
              foliar spray is warranted vs. when it isn't.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button variant="contained" size="large" component={RouterLink} to="/calculator?noAutoFocus=true">
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
        <Stack spacing={{ xs: 4, md: 6 }}>
          
          {/* ========== SECTION 1: The Problem - Image LEFT ========== */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: '#FFF8E1',
            }}
          >
            <Box
              component="img"
              src={imgLeavesUrl}
              alt="Healthy vs discolored BYDV-affected wheat leaves"
              sx={{
                width: { xs: '100%', md: '45%' },
                aspectRatio: { xs: '4 / 3', md: '1 / 1' },
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
            <Box sx={{ p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>The Problem</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Barley Yellow Dwarf Virus (BYDV) threatens Virginia's winter wheat. As weather patterns shift, aphids are moving and surviving differently, and advice that once worked no longer fits.
              </Typography>
              <Typography variant="body1">
                Routine, calendar-based spraying doesn't guarantee control or profit. Unnecessary insecticide use costs money, knocks back beneficial insects, and can undermine long-term profitability.
              </Typography>
            </Box>
          </Box>

          {/* ========== SECTION 2: Our Approach - Image RIGHT ========== */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row-reverse' },
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: 'grey.100',
            }}
          >
            <Box
              component="img"
              src={imgFieldUrl}
              alt="Field trials in Virginia"
              sx={{
                width: { xs: '100%', md: '45%' },
                aspectRatio: { xs: '4 / 3', md: '1 / 1' },
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
            <Box sx={{ p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Our Approach</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Virginia Tech and the University of Idaho are combining field trials with economic modeling to refresh Integrated Pest Management (IPM) guidance for today's conditions.
              </Typography>
              <Typography variant="body1">
                We're testing planting dates, seed treatments, and well-timed foliar applications, and evaluating how shifting climate affects aphid pressure and BYDV risk - so growers get guidance that reflects what's happening now.
              </Typography>
            </Box>
          </Box>

          {/* ========== SECTION 3: The Tool - Image LEFT ========== */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: '#E8F5E9',
            }}
          >
            <Box
              component="img"
              src={imgAphidUrl}
              alt="Bird cherry-oat aphid on wheat"
              sx={{
                width: { xs: '100%', md: '45%' },
                aspectRatio: { xs: '4 / 3', md: '1 / 1' },
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
            <Box sx={{ p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>The Tool</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                The BYDV Profitability Calculator helps you assess risk for your field and timing, compare management options, and see when a treatment is worth the cost.
              </Typography>
              <Typography variant="body1">
                It's built on real field data and transparent assumptions, so you can make confident, cost-effective decisions with less guesswork.
              </Typography>
            </Box>
          </Box>

          {/* ========== SECTION 4: Why It Matters - Image RIGHT ========== */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row-reverse' },
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: 'grey.100',
            }}
          >
            <Box
              component="img"
              src={imgFieldUrl}
              alt="Wheat field in Virginia"
              sx={{
                width: { xs: '100%', md: '45%' },
                aspectRatio: { xs: '4 / 3', md: '1 / 1' },
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
            <Box sx={{ p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Why It Matters</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Smarter management protects yield, saves money, and reduces unnecessary pesticide use. Updated guidance keeps pace with today's climate and pest pressures.
              </Typography>
              <Typography variant="body1">
                Every informed decision supports long-term farm profitability and the next generation of small-acreage growers across Virginia.
              </Typography>
            </Box>
          </Box>

          {/* ========== CTA SECTION ========== */}
          <Paper elevation={0} sx={{ textAlign: 'center', bgcolor: 'background.paper', borderRadius: 3, py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>Get Started</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Quickly estimate BYDV risk and see which actions are likely to provide value this season.
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mb: 3, opacity: 0.9 }}>
              Virginia-only calculator. Designed for winter wheat fields in Virginia.
            </Typography>
            <Button variant="contained" size="large" component={RouterLink} to="/calculator">
              View Calculator
            </Button>
          </Paper>

          <Box component="footer" sx={{ pt: 4, pb: 6, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
              Acknowledgements
            </Typography>
            <Typography variant="body2" sx={{ mb: 1.5 }}>
              This work is supported by the CARE Program from the USDA National Institute of Food and Agriculture. Grant number 2024-68008-42760.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Conducted in conjunction with Virginia Tech and the University of Idaho.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}