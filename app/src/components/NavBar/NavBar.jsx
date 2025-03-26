import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LinkStyle, NavbarContainer } from "./NavBar.style.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Navbar = () => {
    const [value, setValue] = useState("/");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <NavbarContainer>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="navigation tabs"
            >
                <Tab label="Query" value="/" component={Link} to="/" />
                <Tab label="White-box Testing" value="/WhiteboxTesting" component={Link} to="/WhiteboxTesting" />
                <Tab label="Adversarial Attacks" value="/AdversarialAttacks" component={Link} to="/AdversarialAttacks" />
            </Tabs>
        </NavbarContainer>
    );
};

export default Navbar;
