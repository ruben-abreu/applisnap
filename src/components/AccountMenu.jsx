import { useState, useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';
import { useNavigate, NavLink } from 'react-router-dom';
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
  const { logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logoutUser();
    handleClose();
    navigate('/');
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
        <NavLink
          to="/boards"
          className={({ isActive }) => (isActive ? 'text-[#30b39a]' : '')}
        >
          {({ isActive }) => (
            <MenuItem>
              <ListItemIcon>
                <DashboardRoundedIcon
                  fontSize="small"
                  sx={{
                    color: isActive
                      ? '#30b39a'
                      : darkMode
                      ? 'white'
                      : '#677f8b',
                  }}
                />
              </ListItemIcon>
              Boards
            </MenuItem>
          )}
        </NavLink>
        <NavLink
          to="/wishlist"
          className={({ isActive }) => (isActive ? 'text-[#30b39a]' : '')}
        >
          {({ isActive }) => (
            <MenuItem>
              <ListItemIcon>
                <AutoAwesomeRoundedIcon
                  fontSize="small"
                  sx={{
                    color: isActive
                      ? '#30b39a'
                      : darkMode
                      ? 'white'
                      : '#677f8b',
                  }}
                />
              </ListItemIcon>
              Wishlist
            </MenuItem>
          )}
        </NavLink>
        <NavLink
          to="/applications"
          className={({ isActive }) => (isActive ? 'text-[#30b39a]' : '')}
        >
          {({ isActive }) => (
            <MenuItem>
              <ListItemIcon>
                <SendRoundedIcon
                  fontSize="small"
                  sx={{
                    color: isActive
                      ? '#30b39a'
                      : darkMode
                      ? 'white'
                      : '#677f8b',
                  }}
                />
              </ListItemIcon>
              Applications
            </MenuItem>
          )}
        </NavLink>
        <NavLink
          to="/interviews"
          className={({ isActive }) => (isActive ? 'text-[#30b39a]' : '')}
        >
          {({ isActive }) => (
            <MenuItem>
              <ListItemIcon>
                <ContentPasteSearchRoundedIcon
                  fontSize="small"
                  sx={{
                    color: isActive
                      ? '#30b39a'
                      : darkMode
                      ? 'white'
                      : '#677f8b',
                  }}
                />
              </ListItemIcon>
              Interviews
            </MenuItem>
          )}
        </NavLink>
        <NavLink
          to="/offers"
          className={({ isActive }) => (isActive ? 'text-[#30b39a]' : '')}
        >
          {({ isActive }) => (
            <MenuItem>
              <ListItemIcon>
                <EmojiEventsRoundedIcon
                  fontSize="small"
                  sx={{
                    color: isActive
                      ? '#30b39a'
                      : darkMode
                      ? 'white'
                      : '#677f8b',
                  }}
                />
              </ListItemIcon>
              Offers
            </MenuItem>
          )}
        </NavLink>
        <NavLink
          to="/rejected"
          className={({ isActive }) => (isActive ? 'text-[#30b39a]' : '')}
        >
          {({ isActive }) => (
            <MenuItem>
              <ListItemIcon>
                <ThumbDownAltRoundedIcon
                  fontSize="small"
                  sx={{
                    color: isActive
                      ? '#30b39a'
                      : darkMode
                      ? 'white'
                      : '#677f8b',
                  }}
                />
              </ListItemIcon>
              Rejected
            </MenuItem>
          )}
        </NavLink>

        <Divider />

        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? 'text-[#30b39a]' : '')}
        >
          {({ isActive }) => (
            <MenuItem>
              <ListItemIcon>
                <Avatar
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: isActive
                      ? '#30b39a'
                      : darkMode
                      ? 'white'
                      : '#677f8b',
                  }}
                />
              </ListItemIcon>
              Profile
            </MenuItem>
          )}
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? 'text-[#30b39a]' : '')}
        >
          {({ isActive }) => (
            <MenuItem>
              <ListItemIcon>
                <Settings
                  fontSize="small"
                  sx={{
                    color: isActive
                      ? '#30b39a'
                      : darkMode
                      ? 'white'
                      : '#677f8b',
                  }}
                />
              </ListItemIcon>
              Settings
            </MenuItem>
          )}
        </NavLink>
        <MenuItem onClick={handleLogOut}>
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