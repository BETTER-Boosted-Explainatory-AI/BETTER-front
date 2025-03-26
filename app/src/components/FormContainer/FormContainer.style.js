import { styled } from "@mui/material";

export const FormContainerStyle = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 5%;
    padding: 9%;
    background-color: ${(props) => props.bgColor || '#c8dde0'};
    border-radius: 15px 15px  ${(props) => `${props.borderRadius || 15}px`} ${(props) => `${props.borderRadius|| 15}px`}
`;