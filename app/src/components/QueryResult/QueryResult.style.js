// import { styled } from "@mui/material";
import { styled } from "@mui/material/styles";

// export const PaginationContainer = styled("div")`
//     display: flex;
//     position: relative;
//     width: 100%;
//     height: 78.5vh;
//     flex-flow: column;
//     align-items: center;
//     justify-content: center;
//     border-radius: 10px;
//     background-color: #f6f9fa;
//     padding: 1em;
// `;
export const PaginationContainer = styled("div")(() => ({
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "78.5vh",
  padding: "1em",
  gap: "2em",
}));


export const QueryResultContainer = styled("div")(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"flex-start",
    width: "90%",
    height: "80vh",
    gap: "2.5em",
}));

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
