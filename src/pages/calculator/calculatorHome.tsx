import { Box } from "@mui/material";
import { Location } from "../../components/Location";

export function CalculatorHome() {
    return (
        <Box
            sx={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Location />
        </Box>
    )
}