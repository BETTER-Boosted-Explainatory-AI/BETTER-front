import { styled } from "@mui/material";

export const ImageContainerStyle = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const ImageStyle = styled("img")`
    max-width: 100%;     
    max-height: 300px;   
    height: auto;
    width: auto;
    border-radius: 10px;
    object-fit: contain;      
`;