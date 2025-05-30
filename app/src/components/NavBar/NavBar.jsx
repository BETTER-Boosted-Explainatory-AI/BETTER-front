import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LinkStyle, NavbarContainer } from "./NavBar.style.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ROUTES } from "../../consts/routes";

const getTabValue = (pathname) => {
  if (pathname === ROUTES.HOME) {
    return false;
  } else if (pathname.startsWith(ROUTES.ADVERSARIAL_ATTACKS)) {
    return ROUTES.ADVERSARIAL_ATTACKS;
  } else if (
    pathname === ROUTES.QUERY ||
    pathname === ROUTES.WHITEBOX_TESTING ||
    pathname === ROUTES.ADVERSARIAL_DETECTION ||
    pathname === ROUTES.ADVERSARIAL_ANALYSIS
  ) {
    return pathname;
  } else {
    return false;
  }
};

const Navbar = () => {
  const location = useLocation();
  const [value, setValue] = useState(getTabValue(location.pathname));
  const [menuAnchor, setMenuAnchor] = useState(null);

  useEffect(() => {
    setValue(getTabValue(location.pathname));
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
        gap={20}
      >
        <Tab
          sx={{ mx: 5, fontSize: "1rem" }}
          label="Query"
          value={ROUTES.QUERY}
          component={Link}
          to={ROUTES.QUERY}
        />
        <Tab
          sx={{ mx: 5, fontSize: "1rem" }}
          label="White-box Testing"
          value={ROUTES.WHITEBOX_TESTING}
          component={Link}
          to={ROUTES.WHITEBOX_TESTING}
        />
        <Tab
          sx={{ mx: 5, fontSize: "1rem" }}
          label="Adversarial Attacks"
          value={ROUTES.ADVERSARIAL_ATTACKS}
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
          <Tab
            label="Attack Detection"
            value={ROUTES.ADVERSARIAL_DETECTION}
            component={Link}
            to={ROUTES.ADVERSARIAL_DETECTION}
          />
        </MenuItem>
        <MenuItem>
          <Tab
            label="Attack Demonstration"
            value={ROUTES.ADVERSARIAL_ANALYSIS}
            component={Link}
            to={ROUTES.ADVERSARIAL_ANALYSIS}
          />
        </MenuItem>
      </Menu>
    </NavbarContainer>
  );
};

export default Navbar;
