import { styled } from "@mui/material";

export const NavbarContainer = styled("div")`
    display: flex;
    align-items: center;
    flex-flow: row;
    gap: 20%;
`;

export const LinkStyle = styled("span")`
    text-decoration: none;
    color: #222831;
    font-size: 1.35rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.3s ease-in-out, font-weight 0.3s ease-in-out;

    &:hover {
        color: #76ABAE;
        font-weight: 500;

    }
`;