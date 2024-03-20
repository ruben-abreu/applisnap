import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';
import { getBoard } from '../api/boards.api';
import { getAllLists } from '../api/lists.api';
import { getAllJobs } from '../api/jobs.api';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import ListsBarChart from '../components/ListsBarChart';
import TimeChart from '../components/TimeChart';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function Insights({ setCreditsPage }) {
  const { darkMode, width, formGreenStyle, greenIconButtonStyle } =
    useContext(ThemeContext);
  const { loggedIn, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const { boardId } = useParams();

  const [boardName, setBoardName] = useState('');
  const [board, setBoard] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState(boardId);

  useEffect(() => {
    setCreditsPage(false);
    if (boardId) {
      fetchBoard(boardId);
    } else if (user && user._id) {
      fetchAllBoardsData(user._id);
    }
  }, [boardId, user]);

  const fetchBoard = async boardId => {
    try {
      const currentBoard = await getBoard(boardId);
      setBoard(currentBoard);
      setBoardName(currentBoard.boardName);
      console.log('board', currentBoard);
      console.log('lists', currentBoard.lists);
    } catch (error) {
      console.error('Error fetching board:', error);
    }
  };

  const fetchAllBoardsData = async userId => {
    setBoardName('All Boards');

    const newBoard = {
      boardName: 'All Boards',
      lists: [
        { listName: 'Wishlist', jobs: [] },
        { listName: 'Applied', jobs: [] },
        { listName: 'Interviews', jobs: [] },
        { listName: 'Offers', jobs: [] },
        { listName: 'Rejected', jobs: [] },
      ],
      jobs: [],
    };

    console.log('userId', userId);

    try {
      const allJobs = await getAllJobs(userId);
      newBoard.jobs = allJobs.data;

      console.log('allJobs', allJobs.data);

      const allLists = await getAllLists(userId);

      console.log('allLists', allLists.data);

      allLists.data.map(list => {
        switch (list.listName) {
          case 'Wishlist':
            newBoard.lists[0].jobs = newBoard.lists[0].jobs.concat(list.jobs);
            break;
          case 'Applied':
            newBoard.lists[1].jobs = newBoard.lists[1].jobs.concat(list.jobs);
            break;
          case 'Interviews':
            newBoard.lists[2].jobs = newBoard.lists[2].jobs.concat(list.jobs);
            break;
          case 'Offers':
            newBoard.lists[3].jobs = newBoard.lists[3].jobs.concat(list.jobs);
            break;
          case 'Rejected':
            newBoard.lists[4].jobs = newBoard.lists[4].jobs.concat(list.jobs);
            break;
        }
      });

      console.log('newBoard', newBoard);
      setBoard(newBoard);
    } catch (error) {
      console.log('Error fetching all boards data', error);
    }
  };

  const handleBoardSelection = e => {
    const selectedBoardName = e.target.value;

    if (selectedBoardName === 'All Boards') {
      setBoardName('All Boards');
      return navigate(`/insights`);
    }

    const selectedBoard = user.boards.find(
      board => board.boardName === selectedBoardName
    );
    if (selectedBoard) {
      setBoardName(selectedBoard.boardName);
      setSelectedBoardId(selectedBoard._id);
      fetchBoard(selectedBoard._id);
      navigate(`/insights/${selectedBoard._id}`);
    }
  };

  return (
    <div className="m-[2%] mt-[30px]">
      {loggedIn ? (
        <div>
          <div className="flex justify-between items-center mt-[30px] mb-[10px]">
            <div className="flex items-center gap-[10px]">
              <InsightsRoundedIcon
                sx={{ color: '#678B85', width: '20px', height: '20px' }}
              />
              <h2
                className={`mr-[10px] text-[1.4em] max-[450px]:text-[1em] font-bold ${
                  darkMode ? 'text-white' : 'text-[#678B85]'
                }`}
              >
                Insights
              </h2>
            </div>
            {user && user.boards.length > 0 ? (
              <div className="flex gap-[10px] items-center">
                <form>
                  <FormControl sx={{ ...formGreenStyle, my: 1 }}>
                    <InputLabel htmlFor="board" label="Board">
                      Board
                    </InputLabel>
                    <Select
                      id="board"
                      label="Board"
                      type="text"
                      value={boardName}
                      sx={{
                        fontSize: '14px',
                        maxWidth:
                          width < 450
                            ? '100px'
                            : width < 600
                            ? '150px'
                            : '300px',
                      }}
                      onChange={e => handleBoardSelection(e)}
                    >
                      {user.boards.map(board => (
                        <MenuItem key={board._id} value={board.boardName}>
                          {board.boardName}
                        </MenuItem>
                      ))}
                      <MenuItem value="All Boards">All Boards</MenuItem>
                    </Select>
                  </FormControl>
                </form>
                {boardName ? (
                  <button
                    onClick={() => navigate(`/boards/${selectedBoardId}`)}
                  >
                    <LaunchRoundedIcon
                      sx={{
                        ...greenIconButtonStyle,
                        width: '20px',
                        height: '20px',
                      }}
                    />
                  </button>
                ) : (
                  ''
                )}
              </div>
            ) : (
              <p className="text-center mt-[50px] font-bold text-xl">
                Please create a new board in to view this page
              </p>
            )}
          </div>

          {board && (
            <div className="flex justify-center my-[40px]">
              <ListsBarChart board={board} />
            </div>
          )}

          {board && (
            <div className="flex justify-center ">
              {' '}
              <TimeChart board={board} />{' '}
            </div>
          )}
        </div>
      ) : (
        <p className="text-center mt-[50px] font-bold text-xl">
          Please log in to view this page
        </p>
      )}
    </div>
  );
}

export default Insights;
