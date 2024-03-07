import { useContext } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ThemeContext } from '../context/theme.context';

function CancelButton({
  setOpen,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setForgotPasswordClicked,
  setBoardName,
}) {
  const { lightButtonStyle } = useContext(ThemeContext);

  const handleClose = () => {
    setOpen(false);
    setEmail ? setEmail('') : '';
    setPassword ? setPassword('') : '';
    setFirstName ? setFirstName('') : '';
    setLastName ? setLastName('') : '';
    setForgotPasswordClicked ? setForgotPasswordClicked(false) : '';
    setBoardName ? setBoardName('') : '';
  };

  return (
    <Button onClick={handleClose} sx={{ ...lightButtonStyle }}>
      Cancel
    </Button>
  );
}

export default CancelButton;
