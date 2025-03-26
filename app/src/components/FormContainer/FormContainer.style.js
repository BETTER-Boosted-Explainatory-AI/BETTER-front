import { styled } from "@mui/material";

export const FormContainerStyle = styled("div")`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5%;
    padding: 25px;
    background-color: ${(props) => props.bgColor || '#c8dde0'};
    border-radius: 15px 15px  ${(props) => `${props.borderRadius || 15}px`} ${(props) => `${props.borderRadius|| 15}px`}
`;