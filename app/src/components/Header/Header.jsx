import React from "react";
import { HeaderContainer, LogoContainer, LogoStyle, LogoTypography, NavbarContainer } from "./Header.style";
import { Link } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import AIIcon from "../../assets/artificialIntelligence.png";
import UserAvatars from "../UserAvatar/UserAvatar";
import AvatarMenu from "../AvatarMenu/AvatarMenu";

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