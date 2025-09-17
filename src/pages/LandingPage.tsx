import { useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';

const LandingPage = () => {
  useEffect(() => {
    // Placeholder: reserved for future scroll-based effects if needed
  }, []);

  const teamMembers = [
    {
      name: 'Dr. Arash Rashed',
      role: 'Director and Professor of Entomology',
      affiliation: 'Virginia Tech',
      email: 'arashr@vt.edu',
      photo: 'arash_rashed.jpg'
    },
    {
      name: 'Dr. Patrick Hatzenbuehler',
      role: 'Assistant Professor and Extension Specialist',
      affiliation: 'University of Idaho',
      email: 'phatzenbuehler@uidaho.edu',
      photo: 'pat_hatzenbuehler.jpg'
    },
    // Add other team members here
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box component="section" sx={{ pt: 12, pb: 8, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography variant="h3" component="h1" gutterBottom>
              Small Grains BYDV Calculator
            </Typography>
            <Typography variant="h6" component="p" sx={{ mb: 3 }}>
              A tool for managing and predicting Barley Yellow Dwarf Virus in small grains
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button href="./calculator" variant="contained" color="secondary">
                Try the Calculator
              </Button>
              <Button href="./about" variant="outlined" color="inherit">
                Learn More
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

        {/* Rest of the content */}
        

      {/* Hero Section */}
      <Box id="home" component="section" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h5" component="h2">
            Managing barley yellow dwarf virus and cereal aphids in winter wheat
          </Typography>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about" component="section" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Project Motivation
              </Typography>
              <Typography paragraph>
                <strong>Barley yellow dwarf virus (BYDV)</strong>, transmitted by several species of cereal aphids,
                is the most important viral disease of winter cereals globally, and has been a threat to winter
                wheat in the southeastern U.S. in recent years.
              </Typography>
              <Typography paragraph>
                Although integrated pest management (IPM) is the most effective approach to managing BYDV and aphids,
                the recommended strategies in the southeastern U.S. (i.e., planting date, seed treatment, and/or
                timing of foliar insecticide application) are based on information generated more than two decades
                ago, which no longer fit our current climate patterns or best management practices.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Objectives
              </Typography>
              <Typography paragraph>
                The project is funded from July 2024 through June 2027, and its objectives include:
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0 }}>
                <Box component="li">Identifying regional reservoirs of barley yellow dwarf virus and aphid vectors</Box>
                <Box component="li">Establishing field plots to determine and demonstrate appropriate practices to minimize the virus</Box>
                <Box component="li">Estimating farm profitability implications of damage with decision-support tools</Box>
                <Box component="li">Developing educational material and workshop opportunities to increase grower awareness</Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box id="team" component="section" sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom>
            Meet our Team
          </Typography>
          <Grid container spacing={3}>
            {teamMembers.map((member, index) => (
              <Grid key={index} item xs={12} md={6}>
                <Card>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <CardMedia
                        component="img"
                        image={`../../assets/img/${member.photo}`}
                        alt={member.name}
                        sx={{ height: 160, objectFit: 'cover' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <CardContent>
                        <Typography variant="h6">{member.name}</Typography>
                        <Typography variant="body2">{member.role}</Typography>
                        <Typography variant="body2" paragraph>{member.affiliation}</Typography>
                        <Button href={`mailto:${member.email}`} size="small">{member.email}</Button>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" component="section" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom>
            For More Information
          </Typography>
          <Card>
            <CardContent>
              <Typography>
                Contact: <strong>Arash Rashed, </strong>
                <Button href="mailto:arashr@vt.edu" size="small">arashr@vt.edu</Button>
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 6, mt: 6, bgcolor: 'grey.100' }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>Acknowledgements:</Typography>
              <Typography variant="body2">
                This work is supported by the CARE Program from the USDA National Institute of Food and Agriculture.
                Grant number 2024-68008-42760
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={3} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                <Box component="img" src="../../assets/img/va-tech-logo.png" alt="Virginia Tech" sx={{ height: 40 }} />
                <Box component="img" src="../../assets/img/UI_Main_stacked_4c+W.png" alt="University of Idaho" sx={{ height: 40 }} />
              </Stack>
            </Grid>
          </Grid>
          <Box mt={4} textAlign="center">
            <Typography variant="caption">© {new Date().getFullYear()} Small Grains BYDV Research. All rights reserved.</Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
