import { styled } from "@mui/material";

export const FormContainerStyle = styled("div")`
    width: ${(props) => props.width || "88%"};
    display: flex;
    flex-direction: column;
    align-items: ${(props) => props.align || "flex-start"};
    padding: 25px;
    background-color: ${(props) => props.bgColor || '#c8dde0'};
    border-top-left-radius: ${(props) => `${props.borderRadiusTop || 15}px`};
    border-top-right-radius: ${(props) => `${props.borderRadiusTop || 15}px`};
    border-bottom-left-radius: ${(props) => `${props.borderRadiusBottom || 15}px`};
    border-bottom-right-radius: ${(props) => `${props.borderRadiusBottom || 15}px`};
`;