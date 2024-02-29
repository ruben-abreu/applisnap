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
}) {
  const { darkMode } = useContext(ThemeContext);

  const CancelButtonStyled = styled(Button)({
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

  const handleClose = () => {
    setOpen(false);
    setEmail ? setEmail('') : '';
    setPassword ? setPassword('') : '';
    setFirstName ? setFirstName('') : '';
    setLastName ? setLastName('') : '';
  };

  return <CancelButtonStyled onClick={handleClose}>Cancel</CancelButtonStyled>;
}

export default CancelButton;
