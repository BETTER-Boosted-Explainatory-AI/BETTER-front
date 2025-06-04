import { styled } from "@mui/material";

export const AbsoluteAlertContainer = styled("div")(({ top, bottom, left, right, visible }) => ({
    position: "absolute",
    top: top || "auto",
    bottom: bottom || "auto",
    left: left || "auto",
    right: right || "auto",
    width: "100%",
    pointerEvents: 'none',
    zIndex: 1000, // Ensure it appears above other elements
    opacity: visible ? 1 : 0,
    transition: "opacity 0.5s ease",
}));

// export const AbsoluteAlertContainer = styled("div")(() => ({
//     position: "fixed",
//     top: "20%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "auto",
//     pointerEvents: "none",
//     zIndex: 1300, // above most MUI components
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
// }));