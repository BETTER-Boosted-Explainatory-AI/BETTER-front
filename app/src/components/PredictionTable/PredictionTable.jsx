import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  StyledTableContainer,
  StyledTable,
  StyledTableCell,
  StyledBodyCell,
} from "./PredictionTable.style.js";

const PredictionTable = ({ data = [], headers = ["Label", "Confidence"] }) => {
  if (!Array.isArray(data) || !data.length) {
    console.log("data:" + data);
    return <p>No predictions available.</p>;
  }

  return (
    <StyledTableContainer component={Paper}>
      <StyledTable aria-label="top predictions table">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <StyledTableCell key={index}>{header}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, idx) => {
                const isStatusCol = headers[idx]?.toLowerCase() === "status";
                let cellStyle = {};
                if (isStatusCol) {
                  if (cell === "succeeded")
                    cellStyle = { color: "green" };
                  else if (cell === "failed")
                    cellStyle = { color: "red" };
                }
                return (
                  <StyledBodyCell key={idx} style={cellStyle}>
                    {typeof cell === "number"
                      ? (cell * 100).toFixed(2) + "%"
                      : typeof cell === "string"
                      ? cell.charAt(0).toUpperCase() + cell.slice(1)
                      : cell}
                  </StyledBodyCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default PredictionTable;
