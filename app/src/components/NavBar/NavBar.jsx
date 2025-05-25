import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LinkStyle, NavbarContainer } from "./NavBar.style.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const getTabValue = (pathname) => {
  if (pathname === "/") {
    return false;
  } else if (pathname.startsWith("/Adversarial/")) {
    return "/Adversarial";
  } else if (
    pathname === "/Query" ||
    pathname === "/WhiteboxTesting" ||
    pathname === "/Adversarial"
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
        gap={10}
      >
        <Tab
          sx={{ mx: 2 }}
          label="Query"
          value="/Query"
          component={Link}
          to="/Query"
        />
        <Tab
          sx={{ mx: 2 }}
          label="White-box Testing"
          value="/WhiteboxTesting"
          component={Link}
          to="/WhiteboxTesting"
        />
        <Tab
          sx={{ mx: 2 }}
          label="Adversarial Attacks"
          value="/Adversarial"
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
              label="Detection"
              value="/Adversarial/Detection"
              component={Link}
              to="/Adversarial/Detection"
            />
          </MenuItem>
          <MenuItem>
            <Tab
              label="Analysis"
              value="/Adversarial/Analysis"
              component={Link}
              to="/Adversarial/Analysis"
            />
          </MenuItem>
        </Menu>
    </NavbarContainer>
  );
};

export default Navbar;
