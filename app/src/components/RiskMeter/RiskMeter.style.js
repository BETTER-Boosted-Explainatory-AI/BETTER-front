import { styled } from "@mui/material";

export const RiskMeterContainer = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

export const ParagraphContainer = styled("p")(({ theme }) => ({
  color: theme.palette.primary.text,
  fontSize: "18px",
  textTransform: "uppercase",
}));
