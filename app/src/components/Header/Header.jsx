import React from "react";
import { HeaderContainer, LogoContainer, LogoStyle, LogoTypography, NavbarContainer } from "./Header.style";
import { Link } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import AIIcon from "../../assets/artificialIntelligence.png";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useNavigate, useLocation } from 'react-router-dom';
import { ModelContext } from "../../contexts/ModelProvider";

const Header = () => {
    return (
        <>
            <HeaderContainer>
                <Link to={"/"}>
                    <LogoContainer>
                        <LogoStyle src={AIIcon} alt="logo" />
                        <LogoTypography>BETTER</LogoTypography>
                    </LogoContainer>
                </Link>
                <NavbarContainer>
                    <NavBar />
                </NavbarContainer>
            </HeaderContainer>
            <AvatarMenu />
        </>
    );
}

export default Header;