import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import Button from '@mui/material/Button';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';

function EditBoardButton({ onEdit }) {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const { yellowButtonStyle } = useContext(ThemeContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = async () => {
    try {
      await onEdit(newName);
      handleClose();
    } catch (error) {
      alert('Failed to update board');
    }
  };

  const handleInputChange = event => {
    setNewName(event.target.value);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        startIcon={<ChangeCircleRoundedIcon />}
        sx={{
          ...yellowButtonStyle,
        }}
      >
        Edit Name
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Edit Board</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newName"
            label="New Board Name"
            type="text"
            fullWidth
            value={newName}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ ...yellowButtonStyle }}>
            Cancel
          </Button>
          <Button onClick={handleEdit} sx={{ ...yellowButtonStyle }}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default EditBoardButton;
