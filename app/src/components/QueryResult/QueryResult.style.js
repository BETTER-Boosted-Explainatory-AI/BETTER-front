// import { styled } from "@mui/material";
import { styled } from "@mui/material/styles";

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
    width: 100%;
`;

export const QueryResultImageContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    flex: 1;                
    min-width: 0;        
`;

export const QueryResultInfoContainer = styled("div")(({ analyze }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: "2em",
    flex: analyze ? 2 : 1,                 
    minWidth: 0,             
}));

export const QueryResultInfo = styled("div")`
    display: flex;
    flex-flow: column;
    gap: 0.6em;
`;
