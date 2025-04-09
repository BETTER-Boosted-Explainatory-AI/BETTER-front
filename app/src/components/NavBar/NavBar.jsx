import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LinkStyle, NavbarContainer } from "./NavBar.style.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Navbar = () => {
    const location = useLocation();
    const [value, setValue] = useState(location.pathname === "/" ? false : location.pathname);
    
    // Update the active tab when the location changes
    useEffect(() => {
        // If at root path, set value to false to deselect all tabs
        if (location.pathname === "/") {
            setValue(false);
        } else {
            setValue(location.pathname);
        }
    }, [location.pathname]);

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
                <Tab label="Query" value="/Query" component={Link} to="/Query" />
                <Tab label="White-box Testing" value="/WhiteboxTesting" component={Link} to="/WhiteboxTesting" />
                <Tab label="Adversarial Attacks" value="/AdversarialAttacks" component={Link} to="/AdversarialAttacks" />
            </Tabs>
        </NavbarContainer>
    );
};

export default Navbar;
