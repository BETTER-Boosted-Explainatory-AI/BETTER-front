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

export const FadeDiv = styled("div")`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0.5em;

  &.fade-enter {
    opacity: 0;
    z-index: 1;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 400ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 400ms;
  }
`;

export const SloganParagraph = styled("p")`
  font-size: 1.2em;
  color: #222831;
  text-align: center;
  margin-top: 0.5em;
  font-family: "Oxanium", sans-serif;
`;
