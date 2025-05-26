import { styled } from "@mui/material";

export const ModelsPageWrapper = styled("div")({
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  gap: "3em",
});

export const ModelsStatusContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "flex-start",
  alignItems: "stretch",
  padding: "1em",
  gap: "3em",
  width: "100%",
  height: "100%",
}));

export const ModelStatusCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "1em",
  padding: "1em",
  borderRadius: "8px",
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.customColors.softGray,
}));
