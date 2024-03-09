import { useState, useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import AddJobApplication from './AddJobApplication';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function AddJobButton({ board, fetchBoard, list, role, boardId }) {
  const [open, setOpen] = useState(false);

  const { greenIconButtonStyle } = useContext(ThemeContext);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleOpenDialog}
        startIcon={<AddCircleIcon />}
        sx={{ ...greenIconButtonStyle }}
      ></Button>
      <AddJobApplication
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        application={{}}
        list={list}
        role={role}
        board={board}
        fetchBoard={fetchBoard}
        boardId={boardId}
      />
    </div>
  );
}

export default AddJobButton;
