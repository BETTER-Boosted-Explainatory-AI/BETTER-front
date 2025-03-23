import { styled } from "@mui/material";

export const NavbarContainer = styled("div")`
    display: flex;
    align-items: center;
    flex-flow: row;
    margin-left: 5%;
    gap: 10%;
`;

export const LinkStyle = styled("span")`
    text-decoration: none;
    color: #ADD8E6;
    font-size: 1.1rem;
    font-weight: 400;
    cursor: pointer;
    white-space: nowrap;


    &:hover {
        color: #4F9BE5;
        font-weight: 500;

    }
`;