import { styled } from "@mui/material";

export const NavbarContainer = styled("div")`
    display: flex;
    align-items: center;
    flex-flow: row;
    gap: 40%;
`;

export const LinkStyle = styled("span")`
    text-decoration: none;
    color: #222831;
    font-size: 1.35rem;
    font-weight: 400;
    cursor: pointer;
    white-space: nowrap;


    &:hover {
        color: #4F9BE5;
        font-weight: 500;

    }
`;