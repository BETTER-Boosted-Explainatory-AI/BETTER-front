import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  StyledTableContainer,
  StyledTable,
  StyledTableCell,
} from "./PredictionTable.style.js";

const PredictionTable = ({ data = [], headers = ["Label", "Confidance"] }) => {
  return (
    <StyledTableContainer component={Paper}>
      <StyledTable aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <StyledTableCell key={index}>{header}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              <StyledBodyCell key={cellIndex} align="left">
                {cell}
              </StyledBodyCell>
            ))}
          </TableRow>
        ))}
      </StyledTable>
    </StyledTableContainer>
  );
};

export default PredictionTable;
