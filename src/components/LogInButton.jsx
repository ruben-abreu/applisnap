import { useState, useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import { login, forgotPassword } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
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

function LogInButton() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);

  const { darkMode, lightButtonNoBorder, buttonGreenStyle, formGreenStyle } =
    useContext(ThemeContext);
  const { storeToken, storeUserId, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForgotPasswordClicked(false);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleEmailChange = event => {
    setEmail(event.target.value.trim());
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = event => {
    event.preventDefault();
    setShowPassword(show => !show);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  };

  const handleLogin = async e => {
    e.preventDefault();

    if (!email || email.trim() === '') {
      alert('Email cannot be empty');
      return;
    }

    if (!isValidEmail) {
      alert('Invalid email format');
      return;
    }

    if (password.trim() === '') {
      alert('Password cannot be empty');
      return;
    }

    const user = { email, password };

    setIsLoading(true);

    try {
      const response = await login(user);

      setIsLoading(false);
      storeToken(response.data.authToken);
      storeUserId(response.data.userId);
      authenticateUser();
      setPassword('');
      handleClose();
      navigate(
        `/boards/${response.data.boards[response.data.boards.length - 1]}`
      );
    } catch (error) {
      setIsLoading(false);
      console.log('Error logging in', error);
      alert(error.response.data.message);
    }
  };

  const handleForgotPassword = async e => {
    e.preventDefault();

    if (!email || email.trim() === '') {
      alert('Email cannot be empty');
      return;
    }

    if (!isValidEmail) {
      alert('Invalid email format');
      return;
    }

    setIsLoading(true);

    try {
      await forgotPassword(email);
      setIsLoading(false);
      setForgotPasswordClicked(false);
      handleClose();
      alert(
        'Please check your email inbox and spam, you will receive a reset link in the next few minutes'
      );
    } catch (error) {
      console.log('Error on password reset', error);
      alert(error.response.data.message);
    }
  };

  const LogInDialogTitle = styled(DialogTitle)({
    color: darkMode ? 'white' : '#678B85',
  });

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} sx={{ ...lightButtonNoBorder }}>
        Log In
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          component: 'form',
        }}
      >
        <LogInDialogTitle>
          {!forgotPasswordClicked ? 'Log In' : 'Reset Password'}
        </LogInDialogTitle>

        <form
          action="submit"
          onSubmit={!forgotPasswordClicked ? handleLogin : handleForgotPassword}
        >
          <DialogContent>
            <FormControl
              variant="standard"
              required
              fullWidth
              sx={{ ...formGreenStyle }}
            >
              <InputLabel htmlFor="standard-adornment-email">
                Email Address
              </InputLabel>
              <Input
                id="standard-adornment-email"
                value={email}
                onChange={handleEmailChange}
                onBlur={validateEmail}
                error={!isValidEmail}
                type="email"
                label="Email Address"
              />
            </FormControl>

            {!forgotPasswordClicked && (
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
            )}
          </DialogContent>
          <DialogActions>
            <div className="flex flex-col">
              <div className="flex">
                <div className="mr-[6px]">
                  <CancelButton
                    setOpen={setOpen}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    setForgotPasswordClicked={setForgotPasswordClicked}
                  />
                </div>
                <div className="mr-[16px]">
                  <Button
                    type="submit"
                    onClick={
                      !forgotPasswordClicked
                        ? handleLogin
                        : handleForgotPassword
                    }
                    startIcon={
                      isLoading && (
                        <CircularProgress sx={{ color: 'white' }} size={16} />
                      )
                    }
                    sx={{
                      ...buttonGreenStyle,
                    }}
                  >
                    {!forgotPasswordClicked ? 'Log In' : 'Reset Password'}
                  </Button>
                </div>
              </div>
              <div
                className={`text-right text-[14px] ${
                  darkMode ? 'text-white' : 'text-[#678B85]'
                } mr-[16px] mt-[15px]`}
              >
                {!forgotPasswordClicked && (
                  <button onClick={() => setForgotPasswordClicked(true)}>
                    Forgot password?
                  </button>
                )}
              </div>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default LogInButton;
