import { styled } from "@mui/material";

export const PaginationContainer = styled("div")`
    display: flex;
    position: relative;
    width: 100%;
    height: 70vh;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #FBFBFB;
    gap: 0.5em;
    padding: 1em;
`;

export const QueryResultContainer = styled("div")`
    display: flex;
    flex-direction: row;    
    align-items: center;      
    justify-content: flex-start;
    width: 80%;
`;

export const QueryResultImageContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    flex: 1;                
    min-width: 0;        
`;

export const QueryResultInfoContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2em;
    flex: 1;                 
    min-width: 0;             
`;

export const QueryResultInfo = styled("div")`
    display: flex;
    flex-flow: column;
    gap: 0.6em;
`;
