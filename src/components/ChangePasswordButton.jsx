import { useState, useContext } from 'react';
import { changePassword } from '../api/auth.api';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';

function ChangePasswordButton() {
  const { darkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const handleChangePassword = () => {
    changePassword(user);
  };

  const ChangePasswordButtonStyled = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    color: darkMode ? 'white' : '#666666',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    borderColor: '#666666',
    lineHeight: 1.5,

    '&:hover': {
      color: 'white',
      backgroundColor: '#a9ccc6',
      borderColor: '#a9ccc6',
      boxShadow: 'none',
    },
    '&:active': {
      color: 'white',
      boxShadow: 'none',
      backgroundColor: '#7fb3aa',
      borderColor: '#7fb3aa',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(127, 179, 170, 0.5)',
    },
  });

  return (
    <ChangePasswordButtonStyled
      onClick={handleChangePassword}
      startIcon={<ChangeCircleRoundedIcon />}
    >
      Change Password
    </ChangePasswordButtonStyled>
  );
}

export default ChangePasswordButton;
