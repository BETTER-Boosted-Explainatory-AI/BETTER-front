import { styled } from "@mui/material";

export const PaginationContainer = styled("div")(() => ({
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "1em",
  gap: "2em",
}));

export const WhiteBoxTestingResultContainer = styled("div")({
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "center",
  alignItems: "stretch",
  width: "100%",
  height: "100%",
  gap: "3rem",
  minHeight: "450px",
});

export const ItemContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  padding: "1em",
  gap: "1em",
  borderRadius: "8px", 
  backgroundColor: theme.palette.customColors.lightBlue,
}));

export const ParagraphContainer = styled("p")(({ theme }) => ({
  color: theme.palette.primary.text,
  fontSize: "1rem",
}));
