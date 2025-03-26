import { styled } from "@mui/material";

export const HeaderContainer = styled("div")`
    display: flex;
    gap: 2%;
    width: 100%;
`;

export const NavbarContainer = styled("div")`
    display: flex;
    justify-content: center;
    position: relative;
    justify-self: flex-start;
`;

export const LogoStyle = styled("img")` 
    width: 45px;
    height: 45px;
    display: block;

    @media (max-width: 768px) {

    }
`;

export const LogoTypography = styled("h1")`
    font-size: 1.3em;
    letter-spacing: 0.2rem;
    color: #222831;
`;

export const LogoContainer = styled("div")`
    display: flex;
    align-items: center;
    gap: 10px;
`;