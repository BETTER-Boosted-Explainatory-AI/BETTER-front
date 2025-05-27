// import { styled } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PaginationContainer = styled("div")`
    display: flex;
    position: relative;
    width: 100%;
    height: 78.5vh;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #f6f9fa;
    padding: 1em;
`;

export const QueryResultContainer = styled("div")(({ dendrogram }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: dendrogram ? "80%" : "90%",
    gap: "2.5em",
}));



`
    display: flex;
    flex-direction: row;    
    align-items: center;      
    justify-content: flex-start;
    width: 90%;
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
    width: 80%;
    gap: 0.6em;
`;
