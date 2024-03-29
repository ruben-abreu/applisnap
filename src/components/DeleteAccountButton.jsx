import { useState, useContext } from 'react';
import { deleteAccount, deleteImage } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import CancelButton from './CancelButton';

function DeleteAccountButton() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, removeToken, authenticateUser } = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUserImage = async () => {
    try {
      await deleteImage(user.imgPublicId);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const deleteUser = async () => {
    setIsLoading(true);

    try {
      await deleteAccount(user._id);
      removeToken();
      setIsLoading(false);

      alert('Your account was successfully deleted.');
      authenticateUser();
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };

  const handleAccountDelete = async () => {
    setIsLoading(true);

    if (user.imgPublicId) {
      deleteUserImage();
    }

    deleteUser();
  };

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
          <CancelButton setOpen={setOpen} />
          <Button
            onClick={handleAccountDelete}
            autoFocus
            variant="outlined"
            color="error"
            startIcon={
              isLoading ? (
                <CircularProgress sx={{ color: '#f44336' }} size={16} />
              ) : (
                <DeleteIcon />
              )
            }
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
