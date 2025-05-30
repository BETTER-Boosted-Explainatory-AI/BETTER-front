import { styled } from "@mui/material";
import { IconButton } from "@mui/material";

export const ModalHeaderStyled = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "1em",
});

export const ButtonsContainer = styled("div")({
  display: "flex",
  position: "absolute",
  flexDirection: "row",
  bottom: "10vh",
  right: "5vw",
  zIndex: "5",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  borderRadius: "1px",
  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  justifySelf: "flex-start",
});

export const IconButtonStyled = styled(IconButton)({
  width: "30px",
  height: "30px",
  padding: "0.5em",
  borderRadius: "1px",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.027)",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem",
    color: "#222831",
  },
});
