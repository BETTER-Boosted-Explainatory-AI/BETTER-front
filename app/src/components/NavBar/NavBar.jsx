import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LinkStyle, NavbarContainer } from "./NavBar.style.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbar = () => {
    const location = useLocation();
    const [value, setValue] = useState(location.pathname === "/" ? false : location.pathname);
    const [menuAnchor, setMenuAnchor] = useState(null);

    useEffect(() => {
        if (location.pathname === "/") {
            setValue(false);
        } else if (location.pathname.startsWith("/Adversarial/")) {
            setValue("/AdversarialAttacks");
        } else {
            setValue(location.pathname);
        }
    }, [location.pathname]);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
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
                <Tab
                    label="Adversarial Attacks"
                    value="/AdversarialAttacks"
                    onClick={(e) => {
                        e.preventDefault();
                        setMenuAnchor(e.currentTarget);
                    }}
                />
            </Tabs>
            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
            >
                <MenuItem>
                <Tab label="Detection" value="/Adversarial/Detection" component={Link} to="/Adversarial/Detection" />
                </MenuItem>
                <MenuItem>
                <Tab label="Analysis" value="/Adversarial/Analysis" component={Link} to="/Adversarial/Analysis" />
                </MenuItem>
            </Menu>
        </NavbarContainer>
    );
};

export default Navbar;
