import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AddBoardButton from '../components/AddBoardButton';
import { ThemeContext } from '../context/theme.context';
import Avatar from '@mui/material/Avatar';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import DeleteBoardButton from '../components/DeleteBoardButton';
import EditBoardButton from '../components/EditBoardButton';
import { getAllBoards, deleteBoard, editBoard } from '../api/boards.api';
import { AuthContext } from '../context/auth.context';

function BoardLists({ setCreditsPage }) {
  const [boards, setBoards] = useState([]);
  const { loggedIn, user } = useContext(AuthContext);
  const { darkMode, width } = useContext(ThemeContext);

  useEffect(() => {
    setCreditsPage(false);
    fetchAllData();
  }, [user]);

  const fetchAllData = async () => {
    try {
      if (user && user._id) {
        await fetchBoards(user._id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchBoards = async userId => {
    try {
      const allBoardsResponse = await getAllBoards(userId);
      const userBoards = allBoardsResponse.data.filter(
        board => board.userId === user._id
      );

      setBoards(userBoards);
    } catch (error) {
      alert(error.response.data.message);
    }
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

  const handleEditBoard = async (boardId, newName) => {
    try {
      await editBoardItem(boardId, newName);
    } catch (error) {
      console.error('Error editing board:', error);
    }
  };

  return (
    <div className="m-[2%] mt-[30px]">
      {loggedIn ? (
        <div>
          <div className="flex justify-between items-center mt-[30px] mb-[10px]">
            <div className="flex items-center gap-[10px]">
              <DashboardRoundedIcon
                sx={{
                  color: darkMode ? 'white' : '#678B85',
                  width: '20px',
                  height: '20px',
                }}
              />
              <h2
                className={`mr-[10px] text-[1.4em] max-[450px]:text-[1.2em] font-bold  ${
                  darkMode ? 'text-white' : 'text-[#678B85]'
                }`}
              >
                My Boards
              </h2>
            </div>
            <AddBoardButton />
          </div>
          <div className="mt-[50px] flex flex-col gap-[30px]">
            {boards &&
              boards.map(boardItem => (
                <div
                  key={boardItem._id}
                  className="flex items-center gap-[10px]"
                >
                  <div className="flex items-center gap-[20px] w-[250px]">
                    <Link to={`/boards/${boardItem._id}`}>
                      <Avatar
                        sx={{
                          width: width < 450 ? '52px' : '72px',
                          height: width < 450 ? '52px' : '72px',
                          backgroundColor: '#30b39a',
                          '&:hover': { backgroundColor: '#678B85' },
                        }}
                      >
                        <DashboardRoundedIcon
                          sx={{
                            width: width < 450 ? '32px' : '42px',
                            height: width < 450 ? '32px' : '42px',
                            color: 'white',
                          }}
                        />
                      </Avatar>
                    </Link>

                    <div>
                      <Link
                        to={`/boards/${boardItem._id}`}
                        className="text-[#30b39a] hover:text-[#678B85]"
                      >
                        <h2 className="text-wrap max-[450px]:text-[0.8em]">
                          {boardItem.boardName}
                        </h2>
                      </Link>
                      <p className="max-[450px]:text-[0.8em]">
                        {`${
                          countJobs(boardItem) === 1
                            ? '1 job'
                            : `${countJobs(boardItem)} jobs`
                        }`}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-[8px] w-[300px] max-[545px]:flex-col max-[545px]:w-[145px]">
                    <EditBoardButton
                      boardId={boardItem._id}
                      onEdit={newName =>
                        handleEditBoard(boardItem._id, newName)
                      }
                    />
                    <DeleteBoardButton
                      boardId={boardItem._id}
                      onDelete={deleteBoardItem}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <p className="text-center mt-[50px] font-bold text-xl">
          Please log in to view this page
        </p>
      )}
    </div>
  );
}

export default BoardLists;
