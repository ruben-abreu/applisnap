import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AddBoardButton from '../components/AddBoardButton';
import { ThemeContext } from '../context/theme.context';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import DeleteBoardButton from '../components/DeleteBoardButton';
import EditBoardButton from '../components/EditBoardButton';
import { getAllBoards, deleteBoard, editBoard } from '../api/boards.api';
import { AuthContext } from '../context/auth.context';

function BoardLists() {
  const [boards, setBoards] = useState([]);
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchAllData();
  }, [user]);

  const fetchAllData = async () => {
    try {
      if (user && user._id) {
        await fetchBoard();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchBoard = async () => {
    try {
      const allBoardsResponse = await getAllBoards();
      const userBoards = allBoardsResponse.data.filter(
        board => board.userId === user._id
      );

      setBoards(userBoards);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleBoardClick = boardId => {
    console.log('Clicked board with ID:', boardId);
  };

  const deleteBoardItem = async boardId => {
    try {
      await deleteBoard(boardId);
      const updatedBoards = boards.filter(board => board._id !== boardId);
      setBoards(updatedBoards);
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  const editBoardItem = async (boardId, newName) => {
    try {
      const updatedBoard = await editBoard(boardId, { boardName: newName });
      const updatedBoards = boards.map(board =>
        board._id === boardId ? updatedBoard.data : board
      );
      setBoards(updatedBoards);
    } catch (error) {
      console.error('Error editing board:', error);
    }
  };

  const countJobs = board => {
    return board.jobs.length;
  };

  const generate = () => {
    return boards.map(boardItem => (
      <ListItem
        key={boardItem._id}
        onClick={() => handleBoardClick(boardItem._id)}
      >
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: '#30b39a' }}>
            <DashboardRoundedIcon sx={{ color: 'white' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Link
              to={`/boards/${boardItem._id}`}
              className="text-[#30b39a] hover:underline"
            >
              <h2>{boardItem.boardName}</h2>
            </Link>
          }
          secondary={`${
            countJobs(boardItem) === 1
              ? '1 job'
              : `${countJobs(boardItem)} jobs`
          }`}
        />

        <div className="flex gap-[8px]">
          <EditBoardButton
            boardId={boardItem._id}
            onEdit={newName => handleEditBoard(boardItem._id, newName)}
          />
          <DeleteBoardButton
            boardId={boardItem._id}
            onDelete={deleteBoardItem}
          />
        </div>
      </ListItem>
    ));
  };

  const handleEditBoard = async (boardId, newName) => {
    try {
      await editBoardItem(boardId, newName);
    } catch (error) {
      console.error('Error editing board:', error);
    }
  };

  return (
    <div className="m-[2%] mt-[30px]">
      <div className="flex justify-between items-center">
        <h2
          className={`text-[1.4em] mt-4 md-6 ${
            darkMode ? 'text-white' : 'text-[#678B85]'
          }`}
        >
          My Boards
        </h2>
        <AddBoardButton />
      </div>
      <Box sx={{ maxWidth: '80%', marginTop: '50px' }}>
        <Grid>
          <List dense={false}>{generate()}</List>
        </Grid>
      </Box>
    </div>
  );
}

export default BoardLists;
