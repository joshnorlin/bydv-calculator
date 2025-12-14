import { Card, CardContent, Typography, Stack, Box, Chip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

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

  // Smooth scroll to highlighted field
  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [isHighlighted]);

  return (
    <Card
      ref={cardRef}
      elevation={isDisabled ? 0 : isHighlighted ? 2 : 1}
      sx={{
        opacity: isDisabled ? 0.5 : 1,
        transition: "all 0.3s ease",
        border: isDisabled ? "1px solid" : isHighlighted ? "2px solid" : "1px solid transparent",
        borderColor: isHighlighted ? "info.main" : "divider",
        backgroundColor: isDisabled ? "action.disabledBackground" : "background.paper",
        animation: isHighlighted ? "highlight-pulse 0.6s ease-out" : "none",
        "@keyframes highlight-pulse": {
          "0%": {
            borderColor: "rgb(2, 136, 209)",
            boxShadow: "0 0 0 2px rgba(2, 136, 209, 0.2)",
          },
          "100%": {
            borderColor: "rgb(2, 136, 209)",
            boxShadow: "0 0 0 0px rgba(2, 136, 209, 0)",
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
