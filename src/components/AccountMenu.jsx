import { useState, useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ContentPasteSearchRoundedIcon from '@mui/icons-material/ContentPasteSearchRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const { darkMode } = useContext(ThemeContext);

  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar
          sx={{
            width: '30px',
            height: '30px',
            backgroundColor: darkMode ? 'white' : '#677f8b',
          }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DashboardRoundedIcon
              fontSize="small"
              sx={{ color: darkMode ? 'white' : '#677f8b' }}
            />
          </ListItemIcon>
          Boards
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AutoAwesomeRoundedIcon
              fontSize="small"
              sx={{ color: darkMode ? 'white' : '#677f8b' }}
            />
          </ListItemIcon>
          Wishlist
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SendRoundedIcon
              fontSize="small"
              sx={{ color: darkMode ? 'white' : '#677f8b' }}
            />
          </ListItemIcon>
          Applications
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ContentPasteSearchRoundedIcon
              fontSize="small"
              sx={{ color: darkMode ? 'white' : '#677f8b' }}
            />
          </ListItemIcon>
          Interviews
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EmojiEventsRoundedIcon
              fontSize="small"
              sx={{ color: darkMode ? 'white' : '#677f8b' }}
            />
          </ListItemIcon>
          Offers
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ThumbDownAltRoundedIcon
              fontSize="small"
              sx={{ color: darkMode ? 'white' : '#677f8b' }}
            />
          </ListItemIcon>
          Rejected
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Avatar
              sx={{
                width: 20,
                height: 20,
                backgroundColor: darkMode ? 'white' : '#677f8b',
              }}
            />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings
              fontSize="small"
              sx={{ color: darkMode ? 'white' : '#677f8b' }}
            />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout
              fontSize="small"
              sx={{ color: darkMode ? 'white' : '#677f8b' }}
            />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default AccountMenu;
