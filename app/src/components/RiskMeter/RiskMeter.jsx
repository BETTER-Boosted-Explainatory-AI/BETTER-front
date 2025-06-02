import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Subtitle from "../Subtitle/Subtitle.jsx";
import { RiskMeterContainer } from "./RiskMeter.style.js";

// Add this inside your DetectionResult component
const RiskMeter = ({ probability }) => {
return (
    <Box sx={{ width: "85%", mt: 2 }}>
        <RiskMeterContainer>
    <Subtitle title={`Attack Risk Score: ${(probability * 100).toFixed(1)}%`} flexStart="flex-start" />
    <LinearProgress
        variant="determinate"
        value={probability * 100}
        sx={{
        height: 16,
        borderRadius: 8,
        backgroundColor: "#e0e0e0",
        "& .MuiLinearProgress-bar": {
            backgroundColor:
            probability > 0.7
                ? "#d32f2f"
                : probability > 0.4
                ? "#fbc02d"
                : "#388e3c",
        },
        }}
    />
        </RiskMeterContainer>
    </Box>
);
}
export default RiskMeter;