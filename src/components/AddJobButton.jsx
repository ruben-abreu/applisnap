import { useState, useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import AddJobApplication from './AddJobApplication';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function AddJobButton() {
  const [openDialog, setOpenDialog] = useState(false);

  const { greenIconButtonStyle } = useContext(ThemeContext);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Button
        onClick={handleOpenDialog}
        startIcon={<AddCircleIcon />}
        sx={{ ...greenIconButtonStyle }}
      ></Button>
      <AddJobApplication
        open={openDialog}
        onClose={handleCloseDialog}
        application={{}}
      />
    </div>
  );
}

export default AddJobButton;
