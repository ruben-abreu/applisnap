import { useParams, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { resetPassword } from '../api/auth.api';
import { ThemeContext } from '../context/theme.context';
import Button from '@mui/material/Button';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';

function ResetPassword() {
  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');

  const { darkMode, yellowButtonStyle, formGreenStyle } =
    useContext(ThemeContext);

  const navigate = useNavigate();

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
        'Password must have at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.'
      );
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(token, password);

      setIsLoading(false);
      alert('Your password was successfully updated. Please log in.');

      setPassword('');

      navigate('/');
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-full min-h-[60vh] flex justify-center items-center">
      <form className="max-w-[500px] mx-[2%]">
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
        <div className="mt-[20px]">
          <Button
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
        <div className="mr-[6px]">
          {isLoading && (
            <CircularProgress sx={{ color: darkMode ? 'white' : '#678B85' }} />
          )}
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
