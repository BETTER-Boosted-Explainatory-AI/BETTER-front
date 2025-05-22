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

export const ModalHeaderStyled = styled("div")(({showAlert}) => ({
    display: "flex",
    flexFlow: "column",
    position: "sticky",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    top: "0em",
    padding: showAlert ? "2.5em 0" : "1em 0",
    height: "5vh",
    margin: "0",
    backgroundColor: "#ffffff",
    gap: "1em",
}));

export const ModalFooterStyled = styled("div")({
    display: "flex",
    flexFlow: "column",
    position: "sticky",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "2em 0",
    bottom: "0em",
    height: "3vh",
    margin: "0",
    backgroundColor: "#ffffff",
});

export const CounterStyled = styled("div")(({ theme, overLimit }) => ({    
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top:"1em",
    left:"2em",
    width: "1.5em",
    height: "1.5em",
    padding: "1em",
    margin: "0",
    borderRadius: "50%",
    backgroundColor: overLimit 
        ? theme.palette.error.main 
        : theme.palette.customColors.softBlue,
    color: theme.palette.secondary.text,
}));