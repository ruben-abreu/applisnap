import { useState } from 'react';
import AddJobApplication from './AddJobApplication';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function AddJobButton() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Button onClick={handleOpenDialog}>
        <AddCircleIcon />
      </Button>
      <AddJobApplication
        open={openDialog}
        onClose={handleCloseDialog}
        application={{}}
      />
    </div>
  );
}

export default AddJobButton;
