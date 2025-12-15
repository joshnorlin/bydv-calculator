import { Card, CardContent, Stack, Typography, Box, Chip } from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import GrassIcon from "@mui/icons-material/Grass";
import SprayIcon from "@mui/icons-material/Opacity";
import LayersIcon from "@mui/icons-material/Layers";
import BlockIcon from "@mui/icons-material/Block";

export function RecommendationsTreatmentInfo() {
  const treatments = [
    {
      icon: <GrassIcon sx={{ fontSize: 40 }} />,
      title: "Neonicotinoid Seed Treatment",
      shortName: "Seed Coating",
      color: "primary",
      description: "A protective insecticide coating applied directly to the seed before planting.",
      when: "Before planting - protection begins as seedlings emerge",
      why: "Provides early-season systemic protection when aphids first arrive. Most effective for early plantings when aphid pressure peaks during vulnerable seedling stages.",
      considerations: "Limited protection window (early season only). Cost is per-acre seed treatment fee. Cannot be applied after planting.",
    },
    {
      icon: <SprayIcon sx={{ fontSize: 40 }} />,
      title: "Fall Foliar Insecticide",
      shortName: "Fall Spray",
      color: "info",
      description: "A liquid insecticide applied to plant foliage in the fall after emergence.",
      when: "Fall application when scouting indicates aphid pressure",
      why: "Targets aphids during fall migration and reproduction periods. Effective when timed correctly based on field scouting. Can be applied to already planted crops.",
      considerations: "Requires proper timing and weather conditions for application. Includes product and application costs. Only available for planted crops.",
    },
    {
      icon: <SprayIcon sx={{ fontSize: 40, transform: 'rotate(180deg)' }} />,
      title: "Spring Foliar Insecticide",
      shortName: "Spring Spray",
      color: "success",
      description: "A liquid insecticide applied to plant foliage in the spring.",
      when: "Spring application based on aphid scouting thresholds",
      why: "Controls aphids during spring population growth and BYDV transmission periods. Timing is critical for maximum effectiveness.",
      considerations: "Weather-dependent application. May need multiple applications if pressure is high. Includes product and application costs.",
    },
    {
      icon: <LayersIcon sx={{ fontSize: 40 }} />,
      title: "Combination Treatments",
      shortName: "Seed + Spray",
      color: "secondary",
      description: "Seed treatment plus a foliar spray (either fall or spring).",
      when: "Seed treatment at planting + foliar spray based on scouting",
      why: "Provides extended protection across multiple critical periods. Most comprehensive approach for high-pressure situations or high-value crops.",
      considerations: "Highest cost option - only profitable when aphid pressure justifies dual applications. Monitor closely to time foliar spray appropriately.",
    },
    {
      icon: <BlockIcon sx={{ fontSize: 40 }} />,
      title: "Do Nothing (Control)",
      shortName: "No Treatment",
      color: "default",
      description: "Take no treatment action - the baseline for all comparisons.",
      when: "When expected aphid pressure is low or uncertain",
      why: "Sometimes the most profitable option when aphid pressure is expected to be low, or when treatment costs exceed potential yield benefits.",
      considerations: "This is the comparison baseline. All profit values show gain or loss compared to this option. Monitor fields regularly even if choosing this option.",
    },
  ];

  return (
    <Card sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
      <CardContent>
        <Stack gap={3}>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <ScienceIcon color="primary" sx={{ fontSize: 32 }} />
            <Box>
              <Typography variant="h5" fontWeight={700}>Understanding Treatment Options</Typography>
              <Typography variant="body2" color="text.secondary">
                Learn what each treatment does and when it makes sense
              </Typography>
            </Box>
          </Stack>

          <Typography variant="body1" color="text.secondary">
            Different treatments target aphids at different times in the growing season. The best choice depends on your planting timing, expected aphid pressure, and economic return.
          </Typography>

          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 2 
          }}>
            {treatments.map((treatment, index) => (
              <Box key={index}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    borderWidth: 2,
                    borderColor: `${treatment.color}.main`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3,
                    }
                  }}
                >
                  <CardContent>
                    <Stack gap={2}>
                      <Stack direction="row" alignItems="center" gap={2}>
                        <Box sx={{ 
                          color: `${treatment.color}.main`,
                          bgcolor: treatment.color === 'default' ? 'grey.200' : `${treatment.color}.light`,
                          p: 1,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {treatment.icon}
                        </Box>
                        <Box flex={1}>
                          <Typography variant="h6" fontWeight={700}>
                            {treatment.title}
                          </Typography>
                          <Chip 
                            size="small" 
                            label={treatment.shortName} 
                            color={treatment.color as any}
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      </Stack>

                      <Typography variant="body2" color="text.secondary">
                        {treatment.description}
                      </Typography>

                      <Box>
                        <Typography variant="caption" fontWeight={700} color="primary" textTransform="uppercase">
                          When to use
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {treatment.when}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="caption" fontWeight={700} color="success.main" textTransform="uppercase">
                          Why it matters
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {treatment.why}
                        </Typography>
                      </Box>

                      <Box sx={{ 
                        bgcolor: 'grey.100', 
                        p: 1.5, 
                        borderRadius: 1,
                        borderLeft: 4,
                        borderColor: 'warning.main'
                      }}>
                        <Typography variant="caption" fontWeight={700} textTransform="uppercase" gutterBottom display="block">
                          Key Considerations
                        </Typography>
                        <Typography variant="body2" fontSize={12}>
                          {treatment.considerations}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
