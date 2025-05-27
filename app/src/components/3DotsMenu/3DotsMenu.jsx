import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ThreeDotsMenu = ({ menuItems, onMenuItemClick }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleMenuItemClick = (item) => {
        onMenuItemClick(item);
        handleClose();
    };
    
    return (
        <>
        <IconButton
            aria-label="more"
            aria-controls={open ? "long-menu" : undefined}
            aria-haspopup="true"
            width="24px"
            height="24px"
            sx={{ padding: 0 }}
            onClick={handleClick}
        >
            <MoreVertIcon />
        </IconButton>
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            {menuItems.map((item) => (
            <MenuItem key={item.label} onClick={() => handleMenuItemClick(item)}>
                {item.label}
            </MenuItem>
            ))}
        </Menu>
        </>
    );
    }

export default ThreeDotsMenu;