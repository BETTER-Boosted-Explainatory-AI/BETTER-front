import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LinkStyle, NavbarContainer } from "./NavBar.style.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { LoggedUser } from "../../apis/auth.api.js";

const Navbar = () => {
    const location = useLocation();
    const [value, setValue] = useState(location.pathname === "/" ? false : location.pathname);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (location.pathname === "/") {
            setValue(false);
        } else if (location.pathname.startsWith("/Adversarial/")) {
            setValue("/AdversarialAttacks");
        } else {
            setValue(location.pathname);
        }
    }, [location.pathname]);


    useEffect(() => {
        async function checkUser() {
            try {
                const user = await LoggedUser();
                setIsLoggedIn(!!(user && (user.user?.id || user.user?.email)));
            } catch {
                setIsLoggedIn(false);
            }
        }
        checkUser();
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
                        if (isLoggedIn) {
                            setMenuAnchor(e.currentTarget);
                        }
                    }}
                />
            </Tabs>
            {isLoggedIn && ( 
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
            )}
        </NavbarContainer>
    );
};

export default Navbar;
