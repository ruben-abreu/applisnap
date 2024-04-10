import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { deleteJob } from '../api/jobs.api';
import { getBoard } from '../api/boards.api';
import { getList } from '../api/lists.api';
import { ThemeContext } from '../context/theme.context';
import EditApplication from '../components/EditApplication';
import AddJobApplication from '../components/AddJobApplication';
import SearchBarListPages from '../components/SearchBarListPages';
import AddBoardButton from '../components/AddBoardButton';
import LogInButton from '../components/LogInButton';
import SignUpButton from '../components/SignUpButton';
import { getUserDetails } from '../api/auth.api';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import ContentPasteSearchRoundedIcon from '@mui/icons-material/ContentPasteSearchRounded';
import Avatar from '@mui/material/Avatar';
import Sort from '../components/Sort';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CircularProgress from '@mui/material/CircularProgress';

const Interviews = () => {
  const { loggedIn, user, setUser } = useContext(AuthContext);
  const { darkMode, width, formGreenStyle, greenIconButtonStyle } =
    useContext(ThemeContext);

  const navigate = useNavigate();

  const { boardId } = useParams();

  const storedUserId = localStorage.getItem('userId');
  const [interviewsJobs, setInterviewsJobs] = useState([]);
  const [showInterviewsJobs, setShowInterviewsJobs] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [board, setBoard] = useState('');
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingJob, setDeletingJob] = useState(null);
  const [boardName, setBoardName] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState(boardId);
  const [sortBy, setSortBy] = useState(
    localStorage.getItem('sortBy') ? localStorage.getItem('sortBy') : 'starred'
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (boardId) {
      fetchBoard(boardId);
      localStorage.setItem('boardId', boardId);
    } else {
      setBoardName('All Boards');
      updateUser(storedUserId);
      localStorage.removeItem('boardId');
    }
  }, [boardId]);

  const searchedJob = query => {
    const filteredInterviews = interviewsJobs.filter(job => {
      return (
        job.companyName.toLowerCase().includes(query.toLowerCase()) ||
        job.roleName.toLowerCase().includes(query.toLowerCase())
      );
    });
    setShowInterviewsJobs(filteredInterviews);
  };

  const handleBoardSelection = async e => {
    setBoard({});
    const selectedBoardName = e.target.value;
    setBoardName(e.target.value);

    if (selectedBoardName === 'All Boards') {
      return navigate(`/interviews`);
    }

    const selectedBoard = user.boards.filter(
      board => board.boardName === selectedBoardName
    );

    if (selectedBoard[0]._id) {
      fetchBoard(selectedBoard[0]._id);
      return navigate(`/interviews/${selectedBoard[0]._id}`);
    }
  };

  const fetchBoard = async boardId => {
    try {
      const currentBoard = await getBoard(boardId);

      setLists(currentBoard.lists);
      setBoard(currentBoard);
      setBoardName(currentBoard.boardName);
      setSelectedBoardId(currentBoard._id);

      const interviewsListId = currentBoard.lists.find(
        list => list.listName === 'Interviews'
      )?._id;

      if (!interviewsListId) {
        console.error('Interviews list not found for this board.');
        return;
      }

      const list = await getList(interviewsListId);

      setCurrentList(list);

      const interviewsJobsFromBoard = currentBoard.jobs.filter(
        job => job.listId === interviewsListId
      );

      setInterviewsJobs(interviewsJobsFromBoard);
      setShowInterviewsJobs(interviewsJobsFromBoard);
    } catch (error) {
      console.error('Error fetching board:', error);
    }
  };

  const updateUser = async userId => {
    try {
      const newDetails = await getUserDetails(userId);
      setUser(newDetails.data);
      setLists(newDetails.data.lists);

      const filteredJobs = newDetails.data.jobs.filter(job =>
        newDetails.data.lists
          .filter(list => list.listName === 'Interviews')
          .map(list => list._id)
          .includes(job.listId)
      );

      setInterviewsJobs(filteredJobs);
      setShowInterviewsJobs(filteredJobs);

      if (
        boardId &&
        newDetails.data.boards.find(board => board._id === boardId)
      ) {
        const selectedBoard = newDetails.data.boards.find(
          board => board._id === boardId
        );
        setBoardName(selectedBoard.boardName);
        setSelectedBoardId(selectedBoard._id);
      } else {
        setBoardName('All Boards');
        setSelectedBoardId('');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleEdit = job => {
    setSelectedApplication(job);
  };

  const handleEditClose = () => {
    if (boardName === 'All Boards') {
      navigate('/interviews');
    } else {
      navigate(`/interviews/${boardId}`);
    }
    setSelectedApplication(null);
  };

  const handleDelete = job => {
    setDeletingJob(job);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      await deleteJob(deletingJob._id);
      if (boardId && boardName !== 'All Boards') {
        await fetchBoard(boardId);
      } else {
        await updateUser(storedUserId);
        setBoardName('All Boards');
      }
      setIsLoading(false);
      setDeleteDialogOpen(false);
      setDeletingJob(null);
    } catch (error) {
      setIsLoading(false);
      console.log('Error deleting job', error);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setDeletingJob(null);
  };

  const handleSort = (jobs, sortBy) => {
    if (sortBy === 'asc') {
      return [...jobs].sort((a, b) => {
        if (a.companyName < b.companyName) return -1;
        if (a.companyName > b.companyName) return 1;
        return 0;
      });
    } else if (sortBy === 'desc') {
      return [...jobs].sort((a, b) => {
        if (a.companyName > b.companyName) return -1;
        if (a.companyName < b.companyName) return 1;
        return 0;
      });
    } else if (sortBy === 'dateAsc') {
      return [...jobs].sort(
        (a, b) => new Date(a.date.created) - new Date(b.date.created)
      );
    } else if (sortBy === 'dateDesc') {
      return [...jobs].sort(
        (a, b) => new Date(b.date.created) - new Date(a.date.created)
      );
    } else if (sortBy === 'starred') {
      return [...jobs].sort((a, b) => {
        if (a.starred && !b.starred) return -1;
        if (!a.starred && b.starred) return 1;
        return 0;
      });
    } else {
      return jobs;
    }
  };

  return (
    <div className="m-[2%] mt-[30px]">
      {loggedIn ? (
        <div>
          <div className="flex justify-between items-center mt-[30px] mb-[10px]">
            <div className="flex items-center gap-[10px]">
              <ContentPasteSearchRoundedIcon
                sx={{
                  color: darkMode ? 'white' : '#678B85',
                  width: '20px',
                  height: '20px',
                }}
              />
              <h2
                className={`mr-[10px] text-[1.4em] max-[450px]:text-[1.2em] font-bold ${
                  darkMode ? 'text-white' : 'text-[#678B85]'
                }`}
              >
                My Interviews
              </h2>
            </div>
            {user && user.boards && user.boards.length > 0 && (
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
                      {user.boards && user.boards.length > 1 && (
                        <MenuItem value="All Boards">All Boards</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </form>
                <button
                  type="button"
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
              </div>
            )}
          </div>
          {user.boards && user.boards.length > 0 && boardName && (
            <div className="flex items-center my-[30px]">
              <h3
                className={`text-[16px] ${
                  darkMode ? 'text-white' : 'text-[black]'
                } font-bold`}
              >
                {boardName === 'All Boards' && user.boards.length > 1
                  ? 'Add new job application'
                  : boardName === 'All Boards' && user.boards.length === 0
                  ? 'Add your first job application'
                  : board && board.jobs && board.jobs.length === 0
                  ? 'Add your first job application'
                  : 'Add new job application'}
              </h3>
              <AddJobApplication
                board={board}
                list={currentList}
                defaultList="Interviews"
                role=""
                fetchBoard={fetchBoard}
                updateUser={updateUser}
                boardId={boardId}
                currentBoardName={
                  boardName
                    ? boardName
                    : board.boardName
                    ? board.boardName
                    : user.boards[user.boards.length - 1].boardName
                }
                setCurrentBoardName={setBoardName}
              />
            </div>
          )}

          {interviewsJobs && interviewsJobs.length > 0 && (
            <div className="flex justify-start my-[20px] gap-2">
              <SearchBarListPages searchedJob={searchedJob} />
              <Sort sortBy={sortBy} setSortBy={setSortBy} />
            </div>
          )}
          <div className="flex flex-wrap gap-[15px]">
            {user.boards &&
              showInterviewsJobs &&
              handleSort(showInterviewsJobs, sortBy).map((job, index) => {
                const jobBoard = user.boards.find(
                  board => board._id === job.boardId
                );
                const scheduledDate = new Date(
                  job.date.interviews[job.date.interviews.length - 1]
                );
                const currentDate = new Date();
                const differenceInTime =
                  scheduledDate.getTime() - currentDate.getTime();
                const daysLeft = Math.ceil(
                  differenceInTime / (1000 * 3600 * 24)
                );

                return (
                  <div
                    key={index}
                    className={`w-[120px] rounded ${
                      darkMode ? 'bg-[#6e6e6e]' : 'bg-[#ebebeb]'
                    } shadow-md ${
                      darkMode ? 'shadow-[#6f6f6f]' : 'shadow-[#cfcfcf]'
                    } `}
                  >
                    <button type="button" onClick={() => handleEdit(job)}>
                      <div className="h-[120px] flex items-center">
                        <div className="w-[100%] m-[10px] flex justify-center items-center">
                          <Avatar
                            sx={{
                              fontSize: '20px',
                              borderRadius: '2px',
                              maxHeight: '90px',
                              maxWidth: '90px',
                              width: 'auto',
                              height: 'auto',
                              backgroundColor: 'transparent',
                              color: darkMode ? 'white' : 'black',
                            }}
                            src={
                              `https://logo.clearbit.com/${job.domain}` || ''
                            }
                          >
                            <p className="uppercase">
                              {job.companyName &&
                              job.companyName.split(' ').length > 1
                                ? job.companyName
                                    .split(' ')
                                    .map(word => word[0])
                                    .slice(0, 2)
                                    .join('')
                                : job.companyName.split(' ').length === 1
                                ? job.companyName[0]
                                : ''}
                            </p>
                          </Avatar>
                        </div>
                      </div>
                      <div className="h-[200px] w-[120px]">
                        <div className="flex flex-col justify-center gap-[10px] mx-[10px]">
                          <p className="text-sm font-bold">{job.companyName}</p>
                          <p className="text-xs">{job.roleName}</p>
                          {job.date.interviews.length > 0 && (
                            <p className="text-xs font-bold">
                              Scheduled for:{' '}
                              <span className="font-normal">
                                {String(
                                  job.date.interviews[
                                    job.date.interviews.length - 1
                                  ]
                                ).slice(0, 10)}{' '}
                                {daysLeft > 0 && `(in ${daysLeft} days)`}
                                {daysLeft === 0 && `(Today!)`}
                              </span>
                            </p>
                          )}

                          {job.starred && (
                            <div className="my-[10px]">
                              <StarRoundedIcon
                                sx={{
                                  color: darkMode ? '#f9cc71' : '#e8a135',
                                  width: '20px',
                                  height: '20px',
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </button>

                    <div className="mb-[10px] flex justify-center gap-[15px]">
                      {job.jobURL && (
                        <a
                          href={job.jobURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkRoundedIcon
                            sx={{
                              ...greenIconButtonStyle,
                              width: '20px',
                              height: '20px',
                            }}
                          />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => handleEdit(job)}
                        className="text-[#678B85] hover:text-[#62a699] text-[13px] font-bold uppercase"
                      >
                        <EditRoundedIcon
                          sx={{
                            ...greenIconButtonStyle,
                            width: '20px',
                            height: '20px',
                          }}
                        />
                      </button>
                      {user &&
                        selectedApplication &&
                        selectedApplication._id === job._id && (
                          <EditApplication
                            open={Boolean(selectedApplication)}
                            onClose={handleEditClose}
                            application={job}
                            board={jobBoard}
                            currentListName="Interviews"
                            currentBoardName={
                              boardName
                                ? boardName
                                : board.boardName
                                ? board.boardName
                                : user.boards[user.boards.length - 1].boardName
                            }
                            setCurrentBoardName={setBoardName}
                            fetchBoard={fetchBoard}
                            boardId={jobBoard ? jobBoard._id : ''}
                            updateUser={updateUser}
                            lists={lists}
                          />
                        )}
                      <button
                        type="button"
                        onClick={() => handleDelete(job)}
                        className="text-[#678B85] hover:text-[#62a699] text-[13px] font-bold uppercase"
                      >
                        <DeleteRoundedIcon
                          sx={{
                            ...greenIconButtonStyle,
                            width: '20px',
                            height: '20px',
                          }}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            {user.boards &&
            user.boards.length > 0 &&
            interviewsJobs.length === 0 ? (
              <div className="text-center col-span-full mt-4">
                <p>You have no jobs in this list.</p>
              </div>
            ) : (
              user.boards &&
              user.boards.length === 0 && (
                <div className="flex flex-col gap-[15px] text-left mt-4">
                  <div className="my-[30px]">
                    <AddBoardButton />
                  </div>
                  <p>Create a board to start adding jobs to this list.</p>
                </div>
              )
            )}
          </div>
          <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <p>Are you sure you want to delete this job?</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelDelete} sx={{ color: '#678B85' }}>
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                sx={{ color: '#678B85' }}
                startIcon={
                  isLoading && (
                    <CircularProgress sx={{ color: '#678B85' }} size={16} />
                  )
                }
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <p className="text-center mt-[50px] font-bold text-xl">
          Please log in to view this page
        </p>
      )}
      {!loggedIn && width < 500 && (
        <div className="flex justify-center items-center gap-[15px] my-[30px]">
          <LogInButton />
          <SignUpButton />
        </div>
      )}
    </div>
  );
};

export default Interviews;
