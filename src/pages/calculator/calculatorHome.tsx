import { Box } from "@mui/material";
import { Location } from "../../components/Location";
import { PlantingStatus } from "../../components/PlantingStatus";
import { PlantingDate } from "../../components/PlantingDate";
import { CalculateButton } from "../../components/CalculateButton";

export function CalculatorHome() {
    return (
        <Box 
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
                my: 5
            }}
        >
            <Location />
            <PlantingStatus />
            <PlantingDate />
            <CalculateButton />
        </Box>
    )
}