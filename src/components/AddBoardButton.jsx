import { useState, useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { addBoard } from '../api/boards.api';
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

  const { darkMode } = useContext(ThemeContext);
  const { user, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBoardNameChange = event => {
    setBoardName(event.target.value);
  };

  const handleAddBoard = async () => {
    const newBoard = { boardName, userId: user._id };

    setIsLoading(true);

    try {
      const boardResponse = await addBoard(newBoard);

      setIsLoading(false);
      authenticateUser();
      setBoardName('');
      handleClose();
      navigate(`/boards/${boardResponse._id}`);
    } catch (error) {
      setIsLoading(false);
      console.log('Error creating a new board', error);
      alert(error.response.data.message);
    }
  };

  const AddBoardButtonStyled = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    color: 'white',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#678B85',
    borderColor: '#678B85',

    '&:hover': {
      backgroundColor: '#62a699',
      borderColor: '#62a699',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#30b39a',
      borderColor: '#30b39a',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(55, 89, 84, 0.5)',
    },
  });

  const LogInButtonFormStyled = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    color: 'white',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#678B85',
    borderColor: '#678B85',

    '&:hover': {
      backgroundColor: '#62a699',
      borderColor: '#62a699',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#30b39a',
      borderColor: '#30b39a',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(55, 89, 84, 0.5)',
    },
  });

  const LogInDialogTitle = styled(DialogTitle)({
    color: darkMode ? 'white' : '#678B85',
  });

  return (
    <React.Fragment>
      <AddBoardButtonStyled onClick={handleClickOpen}>
        Create New Board
      </AddBoardButtonStyled>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          component: 'form',
        }}
      >
        <LogInDialogTitle>Create New Board</LogInDialogTitle>

        <DialogContent>
          <FormControl
            variant="standard"
            required
            fullWidth
            sx={{
              '.MuiFormLabel-root': {
                color: theme =>
                  theme.palette.mode === 'dark' ? 'white' : '#678B85',
              },
              '.MuiInputLabel-root': {
                color: theme =>
                  theme.palette.mode === 'dark' ? 'white' : '#678B85',
              },
              '.MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
                color: '#30b39a',
              },
              '.MuiInput-underline:after': {
                borderBottom: '2px solid #678B85',
              },
              '&:hover': {
                '.MuiInput-underline:after': {
                  borderBottom: '2px solid #30b39a',
                },
              },
              '.MuiInput-root': {
                '&.Mui-focused': {
                  borderColor: '#30b39a',
                },
              },
              marginBottom: '15px',
            }}
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
              <div className="mr-[10px]">
                {isLoading && (
                  <CircularProgress
                    sx={{ color: darkMode ? 'white' : '#678B85' }}
                  />
                )}
              </div>
              <div className="mr-[6px]">
                <CancelButton setOpen={setOpen} setBoardName={setBoardName} />
              </div>
              <div className="mr-[16px]">
                <LogInButtonFormStyled onClick={handleAddBoard}>
                  Create Board
                </LogInButtonFormStyled>
              </div>
            </div>
            <div
              className={`text-right text-[14px] ${
                darkMode ? 'text-white' : 'text-[#678B85]'
              } mr-[16px] mt-[15px]`}
            ></div>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddBoardButton;
