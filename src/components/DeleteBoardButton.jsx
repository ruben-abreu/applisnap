import { useState } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CancelButton from './CancelButton'; // Updated import

function DeleteBoardButton({ boardId, onDelete }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await onDelete(boardId);
      handleClose();
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant='outlined'
        color='error'
        fullWidth
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        Delete
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Are you sure you would like to delete this board?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CancelButton setOpen={setOpen} />
          <Button
            onClick={handleDelete}
            autoFocus
            variant='outlined'
            color='error'
            startIcon={<DeleteIcon />}
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