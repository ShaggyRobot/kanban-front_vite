import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';

function UserDashboard(): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const login = localStorage.getItem('login');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate('/editprofile');
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    const entries = ['token', 'login', 'userId'];
    entries.forEach((entry) => localStorage.removeItem(entry));
    navigate('/');
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="user-dashboard"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ textTransform: 'none' }}
      >
        <AccountCircleIcon sx={{ marginRight: '.5rem' }} /> {login}
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon color="info" sx={{ mr: '.5rem' }} />
          {t('profile')}
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <LogoutIcon color="info" sx={{ mr: '.5rem' }} />
          {t('logout')}
        </MenuItem>
      </Menu>
    </div>
  );
}
export { UserDashboard };
