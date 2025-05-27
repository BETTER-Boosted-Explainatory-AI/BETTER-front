import { styled } from "@mui/material";

export const ImageContainerStyle = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const ImageStyle = styled("img")`
    max-width: 100%;      // Image won't exceed container width
    max-height: 400px;    // Adjust this value as needed
    height: auto;
    width: auto;
    border-radius: 10px;
    object-fit: contain;      
`;