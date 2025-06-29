import { styled } from "@mui/material";

export const ButtonContainer = styled("div")`
  display: flex;
  margin-top: 10px;
  justify-content: center;
  gap: 10px;
  flex-direction: column;
  align-items: center;
`;

export const ParagraphContainer = styled("p")(({ theme }) => ({
  marginTop: "10px",
  color: theme.palette.primary.text,
  fontSize: "0.9rem",
}));
