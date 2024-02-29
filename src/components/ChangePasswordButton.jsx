import { useState, useContext } from 'react';
import { changePassword } from '../api/auth.api';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CancelButton from './CancelButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';

function ChangePasswordButton() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');

  const { darkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = event => {
    event.preventDefault();
    setShowPassword(show => !show);
  };

  const isStrongPassword = password => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);

    return (
      password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit
    );
  };

  const handleChangePassword = async () => {
    if (password.trim() === '') {
      alert('Password cannot be empty');
      return;
    }

    if (!isStrongPassword(password)) {
      alert(
        'Password is not strong enough. Please follow the password requirements.'
      );
      return;
    }

    const { firstName, lastName, email, _id, boards, lists, jobs, roles } =
      user;

    const updatedUser = {
      firstName,
      lastName,
      email,
      password,
      _id,
      boards,
      lists,
      jobs,
      roles,
    };

    setIsLoading(true);

    try {
      await changePassword(updatedUser);

      setIsLoading(false);
      alert('Your password was successfully updated.');

      setPassword('');
      handleClose();
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };

  const ChangePasswordButtonStyled = styled(Button)({
    width: '100%',
    boxShadow: 'none',
    textTransform: 'none',
    color: '#ebb542',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    borderColor: '#ebb542',
    lineHeight: 1.5,

    '&:hover': {
      backgroundColor: '#faf1de',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#f2e0b8',
      borderColor: '#f2e0b8',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(235, 181, 66, 0.5)',
    },
  });

  const ChangePasswordDialogTitle = styled(DialogTitle)({
    color: darkMode ? 'white' : '#678B85',
  });

  return (
    <React.Fragment>
      <ChangePasswordButtonStyled
        onClick={handleClickOpen}
        startIcon={<ChangeCircleRoundedIcon />}
      >
        Change Password
      </ChangePasswordButtonStyled>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
        }}
      >
        <ChangePasswordDialogTitle>Change Password</ChangePasswordDialogTitle>
        <DialogContent>
          <FormControl
            variant="standard"
            required
            fullWidth
            sx={{
              '.MuiFormLabel-root': {
                color: theme =>
                  theme.palette.mode === 'dark' ? 'white' : '#678B85',
              },
              '.MuiInputLabel-root': {
                color: theme =>
                  theme.palette.mode === 'dark' ? 'white' : '#678B85',
              },
              '.MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
                color: '#30b39a',
              },
              '.MuiInput-underline:after': {
                borderBottom: '2px solid #678B85',
              },
              '&:hover': {
                '.MuiInput-underline:after': {
                  borderBottom: '2px solid #30b39a',
                },
              },
              '.MuiInput-root': {
                '&.Mui-focused': {
                  borderColor: '#30b39a',
                },
              },
            }}
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              value={password}
              onChange={handlePasswordChange}
              type={showPassword ? 'text' : 'password'}
              autoComplete="on"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{
                      marginRight: 0,
                      marginLeft: '8px',
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <div className="mr-[6px]">
            {isLoading && (
              <CircularProgress
                sx={{ color: darkMode ? 'white' : '#678B85' }}
              />
            )}
          </div>
          <CancelButton setOpen={setOpen} setPassword={setPassword} />
          <div className="mr-[16px]">
            <ChangePasswordButtonStyled
              onClick={handleChangePassword}
              startIcon={<ChangeCircleRoundedIcon />}
            >
              Change Password
            </ChangePasswordButtonStyled>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ChangePasswordButton;
