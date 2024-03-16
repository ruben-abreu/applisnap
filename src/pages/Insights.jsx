import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';
import { getBoard } from '../api/boards.api';
import { BarChart } from '@mui/x-charts/BarChart';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function Insights() {
  const [boardName, setBoardName] = useState('');
  const [board, setBoard] = useState('');

  const { darkMode, formGreenStyle } = useContext(ThemeContext);
  const { loggedIn, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const { boardId } = useParams();

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  const fetchBoard = async () => {
    try {
      const currentBoard = await getBoard(boardId);
      setBoard(currentBoard);
      setBoardName(currentBoard.boardName);
      console.log('board', currentBoard);
      console.log('lists', board.lists);
    } catch (error) {
      console.error('Error fetching board:', error);
    }
  };

  const handleBoardSelection = e => {
    const selectedBoardName = e.target.value;
    const selectedBoard = user.boards.find(
      board => board.boardName === selectedBoardName
    );
    if (selectedBoard) {
      setBoardName(selectedBoard.boardName);
      fetchBoard(selectedBoard._id);
      navigate(`/insights/${selectedBoard._id}`);
    }
  };

  return (
    <div className="m-[2%] mt-[30px]">
      {loggedIn ? (
        <div>
          <h2
            className={`text-[1.4em] font-bold mt-[30px] mb-[10px] ${
              darkMode ? 'text-white' : 'text-[#678B85]'
            }`}
          >
            Insights
          </h2>
          {user && user.boards.length > 1 && (
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
                  onChange={e => handleBoardSelection(e)}
                >
                  {user.boards.map(board => (
                    <MenuItem key={board._id} value={board.boardName}>
                      {board.boardName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
          )}
          <div>
            {board && (
              <BarChart
                xAxis={[
                  {
                    scaleType: 'band',
                    data: board.lists.map(list => list.listName),
                  },
                ]}
                series={[
                  {
                    data: board.lists.map(list => {
                      const array = [];
                      array.push(list.jobs.length);
                      return array;
                    }),
                  },
                ]}
                width={500}
                height={300}
              />
            )}
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

export default Insights;
