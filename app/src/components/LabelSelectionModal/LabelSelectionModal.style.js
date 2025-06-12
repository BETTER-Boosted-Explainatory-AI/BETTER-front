import { styled } from "@mui/material";

export const SearchContainer = styled("div")`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 30vw;
  gap: 1em;
`;

export const SearchInput = styled("input")`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ParagraphContainer = styled("p")(({ theme }) => ({
    color: theme.palette.primary.text,
    fontSize: "1rem",
  }));
  