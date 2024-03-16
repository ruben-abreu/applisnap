import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { ThemeContext } from '../context/theme.context';
import { editJob, deleteJob } from '../api/jobs.api';
import { getBoard } from '../api/boards.api';
import EditApplication from '../components/EditApplication';
import AddJobButton from '../components/AddJobButton';
import SearchBar from '../components/SearchBar';
import { getUserDetails } from '../api/auth.api';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Avatar from '@mui/material/Avatar';
import Sort from '../components/Sort';

const Wishlist = () => {
  const { loggedIn, user, setUser } = useContext(AuthContext);
  const { darkMode, formGreenStyle } = useContext(ThemeContext);

  const navigate = useNavigate();

  const storedUserId = localStorage.getItem('userId');

  const [wishlistJobs, setWishlistJobs] = useState([]);
  const [showWishlistJobs, setShowWishlistJobs] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState('');
  const [lists, setLists] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingJob, setDeletingJob] = useState(null);
  const [boardName, setBoardName] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState('');
  const [sortBy, setSortBy] = useState('');

  const { boardId } = useParams();

  useEffect(() => {
    fetchBoard(boardId);
    updateUser();
  }, [boardId]);

  const searchedCompany = query => {
    const filteredWishlist = wishlistJobs.filter(job => {
      return job.companyName.toLowerCase().includes(query.toLowerCase());
    });
    setShowWishlistJobs(filteredWishlist);
  };

  const fetchBoard = async boardId => {
    try {
      const currentBoard = await getBoard(boardId);
      setBoard(currentBoard);
      setWishlistJobs(currentBoard.jobs);
      setShowWishlistJobs(currentBoard.jobs);
      console.log('board', currentBoard);
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
      setSelectedBoardId(selectedBoard._id);
      navigate(`/wishlist/${selectedBoard._id}`);
    }
  };

  const updateUser = async () => {
    try {
      const newDetails = await getUserDetails(storedUserId);
      setUser(newDetails.data);
      setBoards(newDetails.data.boards);
      setLists(newDetails.data.lists);

      const filteredJobs = newDetails.data.jobs.filter(job =>
        newDetails.data.lists
          .filter(list => list.listName === 'Wishlist')
          .map(list => list._id)
          .includes(job.listId)
      );

      setWishlistJobs(filteredJobs);
      setShowWishlistJobs(filteredJobs);

      if (
        boardId &&
        newDetails.data.boards.find(board => board._id === boardId)
      ) {
        const selectedBoard = newDetails.data.boards.find(
          board => board._id === boardId
        );
        setBoardName(selectedBoard.boardName);
        setSelectedBoardId(selectedBoard._id);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleEdit = job => {
    setSelectedApplication(job);
  };

  const handleEditClose = () => {
    setSelectedApplication(null);
  };

  const onEditApplication = async updatedJob => {
    try {
      await editJob(updatedJob._id, updatedJob);
      updateUser();
      handleEditClose();
    } catch (error) {
      console.error('Error editing job:', error);
    }
  };

  const handleDelete = job => {
    setDeletingJob(job);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteJob(deletingJob._id);
      updateUser();
      setDeleteDialogOpen(false);
      setDeletingJob(null);
    } catch (error) {
      console.log('Error deleting job', error);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setDeletingJob(null);
  };

  const handleSort = (jobs, sortBy) => {
    if (sortBy === 'asc') {
      return [...jobs].sort((a, b) =>
        a.companyName.localeCompare(b.companyName, undefined, {
          ignorePunctuation: true,
        })
      );
    } else if (sortBy === 'desc') {
      return [...jobs].sort((a, b) =>
        b.companyName.localeCompare(a.companyName, undefined, {
          ignorePunctuation: true,
        })
      );
    } else {
      return jobs;
    }
  };

  return (
    <div className='m-[2%] mt-[30px]'>
      {loggedIn ? (
        <div>
          <div className='flex justify-between items-center'>
            <h2
              className={`text-[1.4em] font-bold mt-[30px] mb-[10px] ${
                darkMode ? 'text-white' : 'text-[#678B85]'
              }`}
            >
              Wishlist
            </h2>
            {user && user.boards.length > 1 && (
              <form>
                <FormControl sx={{ ...formGreenStyle, my: 1 }}>
                  <InputLabel htmlFor='board' label='Board'>
                    Board
                  </InputLabel>
                  <Select
                    id='board'
                    label='Board'
                    type='text'
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
          </div>
          {board && (
            <div className='flex items-center mt-[30px]'>
              <h3
                className={`text-[16px] ${
                  darkMode ? 'text-white' : 'text-[black]'
                } font-bold`}
              >
                {board.jobs.length === 0
                  ? 'Add your first job application'
                  : 'Add new job application'}
              </h3>
              <AddJobButton
                board={board}
                list='Wishlist'
                role=''
                fetchBoard={fetchBoard}
                boardId={boardId}
              />
            </div>
          )}

          {wishlistJobs && wishlistJobs.length > 0 && (
            <div className='flex justify-start my-[20px]'>
              <SearchBar searchedCompany={searchedCompany} />
            </div>
          )}
          <div className='flex justify-start my-[20px]'>
            <Sort sortBy={sortBy} setSortBy={setSortBy} />
          </div>
          <div className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3'>
            {handleSort(showWishlistJobs, sortBy)
              .filter(job => job.boardId === selectedBoardId)
              .map((job, index) => {
                const jobBoard = boards.find(
                  board => board._id === job.boardId
                );
                return (
                  <Card key={index} sx={{ maxWidth: 120 }}>
                    <button onClick={() => handleEdit(job)}>
                      <div className='h-[100px] flex items-center'>
                        <div className='w-[100%] pt-[20px] flex justify-center items-center'>
                          <Avatar
                            sx={{
                              fontSize: '20px',
                              borderRadius: '2px',
                              maxHeight: '100px',
                              maxWidth: '100px',
                              width: 'auto',
                              height: 'auto',
                              backgroundColor: 'transparent',
                              color: darkMode ? 'white' : 'black',
                            }}
                            src={
                              `https://logo.clearbit.com/${job.domain}` || ''
                            }
                          >
                            <p className='uppercase'>
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
                      <div className='h-[140px]'>
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant='subtitle2'
                            component='div'
                          >
                            {job.companyName}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {job.roleName}
                          </Typography>
                        </CardContent>
                      </div>
                    </button>

                    <div className='mb-[10px] flex justify-center gap-[15px]'>
                      {job.jobURL && (
                        <a
                          href={job.jobURL}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <LinkRoundedIcon
                            sx={{
                              width: '18px',
                              height: '18px',
                              color: darkMode ? 'white' : '#678B85',
                              '&:hover': {
                                color: darkMode ? 'white' : '#62a699',
                              },
                            }}
                          />
                        </a>
                      )}
                      <button
                        onClick={() => handleEdit(job)}
                        className='text-[#678B85] hover:text-[#62a699] text-[13px] font-bold uppercase'
                      >
                        <EditRoundedIcon />
                      </button>
                      {selectedApplication &&
                        selectedApplication._id === job._id && (
                          <EditApplication
                            open={Boolean(selectedApplication)}
                            onClose={handleEditClose}
                            application={selectedApplication}
                            board={jobBoard}
                            fetchBoard={fetchBoard}
                            boardId={jobBoard ? jobBoard._id : null}
                            onEdit={onEditApplication}
                            updateUser={updateUser}
                            lists={lists}
                          />
                        )}
                      <button
                        onClick={() => handleDelete(job)}
                        className='text-[#678B85] hover:text-[#62a699] text-[13px] font-bold uppercase'
                      >
                        <DeleteRoundedIcon />
                      </button>
                    </div>
                  </Card>
                );
              })}
            {wishlistJobs.length === 0 && (
              <div className='text-center col-span-full mt-4'>
                <p>You have no jobs in this list.</p>
              </div>
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
              <Button onClick={confirmDelete} sx={{ color: '#678B85' }}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <p className='text-center mt-[50px] font-bold text-xl'>
          Please log in to view this page
        </p>
      )}
    </div>
  );
};

export default Wishlist;
