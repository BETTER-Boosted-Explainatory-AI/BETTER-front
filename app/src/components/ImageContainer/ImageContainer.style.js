import { styled } from "@mui/material";

export const ImageContainerStyle = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 25px;
`;

export const ImageStyle = styled("img")`
    width: 25%;
    height: 25%;
    border-radius: 10px;
    object-fit: fill;
`;