/**
 * RecommendationTransition
 * 
 * A visual bridge between the top recommendations and the detailed plan.
 * Signals that there's actionable information below.
 * 
 * UX Intent:
 * - Prevents the recommendation cards from feeling like a dead end
 * - Frames what's coming: the full plan with timing + treatment details
 */

import { Box, Typography, Stack } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export function RecommendationTransition() {
  const plantingStatus = useSelector(
    (state: RootState) => state.userDecision.plantingStatus
  );
  const isPlanted = plantingStatus === 'planted';

  return (
    <Box 
      sx={{ 
        textAlign: 'center',
        py: 3,
        px: 2,
      }}
    >
      <Stack spacing={1.5} alignItems="center">
        {/* Continuation cue */}
        <KeyboardDoubleArrowDownIcon 
          sx={{ 
            fontSize: 32, 
            color: 'text.secondary',
            animation: 'pulse 2s infinite',
          }} 
        />

        {/* Transition text */}
        <Typography 
          variant="h6" 
          fontWeight={600} 
          color="text.primary"
        >
          {isPlanted 
            ? 'Your complete management plan' 
            : 'Your planting & treatment plan'}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ maxWidth: 500 }}
        >
          {isPlanted 
            ? 'Scroll to see exactly what to do, when to do it, and why this combination works for your situation.'
            : 'See the full picture: when to plant, what treatment to apply, and your step-by-step action plan.'}
        </Typography>
      </Stack>

      {/* CSS for pulse animation */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 0.5;
              transform: translateY(0);
            }
            50% {
              opacity: 1;
              transform: translateY(4px);
            }
          }
        `}
      </style>
    </Box>
  );
}
