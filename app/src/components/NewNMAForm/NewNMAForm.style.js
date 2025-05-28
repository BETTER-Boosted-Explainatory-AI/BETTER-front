import { styled } from "@mui/material";
import Button from "@mui/material/Button";

export const FormHeader = styled("div")`
  display: flex;
  flex-flow: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const FormSeperator = styled("div")`
  display: flex;
  flex-flow: column wrap;
  gap: 5px;
`;

export const ExplainableParagraph = styled("p")`
  font-size: 13px;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
`;

export const ButtonsContainer = styled("div")`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  gap: 2em;
`;

export const ChooseButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  width: "40%",
  height: "4em",
  borderRadius: "0.5em",
  border: `0.5px solid ${theme.palette.customColors.softBlue}`,
  color: selected
    ? theme.palette.primary.contrastText
    : theme.palette.primary.main,
  backgroundColor: selected
    ? theme.palette.secondary.main
    : theme.palette.primary.bg,
  transition: "background 0.2s, color 0.2s",
}));


export const IconButton = styled(Button)(({ theme }) => ({  
  width: "12px",
  height: "20px",
  borderRadius: "0.5em",
  color: theme.palette.primary.main,
  padding: "0px",
  margin: "0px",
  minWidth: "0px",
}));
