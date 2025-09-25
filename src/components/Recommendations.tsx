import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";
import { TreatmentOptionLabels } from "../types/types";

export function Recommendations() {
  // Get recommendations from Redux
  const recommendations = useSelector(
    (state: RootState) => state.recommendations.recommendations
  );

  // Filter out 'cont' and null profits and sort by profit descending
  const formattedRecommendations = 
    [...recommendations]
    .filter((a) => a.profit !== 0)
    .sort((a, b) => (b.profit ?? 0) - (a.profit ?? 0)
  );

  return (
    <Card sx={{ maxWidth: 600, margin: "2rem auto", padding: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Recommendations
        </Typography>
        {formattedRecommendations.length === 0 ? (
          <Typography>No recommendations available.</Typography>
        ) : (
          <List>
            {formattedRecommendations.map((rec, index) => (
              <ListItem key={`${rec.date}-${rec.treatment}-${index}`}>
                <ListItemText
                  primary={`${TreatmentOptionLabels[rec.treatment]} (${rec.date})`}
                  secondary={`Profit: $${rec.profit?.toFixed(2) ?? 0}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}
