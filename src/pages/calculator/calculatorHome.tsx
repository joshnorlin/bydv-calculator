import { Container, Typography, Alert, Stack, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { Location } from "../../components/calculatorComponents/Location";
import { PlantingStatus } from "../../components/calculatorComponents/PlantingStatus";
import { PlantingDate } from "../../components/calculatorComponents/PlantingDate";
import { CalculateButton } from "../../components/calculatorComponents/CalculateButton";
import { CropPrice } from "../../components/calculatorComponents/CropPrice";
import { FormProgress } from "../../components/calculatorComponents/FormProgress";
import { resetUserDecision } from "../../store/userDecisionSlice";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export function CalculatorHome() {
    const dispatch = useDispatch();

    const handleReset = () => {
        dispatch(resetUserDecision());
    };

    return (
        <Container maxWidth="md" sx={{ mt: { xs: 3, md: 6 }, mb: { xs: 4, md: 8 } }}>
            {/* Header */}
            <Stack spacing={2} sx={{ mb: { xs: 4, md: 6 } }}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                        BYDV Risk Calculator
                    </Typography>
                    <Button 
                        size="small" 
                        startIcon={<RestartAltIcon />}
                        onClick={handleReset}
                        variant="outlined"
                        sx={{ whiteSpace: "nowrap" }}
                    >
                        Reset
                    </Button>
                </Stack>
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                    <Typography variant="body2">
                        <strong>Virginia-only:</strong> This calculator is designed for winter wheat fields in Virginia.
                        Results and recommendations reflect Virginia conditions and current research.
                    </Typography>
                </Alert>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Fill out your farm details below and we'll estimate BYDV risk and recommend the management options most likely to pay for your field.
                </Typography>
            </Stack>

            {/* Progress Indicator */}
            <FormProgress />

            {/* Form Fields */}
            <Stack spacing={3} sx={{ mb: 4 }}>
                <Location />
                <PlantingStatus />
                <PlantingDate />
                <CropPrice />
                <CalculateButton />
            </Stack>
        </Container>
    )
}

