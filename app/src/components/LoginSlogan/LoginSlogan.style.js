import { styled } from "@mui/material";
import { LogoContainer } from "../Header/Header.style";

export const LoginSloganContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export const LogoStyle = styled("img")`
  width: 321px;
  height: 90px;
  display: block;
  object-fit: contain;
`;

export const SloganTypography = styled("h1")`
  font-size: 1.5em;
  color: #132137;
  font-weight: 400;
`;

export const BoldSloganTypography = styled("span")`
  font-weight: 700;
  color: #76abae;
`;

export const SloganParagraph = styled("p")`
  font-size: 0.9em;
  color: #222831;
  text-align: center;
  margin-top: 0.5em;
  font-family: "Oxanium", sans-serif;
`;
