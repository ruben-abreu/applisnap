import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { ThemeContext } from '../context/theme.context';
import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CancelButton from './CancelButton';
import CircularProgress from '@mui/material/CircularProgress';

function DeleteBoardButton({ boardId, onDelete }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { authenticateUser } = useContext(AuthContext);
  const { width } = useContext(ThemeContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete(boardId);
      await authenticateUser();
      setIsLoading(false);
      handleClose();
    } catch (error) {
      setIsLoading(false);
      console.error('Error deleting board:', error);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="error"
        fullWidth
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
        sx={{ fontSize: width < 450 ? '12px' : '16px' }}
      >
        Delete
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this board?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CancelButton setOpen={setOpen} />
          <Button
            onClick={handleDelete}
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
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DeleteBoardButton;
