import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { addBoard } from '../api/boards.api';
import { addList } from '../api/lists.api';
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CancelButton from './CancelButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import CircularProgress from '@mui/material/CircularProgress';

function AddBoardButton() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [boardName, setBoardName] = useState('');

  const { darkMode, width, formGreenStyle, buttonGreenStyle } =
    useContext(ThemeContext);
  const { user, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    authenticateUser();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBoardNameChange = event => {
    setBoardName(event.target.value);
  };

  const handleAddBoard = async e => {
    e.preventDefault();

    const newBoard = { boardName, userId: user._id };

    setIsLoading(true);

    try {
      const boardResponse = await addBoard(newBoard);

      const firstWishlist = {
        listName: 'Wishlist',
        userId: user._id,
        boardId: boardResponse.data._id,
      };

      const firstAppliedList = {
        listName: 'Applied',
        userId: user._id,
        boardId: boardResponse.data._id,
      };

      const firstInterviewsList = {
        listName: 'Interviews',
        userId: user._id,
        boardId: boardResponse.data._id,
      };

      const firstOffersList = {
        listName: 'Offers',
        userId: user._id,
        boardId: boardResponse.data._id,
      };

      const firstRejectedList = {
        listName: 'Rejected',
        userId: user._id,
        boardId: boardResponse.data._id,
      };

      await addList(firstWishlist);
      await addList(firstAppliedList);
      await addList(firstInterviewsList);
      await addList(firstOffersList);
      await addList(firstRejectedList);

      setIsLoading(false);
      setBoardName('');
      alert('Your new board was successfully created.');
      authenticateUser();
      navigate(`/boards/${boardResponse.data._id}`);
      handleClose();
    } catch (error) {
      setIsLoading(false);
      console.log('Error creating a new board', error);
      alert(error.response.data.message);
    }
  };

  const LogInDialogTitle = styled(DialogTitle)({
    color: darkMode ? 'white' : '#678B85',
  });

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        sx={{ ...buttonGreenStyle, fontSize: width < 450 ? '0.8em' : '16px' }}
      >
        Create New Board
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <LogInDialogTitle>Create New Board</LogInDialogTitle>
        <form action="submit" onSubmit={handleAddBoard}>
          <DialogContent>
            <FormControl
              variant="standard"
              required
              fullWidth
              sx={{ ...formGreenStyle }}
            >
              <InputLabel htmlFor="boardName">Board Name</InputLabel>
              <Input
                id="boardName"
                value={boardName}
                onChange={handleBoardNameChange}
                type="text"
                label="Board Name"
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <div className="flex flex-col">
              <div className="flex">
                <div className="mr-[6px]">
                  <CancelButton setOpen={setOpen} setBoardName={setBoardName} />
                </div>
                <div className="mr-[16px]">
                  <Button
                    type="submit"
                    onClick={handleAddBoard}
                    sx={{ ...buttonGreenStyle }}
                    startIcon={
                      isLoading && (
                        <CircularProgress sx={{ color: 'white' }} size={16} />
                      )
                    }
                  >
                    Create Board
                  </Button>
                </div>
              </div>
              <div
                className={`text-right text-[14px] ${
                  darkMode ? 'text-white' : 'text-[#678B85]'
                } mr-[16px] mt-[15px]`}
              ></div>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default AddBoardButton;
