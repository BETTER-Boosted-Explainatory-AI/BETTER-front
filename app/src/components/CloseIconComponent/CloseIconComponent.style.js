import { styled } from "@mui/material";

export const CloseIconContainer = styled("button")(({ top, right }) => ({
  position: "absolute",
  top: top ? top : "-1em",
  right: right ? right : "-3.5em",
  cursor: "pointer",
  border: "none",
  background: "none",
}));
