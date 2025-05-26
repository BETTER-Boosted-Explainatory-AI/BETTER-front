import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import InsightsIcon from '@mui/icons-material/Insights';
import UserAvatars from '../UserAvatar/UserAvatar';
import { menuPaperSx } from './AvatarMenu.style';
import { Logout as logoutApi } from '../../apis/auth.api';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from "../../consts/routes";
import { UserContext } from '../../contexts/UserProvider';

export default function AvatarMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user } = React.useContext(UserContext);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
   
    const handleLogout = async () => {
        await logoutApi();
        handleClose();
        navigate(ROUTES.LOGIN); 
    };

    const handleStatus = () => {
        handleClose();
        navigate(ROUTES.MODELS_STATUS); 
    }
    
    if (!user) return null;

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <UserAvatars sx={{ width: 32, height: 32 }}></UserAvatars>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: menuPaperSx
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleStatus}>
          <ListItemIcon>
            <InsightsIcon fontSize="small" />
          </ListItemIcon>
          Models Status
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
