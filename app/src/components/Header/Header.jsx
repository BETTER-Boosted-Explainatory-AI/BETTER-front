import React from "react";
import { HeaderStyled, HeaderContainer } from "./Header.style";
import NavBar from "../NavBar/NavBar";

const Header = () => {
    return (
        <HeaderStyled>
        <HeaderContainer>
        <h1>BETTER</h1>
        <NavBar />
        </HeaderContainer>
        </HeaderStyled>
    );
    }

export default Header;