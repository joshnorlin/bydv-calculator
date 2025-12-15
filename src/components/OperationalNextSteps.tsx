/**
 * OperationalNextSteps
 * 
 * Concrete, domain-specific next steps — not generic CTAs.
 * Each step tells the farmer exactly what to do, when, and how.
 * 
 * Design Intent:
 * - Operational, not inspirational
 * - Step 1, 2, 3 format
 * - Tied to the specific treatment recommended
 */

import { Box, Typography, Stack, Paper, Button, Chip, Divider } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import LoopIcon from "@mui/icons-material/Loop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { TreatmentOptionLabels, plantingDateOptionLabels } from "../types/types";
import { Link as RouterLink } from "react-router-dom";

// Operational steps by treatment type
const operationalSteps: Record<string, {
  steps: { action: string; timing: string; details: string }[];
}> = {
  'neon': {
    steps: [
      {
        action: 'Order treated seed from your supplier',
        timing: 'At least 2-3 weeks before planting',
        details: 'Ask for neonicotinoid-treated seed (Gaucho, Cruiser, or equivalent). Confirm treatment rate meets label recommendations for BYDV protection.'
      },
      {
        action: 'Plan your planting date',
        timing: 'Based on your target window',
        details: 'Coordinate seed delivery with your planting schedule. Treated seed should be used the same season for maximum efficacy.'
      },
      {
        action: 'Plant and monitor',
        timing: 'During your planting window',
        details: 'Plant as normal. No additional scouting required unless conditions change dramatically. Seed treatment handles early-season protection.'
      }
    ]
  },
  'fallApp': {
    steps: [
      {
        action: 'Plant your untreated seed',
        timing: 'During your planting window',
        details: 'No seed treatment needed. You\'ll rely on scouting and foliar spray for BYDV management.'
      },
      {
        action: 'Begin field scouting 2-3 weeks after emergence',
        timing: 'When seedlings have 2-3 leaves',
        details: 'Check 5-10 spots per field. Count aphids per linear foot of row. Look for bird cherry-oat aphids and greenbugs.'
      },
      {
        action: 'Spray if aphid counts exceed 20-25 per foot of row',
        timing: 'Before hard freeze or when threshold is reached',
        details: 'Use a pyrethroid insecticide (lambda-cyhalothrin, bifenthrin). Apply on a calm day with temperatures above 50°F for best results.'
      }
    ]
  },
  'springApp': {
    steps: [
      {
        action: 'Plant your untreated seed',
        timing: 'During your planting window',
        details: 'No fall treatment needed based on current forecasts. You\'ll scout in spring.'
      },
      {
        action: 'Scout fields in early spring as temperatures warm',
        timing: 'Late February through March (varies by region)',
        details: 'As soon as daytime temps consistently reach 50°F+, check for aphid activity. Look for greenbugs and bird cherry-oat aphids.'
      },
      {
        action: 'Spray if aphid populations are building before jointing',
        timing: 'Before wheat reaches jointing stage',
        details: 'Apply pyrethroid spray if aphid counts are high and virus symptoms aren\'t yet widespread. Once symptoms appear, spraying won\'t reverse damage.'
      }
    ]
  },
  'neonFallApp': {
    steps: [
      {
        action: 'Order neonicotinoid-treated seed',
        timing: 'At least 2-3 weeks before planting',
        details: 'Treated seed provides your first line of defense. This protects seedlings during peak fall aphid flight.'
      },
      {
        action: 'Plant treated seed during your window',
        timing: 'Target early fall for maximum seed treatment benefit',
        details: 'Seed treatment is most valuable for early-planted wheat when aphid exposure is longest.'
      },
      {
        action: 'Scout 3-4 weeks after emergence — spray if aphids persist',
        timing: 'As seed treatment protection wanes',
        details: 'If aphid counts exceed threshold (20-25/ft of row) after seed treatment window, apply foliar pyrethroid. This is your backup protection.'
      }
    ]
  },
  'neonSpringApp': {
    steps: [
      {
        action: 'Order neonicotinoid-treated seed',
        timing: 'At least 2-3 weeks before planting',
        details: 'Seed treatment handles fall aphid pressure. Spring spray is held in reserve.'
      },
      {
        action: 'Plant treated seed during your window',
        timing: 'Based on your planting schedule',
        details: 'Seed treatment provides 4-6 weeks of protection during critical fall emergence.'
      },
      {
        action: 'Scout in early spring — spray only if aphids resurge',
        timing: 'Late February through March',
        details: 'Monitor for aphid resurgence as temperatures warm. Apply foliar spray only if populations are building before jointing stage.'
      }
    ]
  },
  'doNothing': {
    steps: [
      {
        action: 'Continue with your normal planting plan',
        timing: 'Your usual schedule',
        details: 'No seed treatment or spray needed. Current conditions don\'t justify the cost.'
      },
      {
        action: 'Consider light scouting to confirm low pressure',
        timing: '2-3 weeks after emergence (optional)',
        details: 'A quick walk-through can confirm aphid activity matches forecasts. No need for intensive scouting.'
      },
      {
        action: 'Re-evaluate if conditions change dramatically',
        timing: 'If you hear about high aphid activity nearby',
        details: 'Run this calculator again or consult your agronomist if regional reports suggest unexpected aphid pressure.'
      }
    ]
  }
};

export function OperationalNextSteps() {
  const recommendations = useSelector(
    (state: RootState) => state.recommendations.recommendations
  );
  const plantingStatus = useSelector(
    (state: RootState) => state.userDecision.plantingStatus
  );
  const plantingDate = useSelector(
    (state: RootState) => state.userDecision.plantingDate
  );
  const location = useSelector(
    (state: RootState) => state.userDecision.location
  );

  // Get the top recommendation
  let filtered = recommendations.filter(r => r.treatment !== 'cont');
  if (plantingStatus === 'planted' && plantingDate) {
    filtered = filtered.filter(r => r.date === plantingDate);
  }
  const sorted = filtered.sort((a, b) => (b.profit ?? 0) - (a.profit ?? 0));
  const topRec = sorted[0];
  
  const allNegative = sorted.every(r => (r.profit ?? 0) <= 0);
  const isPlanted = plantingStatus === 'planted';

  // Get operational steps for this treatment
  const treatmentKey = allNegative ? 'doNothing' : (topRec?.treatment || 'doNothing');
  const steps = operationalSteps[treatmentKey]?.steps || operationalSteps['doNothing'].steps;

  // Handlers
  const handlePrint = () => {
    window.print();
  };

  // Share removed: link does not persist recommendations reliably

  const handleDownload = () => {
    const recommendedTreatment = allNegative ? 'Do Nothing' : TreatmentOptionLabels[topRec?.treatment];
    const plantingWindow = topRec?.date ? plantingDateOptionLabels[topRec.date] : (plantingDate ? plantingDateOptionLabels[plantingDate] : 'Not specified');
    const profit = topRec ? `$${(topRec.profit ?? 0).toFixed(2)}/acre` : 'N/A';
    
    const stepsText = steps.map((step, i) => 
      `STEP ${i + 1}: ${step.action}\n   Timing: ${step.timing}\n   Details: ${step.details}`
    ).join('\n\n');
    
    const summary = `
BYDV MANAGEMENT PLAN
====================
Generated: ${new Date().toLocaleDateString()}

YOUR SITUATION
--------------
Location: ${location || 'Not specified'}
Planting Status: ${isPlanted ? 'Already planted' : 'Planning'}
${!isPlanted ? `Target Planting Window: ${plantingWindow}` : `Planting Window: ${plantingWindow}`}

RECOMMENDATION
--------------
Treatment: ${recommendedTreatment}
Planting Window: ${plantingWindow}
${!allNegative ? `Projected Return: +${profit}` : 'Note: All treatments have negative ROI — doing nothing is the economically rational choice.'}

YOUR ACTION PLAN
----------------
${stepsText}

IMPORTANT REMINDERS
-------------------
- Aphid thresholds: ~20-25 aphids per linear foot of row
- Scout on warm days (50°F+) when aphids are active
- Pyrethroid sprays: lambda-cyhalothrin, bifenthrin, or similar
- Seed treatments: Gaucho, Cruiser, or equivalent neonicotinoids

DISCLAIMER
----------
This recommendation is based on historical data and economic models.
Actual results may vary based on weather, local conditions, and aphid populations.
Consult with your local extension office or agronomist for site-specific advice.

Generated by BYDV Decision Support Calculator
${window.location.href}
    `.trim();
    
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bydv-action-plan-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box>
      <Stack spacing={3}>
        {/* Section Header */}
        <Box>
          <Chip 
            label="Your Action Plan" 
            size="small" 
            color="success" 
            sx={{ mb: 1, fontWeight: 600 }}
          />
          <Typography variant="h5" fontWeight={700}>
            What to do — step by step
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {isPlanted 
              ? 'Based on your current situation, here\'s your path forward'
              : 'Here\'s exactly what to do to implement this recommendation'}
          </Typography>
        </Box>

        {/* Step-by-Step Action Cards */}
        <Stack spacing={2}>
          {steps.map((step, idx) => (
            <Paper 
              key={idx}
              elevation={0} 
              sx={{ 
                p: 0,
                borderRadius: 2, 
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden'
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }}>
                {/* Step Number */}
                <Box sx={{ 
                  bgcolor: idx === 0 ? 'primary.main' : 'grey.200',
                  color: idx === 0 ? 'white' : 'text.primary',
                  px: 3,
                  py: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: { sm: 80 }
                }}>
                  <Typography variant="h5" fontWeight={800}>
                    {idx + 1}
                  </Typography>
                </Box>
                
                {/* Step Content */}
                <Box sx={{ p: 2.5, flex: 1 }}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {step.action}
                    </Typography>
                    <Chip 
                      icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                      label={step.timing}
                      size="small"
                      variant="outlined"
                      sx={{ alignSelf: 'flex-start' }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {step.details}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>

        <Divider sx={{ my: 1 }} />

        {/* Save / Share / Recalculate */}
        <Box>
          <Typography variant="subtitle2" fontWeight={700} color="text.secondary" sx={{ mb: 2 }}>
            SAVE THIS PLAN
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            sx={{ mb: 3 }}
          >
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              sx={{ flex: { sm: 1 } }}
            >
              Download Action Plan
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              sx={{ flex: { sm: 1 } }}
            >
              Print This Page
            </Button>
            {/* Share removed until persisted links are available */}
          </Stack>

          <Button
            variant="text"
            startIcon={<LoopIcon />}
            component={RouterLink}
            to="/calculator?noAutoFocus=true"
            color="inherit"
          >
            Try a different scenario
          </Button>
        </Box>

        {/* Closing reminder */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            borderRadius: 2, 
            bgcolor: 'info.light',
            border: '1px solid',
            borderColor: 'info.main'
          }}
        >
          <Typography variant="body2">
            <strong>Questions?</strong> Your local extension office or agronomist can help you adapt this plan to your specific field conditions. 
            Treatment thresholds and timing may vary based on local weather patterns.
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
}
