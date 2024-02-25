import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function LogInButton() {
  const LogInButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    color: 'black',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: 'white',
    borderColor: 'white',
    fontFamily: 'Lexend',

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

  const LogInButtonForm = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    color: 'white',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#678B85',
    borderColor: '#678B85',
    fontFamily: 'Lexend',

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

  const CancelButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    color: '#666666',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    borderColor: '#666666',
    lineHeight: 1.5,
    fontFamily: 'Lexend',

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

  const LogInDialogTitle = styled(DialogTitle)({
    fontFamily: 'Lexend',
    color: '#678B85',
  });

  const LogInTextField = styled(TextField)({
    '.MuiFormLabel-root': {
      fontFamily: 'Lexend',
      color: '#678B85',
    },
    '.MuiInputLabel-root': {
      fontFamily: 'Lexend',
      color: '#678B85',
    },
    '.MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
      color: '#30b39a',
    },

    '.MuiInput-underline:after': {
      borderBottom: `2px solid #678B85`,
    },
    '.MuiInputBase-input': { fontFamily: 'Lexend' },
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <LogInButton onClick={handleClickOpen}>Log In</LogInButton>
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
        <LogInDialogTitle>Log In</LogInDialogTitle>
        <DialogContent>
          <LogInTextField
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
          <LogInTextField
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
          <CancelButton onClick={handleClose}>Cancel</CancelButton>
          <div className="mr-[16px]">
            <LogInButtonForm type="submit">Log In</LogInButtonForm>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default LogInButton;
