import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import Button from '@mui/material/Button';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';

function EditBoardButton({ onEdit }) {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const {
    yellowButtonStyle,
    lightButtonStyle,
    buttonGreenStyle,
    formGreenStyle,
    width,
  } = useContext(ThemeContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = async e => {
    e.preventDefault();

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
        startIcon={<ModeEditRoundedIcon />}
        sx={{
          ...yellowButtonStyle,
          fontSize: width < 450 ? '12px' : '16px',
        }}
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Edit Board</DialogTitle>
        <form action="submit" onSubmit={handleEdit}>
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
              sx={{ ...formGreenStyle }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ ...lightButtonStyle }}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleEdit}
              sx={{ ...buttonGreenStyle }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default EditBoardButton;
