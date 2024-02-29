import { useState, useContext } from 'react';
import { deleteAccount } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DeleteAccountButton() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { darkMode } = useContext(ThemeContext);
  const { user, removeToken } = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccountDelete = () => {
    deleteAccount(user._id);
    removeToken();
    navigate('/');
  };

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

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="error"
        fullWidth
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        Delete Account
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you would like to delete your account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All your boards and content will be permanently lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CancelButtonStyled onClick={handleClose}>Cancel</CancelButtonStyled>
          <Button
            onClick={handleAccountDelete}
            autoFocus
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ padding: '6px 12px' }}
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DeleteAccountButton;
