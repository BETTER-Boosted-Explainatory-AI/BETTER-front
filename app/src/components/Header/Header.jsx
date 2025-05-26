import React, { useContext } from "react";
import {
  HeaderContainer,
  LogoContainer,
  LogoStyle,
  LogoTypography,
  NavbarContainer,
} from "./Header.style";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import AIIcon from "../../assets/artificialIntelligence.png";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ModelContext } from "../../contexts/ModelProvider";

const Header = () => {
  const { models } = useContext(ModelContext);
  const navigate = useNavigate();

  return (
    <>
      <HeaderContainer>
        <Link to={"/"}>
          <LogoContainer>
            <LogoStyle src={AIIcon} alt="logo" />
            <LogoTypography>BETTER</LogoTypography>
          </LogoContainer>
        </Link>
        {models.length > 0 && (
          <NavbarContainer>
            <NavBar />
          </NavbarContainer>
        )}
      </HeaderContainer>
      {models.length > 0 && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/NewModel")}
          sx={{
            margin: "0.5em 1em",
            color: "#fff",
            whiteSpace: "nowrap",
          }}
        >
          Upload Model
        </Button>
      )}
      <AvatarMenu />
    </>
  );
};

export default Header;
