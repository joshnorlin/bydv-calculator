import { Card, CardContent, Typography, Stack, Box, Chip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { ReactNode, useEffect, useRef } from "react";

interface FormFieldCardProps {
  /** Title of the field */
  title: string;
  /** Description/helper text explaining the field */
  description?: string;
  /** Whether this field is currently disabled */
  isDisabled?: boolean;
  /** Optional info/warning message */
  infoMessage?: string;
  /** The form field content */
  children: ReactNode;
  /** Whether to highlight this field (animation trigger) */
  isHighlighted?: boolean;
}

/**
 * Reusable wrapper for form field cards with consistent styling,
 * status indicators, and helper text.
 */
export function FormFieldCard({
  title,
  description,
  isDisabled = false,
  infoMessage,
  children,
  isHighlighted = false,
}: FormFieldCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to highlighted field and add pulse animation
  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      // Scroll into view smoothly
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [isHighlighted]);

  return (
    <Card
      ref={cardRef}
      elevation={isDisabled ? 0 : isHighlighted ? 3 : 1}
      sx={{
        opacity: isDisabled ? 0.5 : 1,
        transition: "all 0.3s ease",
        border: isDisabled ? "1px solid" : isHighlighted ? "2px solid" : "none",
        borderColor: isHighlighted ? "info.main" : "divider",
        backgroundColor: isDisabled ? "action.disabledBackground" : isHighlighted ? "info.lighter" : "background.paper",
        animation: isHighlighted ? "pulse-highlight 1.5s ease-in-out" : "none",
        "@keyframes pulse-highlight": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(2, 136, 209, 0.7)",
          },
          "50%": {
            boxShadow: "0 0 0 10px rgba(2, 136, 209, 0)",
          },
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        {/* Header with title and status indicator */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
            {title}
          </Typography>
          {isDisabled && (
            <Chip
              label="Complete previous step"
              size="small"
              variant="outlined"
              sx={{ opacity: 0.7 }}
            />
          )}
        </Stack>

        {/* Description */}
        {description && (
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            {description}
          </Typography>
        )}

        {/* Info message */}
        {infoMessage && (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mb: 2,
              p: 1.5,
              backgroundColor: "info.lighter",
              borderRadius: 1,
              alignItems: "flex-start",
            }}
          >
            <InfoIcon sx={{ fontSize: "1.25rem", color: "info.main", flexShrink: 0, mt: 0.25 }} />
            <Typography variant="body2" sx={{ color: "info.dark" }}>
              {infoMessage}
            </Typography>
          </Stack>
        )}

        {/* Form control */}
        <Box sx={{ opacity: isDisabled ? 0.6 : 1, pointerEvents: isDisabled ? "none" : "auto" }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}
