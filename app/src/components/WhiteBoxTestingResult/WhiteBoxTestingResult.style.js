import { styled } from "@mui/material";

export const WhiteBoxTestingResultContainer = styled("div")({
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "flex-start",
  alignItems: "stretch",
  width: "100%",
  height: "100%",
  gap: "1em",
});

export const ItemContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  padding: "1em",
  gap: "1em",
  borderRadius: "8px",
  backgroundColor: theme.palette.customColors.softGray,
}));
