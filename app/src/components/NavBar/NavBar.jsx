import React from "react";
import {LinkStyle, NavbarContainer} from "./NavBar.style.js";
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <NavbarContainer>
            <Link to={"/"}>
                <LinkStyle>Query</LinkStyle>
            </Link>
            <Link to={"/WhiteboxTesting"}>
                <LinkStyle>White-box Testing</LinkStyle>
            </Link>
            <Link to={"/AdversarialAttacks"}>
                <LinkStyle>Adversarial Attacks</LinkStyle>
            </Link>
        </NavbarContainer>
    );
}

export default Navbar;