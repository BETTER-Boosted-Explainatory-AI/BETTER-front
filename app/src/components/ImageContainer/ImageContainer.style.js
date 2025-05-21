import { styled } from "@mui/material";

export const ImageContainerStyle = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const ImageStyle = styled("img")`
    height: 15em;         
    width: auto;           
    border-radius: 10px;
    object-fit: contain;   
    max-width: 100%;        
`;