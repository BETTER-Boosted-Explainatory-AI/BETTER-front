import { styled } from "@mui/material/styles";

export const LabelsContainer = styled("div")({
    display: "flex",
    flexFlow: "row wrap",
    gap: "1em",
    padding: "1em",
    borderRadius: "8px",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
});

export const ModalHeaderStyled = styled("div")({
    display: "flex",
    position: "sticky",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    top: "0em",
    padding: "1em 0",
    height: "5vh",
    margin: "0",
    backgroundColor: "#ffffff",
});

export const ModalFooterStyled = styled("div")({
    display: "flex",
    position: "sticky",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "1em 0",
    bottom: "0em",
    height: "3bh",
    margin: "0",
    backgroundColor: "#ffffff",
});
