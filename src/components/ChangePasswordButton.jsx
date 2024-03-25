import { useState, useContext } from 'react';
import { updateUser } from '../api/auth.api';
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

  const { darkMode, yellowButtonStyle, formGreenStyle } =
    useContext(ThemeContext);
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

  const handleChangePassword = async e => {
    e.preventDefault();

    if (password.trim() === '') {
      alert('Password cannot be empty');
      return;
    }

    if (!isStrongPassword(password)) {
      alert(
        'Password must have at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.'
      );
      return;
    }

    const { _id } = user;

    const userDetails = { password, _id };

    setIsLoading(true);

    try {
      await updateUser(userDetails);

      setIsLoading(false);
      alert('Your password was successfully updated.');

      setPassword('');
      handleClose();
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };

  const ChangePasswordDialogTitle = styled(DialogTitle)({
    color: darkMode ? 'white' : '#678B85',
  });

  return user ? (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        startIcon={<ChangeCircleRoundedIcon />}
        sx={{ ...yellowButtonStyle }}
      >
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <ChangePasswordDialogTitle>Change Password</ChangePasswordDialogTitle>
        <form action="submit" onSubmit={handleChangePassword}>
          <DialogContent>
            <FormControl
              variant="standard"
              required
              fullWidth
              sx={{ ...formGreenStyle }}
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
            <CancelButton setOpen={setOpen} setPassword={setPassword} />
            <div className="mr-[16px]">
              <Button
                type="submit"
                onClick={handleChangePassword}
                startIcon={
                  isLoading ? (
                    <CircularProgress sx={{ color: '#ebb542' }} size={16} />
                  ) : (
                    <ChangeCircleRoundedIcon />
                  )
                }
                sx={{ ...yellowButtonStyle }}
              >
                Change Password
              </Button>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  ) : (
    <CircularProgress />
  );
}

export default ChangePasswordButton;
