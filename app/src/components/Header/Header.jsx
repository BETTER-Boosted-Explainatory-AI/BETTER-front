import React from "react";
import { HeaderStyled, HeaderContainer, NavbarContainer } from "./Header.style";
import NavBar from "../NavBar/NavBar";

const Header = () => {
    return (
        <HeaderStyled>
        <HeaderContainer>
        <h1>BETTER</h1>
        <NavbarContainer>
        <NavBar />
        </NavbarContainer>
        </HeaderContainer>
        </HeaderStyled>
    );
    }

export default Header;