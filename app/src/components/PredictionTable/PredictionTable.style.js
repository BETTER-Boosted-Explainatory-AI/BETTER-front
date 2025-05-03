import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export const StyledTableContainer = styled(TableContainer)({
  width: "25%",
});

export const StyledTable = styled(Table)(({ theme }) => ({
  "& .MuiTableCell-root": {
    borderColor: "#9fc4c6",
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: "#c8dde0",
    color: " #31363F",
    fontWeight: 600,
    textAlign: "center",
    borderRight: "1px solid #9fc4c6"
  },
  padding: "8px 8px 8px 15px",
  borderRight: "1px solid #9fc4c6",
    "&:last-child": {
        borderRight: "none",
    },
}));


  