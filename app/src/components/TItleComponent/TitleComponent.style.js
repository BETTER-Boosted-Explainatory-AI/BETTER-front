import { styled } from "@mui/material/styles";

export const TitleWrapper = styled("div")(({ flexStart }) => ({
  display: "flex",
  justifyContent: flexStart ? flexStart : "center",
  alignItems: "center",
  alignSelf: "center",
  justifySelf: "center",
  width: "100%",
  marginBottom: "1em",
}));

export const Title = styled("h1")(({ fontSize, theme }) => ({
  fontSize: fontSize ? fontSize : "1.2rem",
  fontWeight: "700",
  color: theme.palette.primary.main,
  textTransform: "uppercase",
  alignSelf: "center",
}));
