import { styled } from "@mui/material/styles";

export const AnalysisResultContainer = styled("div")({
    backgroundColor: "#f0f0f0",
    display: "flex",
    flexGrow: 1,
    flexFlow: "column",
    flexBasis: "0",     // allow flex-grow to split space evenly 
    padding: "1em",
    borderRadius: "8px",
    width: "50%"
});

export const AnalysisContainer = styled("div")({
    display: "flex",
    flexFlow: "row",
    gap: "1em",
    width: "100%",
});