import { styled } from "@mui/material/styles";

export const AnalysisResultContainer = styled("div")(({ theme }) => ({
    display: "flex",
    backgroundColor: theme.palette.customColors.lightBlue,
    flexGrow: 1,
    flexFlow: "column",
    flexBasis: "0",   
    padding: "1em",
    borderRadius: "8px",
    width: "50%",
}));



export const AnalysisContainer = styled("div")({
    display: "flex",
    flexFlow: "row",
    gap: "2em",
    width: "100%",
});