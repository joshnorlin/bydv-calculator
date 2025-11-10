import { Box, Container, Typography, Stack } from "@mui/material";

export function About() {
  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
          About this project
        </Typography>

        <Stack spacing={2}>
          <Typography variant="body1">
            The long-term goal of this Critical Agricultural Research and Extension (CARE) project is to develop and implement an effective Integrated Pest Management (IPM) strategy to control barley yellow dwarf virus (BYDV) in Virginia and other southeastern states in the US. In doing so, the project will improve the livelihood of the region’s primarily small acreage farming communities by minimizing losses in the only harvested winter crop in the region.
          </Typography>

          <Typography variant="body1">
            The impact of climate change on the sustainability of agroecosystems has been the focus of many discussions in recent years. The effective monitoring and management of plant pests have emerged as a key priority to ensure the resiliency of our agricultural systems and maintain their associated socio-economic benefits for current and future generations. Climate change is expected to affect the biology and ecology of pathogens, plants, as well as the arthropod vectors of plant pathogens, influencing the occurrence, phenology, and prevalence of insect-transmitted plant pathogens. These effects are expected to impact the effectiveness of ecology-based IPM approaches. Therefore, adapting and improving our pest management strategies and tools in the face of our everchanging environment must be a continuous effort.
          </Typography>

          <Typography variant="body1">
            The BYDV pathosystem (i.e., barley yellow dwarf disease) is one example of a vector-borne plant pathogen that is known to be influenced by climate change. Barley yellow dwarf is the most important viral disease of winter cereals globally. Similar to other viruses of the Luteoviridae family, BYDV is transmitted by several cereal aphid species in a persistent, circulative, but non-propagative manner. The infected plants suffer from underdeveloped roots, foliage, and foliar discoloration. These deficiencies impair plant capability to access deeper soil moisture and to photosynthesize effectively. Yield losses due to BYDV are typically estimated at around 30%. However, this could reach as high as 100% when producers have no option but to replant fields when the infection is widespread and occurs early in the fall.
          </Typography>

          <Typography variant="body1">
            For the past few years, BYDV has become prevalent in winter wheat in the eastern and southeastern US. Winter wheat is one of the most frequently planted fall crops in Virginia and neighboring states. The appearance of BYDV has been of grave concern to producers, especially those who rely on relatively small acreages to make a living.
          </Typography>

          <Typography variant="body1">
            There are several strains of BYDV virus, with the PAV strain (BYDV-PAV) being one of the most prevalent and damaging genotypes in the US. Bird cherry-oat aphid (BCOA), Rhopalosiphum padi L. (Hemiptera: Aphididae), is known as the most efficient vector of BYDV-PAV. English grain aphid, Sitobion avenae Fabricius (Hemiptera: Aphididae), can also transmit BYDV-PAV; however, English grain aphid is less efficient than bird cherry-oat aphids in transmitting BYDV. Both aphid species are present in the study region’s cereal fields, grazing lands, and natural vegetation, and have been observed in large numbers in both the fall and spring. BYDV-PAV symptoms in wheat are typically expressed as reddening/yellowing of leaves, reductions in root biomass, stem height, photosynthetic rate, chlorophyll content, and grain yield and quality.
          </Typography>

          <Typography variant="body1">
            Integration of weed/volunteer management, delayed fall planting, and neonicotinoid seed treatment offers the most effective management of BYDV and aphid vectors, and was proven successful in addressing the 2012–2016 BYDV outbreak in southern Idaho in collaborative efforts led by PI Rashed. The recommended planting date for winter wheat in the southeastern US region is based on older field trial data collected between 1998 and 2000. Moreover, planting neonicotinoid-treated seed is not widely practiced in the region, and many growers rely on either a calendar-based application of pyrethroid foliar applications to knock down aphid numbers or to simply spray when they see aphids on plants without any knowledge of BYDV risk.
          </Typography>

          <Typography variant="body1">
            Calendar-based pyrethroid applications are based on outdated information and have little efficacy in managing BYDV. In addition, pyrethroids are broad-spectrum insecticides that will eliminate natural enemies from the habitat, promote insecticide resistance in pest populations, and cause environmental and human health risks. Therefore, there is an urgent need to revisit and update the IPM protocols to effectively manage BYDV in the southeastern US region. Doing so would reduce the unintended, financially costly, and environmentally harmful effects of commonly used aphid and virus management practices. In fact, while managing BYDV is essential and economically justifiable in large-scale production systems in western and mid-western states, in small acreage farming of Southside Virginia and other southeastern US regions, any action other than altering the planting date might not offer a meaningful economic return.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default About;
