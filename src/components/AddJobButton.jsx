import { useState, useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import AddJobApplication from './AddJobApplication';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function AddJobButton({
  board,
  fetchBoard,
  list,
  role,
  boardId,
  defaultList,
  currentBoardName,
  setCurrentBoardName,
  updateUser,
}) {
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
      <button onClick={handleOpenDialog} className="w-[20px] h-[20px] ml-[5px]">
        <AddCircleIcon
          sx={{ ...greenIconButtonStyle, width: '20px', height: '20px' }}
        />
      </button>
      <AddJobApplication
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        list={list}
        role={role}
        board={board}
        fetchBoard={fetchBoard}
        boardId={boardId}
        defaultList={defaultList}
        currentBoardName={currentBoardName}
        setCurrentBoardName={setCurrentBoardName}
        updateUser={updateUser}
      />
    </div>
  );
}

export default AddJobButton;
