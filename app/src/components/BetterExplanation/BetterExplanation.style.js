import { styled } from "@mui/material";

export const ExplanationContainer = styled("div")(({ height, theme }) => ({
  display: "flex",
  position: "relative",
  width: "100%",
  height: height ? height : "90vh",
  backgroundColor: theme.palette.customColors.lightBlue,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  padding: "1em",
  gap: "0.5em",
}));