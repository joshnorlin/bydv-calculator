import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";

export function Recommendations() {
  // Get recommendations from Redux
  const recommendations = useSelector(
    (state: RootState) => state.recommendations.recommendations
  );

  // Sort by profit descending
  const sortedRecommendations = [...recommendations].sort(
    (a, b) => (b.profit ?? 0) - (a.profit ?? 0)
  );

  return (
    <Card sx={{ maxWidth: 600, margin: "2rem auto", padding: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Recommendations
        </Typography>
        {sortedRecommendations.length === 0 ? (
          <Typography>No recommendations available.</Typography>
        ) : (
          <List>
            {sortedRecommendations.map((rec, index) => (
              <ListItem key={`${rec.date}-${rec.treatment}-${index}`}>
                <ListItemText
                  primary={`${rec.treatment} (${rec.date})`}
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
