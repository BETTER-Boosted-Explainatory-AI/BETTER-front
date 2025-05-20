import { styled } from "@mui/material";

export const ModalHeaderStyled = styled("div")({
    display: "flex",
    justifyContent: "center",
    marginTop: "1em",
});

export const ModalCloseIconContainer = styled("button")({
    position: "absolute",
    top: "-1em",
    right: "-3.5em",
    cursor: "pointer",
    border: "none",
    background: "none",
});
