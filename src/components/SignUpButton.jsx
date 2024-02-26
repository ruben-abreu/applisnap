import { useContext } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CancelButton from './CancelButton';
import { ThemeContext } from '../context/theme.context';

function SignUpButton() {
  const [open, setOpen] = React.useState(false);

  const { darkMode } = useContext(ThemeContext);

  const SignUpButtonStyled = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    color: 'white',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#678B85',
    borderColor: '#678B85',

    '&:hover': {
      backgroundColor: '#62a699',
      borderColor: '#62a699',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#30b39a',
      borderColor: '#30b39a',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(55, 89, 84, 0.5)',
    },
  });

  const SignUpDialogTitle = styled(DialogTitle)({
    color: darkMode ? 'white' : '#678B85',
  });

  const SignUpTextField = styled(TextField)({
    '.MuiFormLabel-root': {
      color: darkMode ? 'white' : '#678B85',
    },
    '.MuiInputLabel-root': {
      color: darkMode ? 'white' : '#678B85',
    },
    '.MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
      color: '#30b39a',
    },

    '.MuiInput-underline:after': {
      borderBottom: `2px solid #678B85`,
    },
    '.MuiInputBase-input': { fontFamily: 'Lexend' },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <SignUpButtonStyled onClick={handleClickOpen}>Sign Up</SignUpButtonStyled>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: event => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <SignUpDialogTitle>Sign Up</SignUpDialogTitle>
        <DialogContent>
          <SignUpTextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <SignUpTextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <SignUpTextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <CancelButton setOpen={setOpen} />
          <div className="mr-[16px]">
            <SignUpButtonStyled type="submit">Sign Up</SignUpButtonStyled>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default SignUpButton;
