import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { RiskMeterContainer, ParagraphContainer } from "./RiskMeter.style.js";
import Subtitle from "../Subtitle/Subtitle.jsx";

// Add this inside your DetectionResult component
const RiskMeter = ({ detectionResult, probability }) => {
  const redColor = "#d32f2f";
  const yellowColor = "#fbc02d";
  const greenColor = "#388e3c";

  const detectionResultText =
    detectionResult === "Adversarial"
      ? "The image is suspected as an"
      : "The Image is an";
  const detectionResultCurrect =
    detectionResult === "Adversarial" ? "attack" : "authentic image";
  const color = detectionResult === "Adversarial" ? "red" : "green";

  return (
    <Box sx={{ width: "85%", mt: 2 }}>
      <RiskMeterContainer>
        <Subtitle
          title={
            <>
              {detectionResultText}{" "}
              <span style={{ color, fontWeight: 700 }}>
                {detectionResultCurrect}
              </span>
            </>
          }
        />
        <ParagraphContainer>
          <strong>Confidence Level of Decision:</strong>{" "}
          {(probability * 100).toFixed(1)}%
        </ParagraphContainer>
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
                  ? greenColor
                  : probability > 0.4
                  ? yellowColor
                  : redColor,
            },
          }}
        />
      </RiskMeterContainer>
    </Box>
  );
};
export default RiskMeter;
