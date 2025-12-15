import { Card, CardContent, Stack, Typography, Box, Chip, Accordion, AccordionSummary, AccordionDetails, Tooltip, Alert } from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import GrassIcon from "@mui/icons-material/Grass";
import SprayIcon from "@mui/icons-material/Opacity";
import LayersIcon from "@mui/icons-material/Layers";
import BlockIcon from "@mui/icons-material/Block";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Tooltip helper component for technical terms
const TechTooltip = ({ term, children }: { term: string; children: React.ReactNode }) => {
  const tooltips: Record<string, string> = {
    neonicotinoid: "A class of insecticides that work systemically (throughout the plant) to kill aphids on contact or by ingestion.",
    systemic: "Insecticide that is absorbed by the plant and distributed throughout its tissues, providing protection from within.",
    foliar: "Application of pesticide directly to the leaves and stems of the plant.",
    BYDV: "Barley Yellow Dwarf Virus - the disease transmitted by aphids that reduces crop yield.",
    seedling: "A young plant in its early growth stages, typically most vulnerable to aphid damage.",
  };

  return (
    <Tooltip title={tooltips[term] || term} arrow placement="top">
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.3, cursor: 'help', borderBottom: '1px dotted', borderColor: 'primary.main' }}>
        {children}
        <HelpOutlineIcon sx={{ fontSize: 14, color: 'primary.main', opacity: 0.7 }} />
      </Box>
    </Tooltip>
  );
};

interface Treatment {
  icon: React.ReactNode;
  title: string;
  shortName: string;
  color: string;
  description: string | React.ReactNode;
  when: string;
  why: string | React.ReactNode;
  considerations: string;
  forPlantedCrops?: boolean;
}

export function RecommendationsTreatmentInfo({ plantedOnly = false }: { plantedOnly?: boolean }) {
  const allTreatments: Treatment[] = [
    {
      icon: <GrassIcon sx={{ fontSize: 40 }} />,
      title: "Neonicotinoid Seed Treatment",
      shortName: "Seed Coating",
      color: "primary",
      description: "A protective insecticide coating applied directly to the seed before planting.",
      when: "Before planting - protection begins as seedlings emerge",
      why: <>Provides early-season <TechTooltip term="systemic">systemic protection</TechTooltip> when aphids first arrive. Most effective for early plantings when aphid pressure peaks during vulnerable <TechTooltip term="seedling">seedling</TechTooltip> stages.</>,
      considerations: "Limited protection window (early season only). Cost is per-acre seed treatment fee. Cannot be applied after planting.",
      forPlantedCrops: false,
    },
    {
      icon: <SprayIcon sx={{ fontSize: 40 }} />,
      title: "Fall Foliar Insecticide",
      shortName: "Fall Spray",
      color: "info",
      description: <>A liquid insecticide applied to plant <TechTooltip term="foliar">foliage</TechTooltip> in the fall after emergence.</>,
      when: "Fall application when scouting indicates aphid pressure",
      why: "Targets aphids during fall migration and reproduction periods. Effective when timed correctly based on field scouting. Can be applied to already planted crops.",
      considerations: "Requires proper timing and weather conditions for application. Includes product and application costs. Only available for planted crops.",
      forPlantedCrops: true,
    },
    {
      icon: <SprayIcon sx={{ fontSize: 40, transform: 'rotate(180deg)' }} />,
      title: "Spring Foliar Insecticide",
      shortName: "Spring Spray",
      color: "success",
      description: <>A liquid insecticide applied to plant <TechTooltip term="foliar">foliage</TechTooltip> in the spring.</>,
      when: "Spring application based on aphid scouting thresholds",
      why: <>Controls aphids during spring population growth and <TechTooltip term="BYDV">BYDV</TechTooltip> transmission periods. Timing is critical for maximum effectiveness.</>,
      considerations: "Weather-dependent application. May need multiple applications if pressure is high. Includes product and application costs.",
      forPlantedCrops: true,
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
      forPlantedCrops: false,
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

  // Filter treatments based on planting status
  const treatments = plantedOnly 
    ? allTreatments.filter(t => t.forPlantedCrops !== false || t.color === 'default')
    : allTreatments;

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
            Different treatments target aphids at different times in the growing season. The best choice depends on your planting timing, expected aphid pressure, and economic return. <em>Hover over underlined terms to learn more.</em>
          </Typography>

          {plantedOnly && (
            <Alert 
              severity="info"
              icon={<InfoOutlinedIcon />}
              sx={{ borderRadius: 2 }}
            >
              <Typography variant="body2">
                <strong>Your crops are already planted.</strong> Seed treatment options are not available since they must be applied before planting. Only foliar spray options are shown below.
              </Typography>
            </Alert>
          )}

          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 2 
          }}>
            {treatments.map((treatment, index) => (
              <Accordion 
                key={index}
                disableGutters
                sx={{
                  border: `2px solid`,
                  borderColor: `${treatment.color}.main`,
                  borderRadius: '8px !important',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': {
                    margin: 0,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    bgcolor: treatment.color === 'default' ? 'grey.100' : `${treatment.color}.light`,
                    borderRadius: '8px',
                    '&.Mui-expanded': {
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                    '& .MuiAccordionSummary-content': {
                      my: 1.5,
                    },
                  }}
                >
                  <Stack direction="row" alignItems="center" gap={2} sx={{ width: '100%' }}>
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
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {treatment.description}
                      </Typography>
                    </Box>
                    <Chip 
                      size="small" 
                      label={treatment.shortName} 
                      color={treatment.color as any}
                      sx={{ mr: 1 }}
                    />
                  </Stack>
                </AccordionSummary>
                
                <AccordionDetails sx={{ p: 3, bgcolor: 'background.paper' }}>
                  <Stack gap={2.5}>
                    <Box>
                      <Typography variant="caption" fontWeight={700} color="primary" textTransform="uppercase" gutterBottom display="block">
                        When to use
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {treatment.when}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="caption" fontWeight={700} color="success.main" textTransform="uppercase" gutterBottom display="block">
                        Why it matters
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {treatment.why}
                      </Typography>
                    </Box>

                    <Box sx={{ 
                      bgcolor: 'grey.100', 
                      p: 2, 
                      borderRadius: 1,
                      borderLeft: 4,
                      borderColor: 'warning.main'
                    }}>
                      <Typography variant="caption" fontWeight={700} textTransform="uppercase" gutterBottom display="block">
                        Key Considerations
                      </Typography>
                      <Typography variant="body2" fontSize={13}>
                        {treatment.considerations}
                      </Typography>
                    </Box>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
