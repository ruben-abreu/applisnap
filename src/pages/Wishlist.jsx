import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { editJob, deleteJob } from '../api/jobs.api';
import { ThemeContext } from '../context/theme.context';
import EditApplication from '../components/EditApplication';
import { getAllBoards } from '../api/boards.api';
import { getUserDetails } from '../api/auth.api';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

const Wishlist = () => {
  const { user, setUser } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  const storedUserId = localStorage.getItem('userId');

  const [wishlistJobs, setWishlistJobs] = useState(
    user
      ? user.jobs.filter(job =>
          user.lists
            .filter(list => list.listName === 'Wishlist')
            .map(list => list._id)
            .includes(job.listId)
        )
      : []
  );
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [boards, setBoards] = useState([]);
  const [lists, setLists] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingJob, setDeletingJob] = useState(null);

  useEffect(() => {
    updateUser(storedUserId);
  }, []);

  const updateUser = async userId => {
    try {
      const newDetails = await getUserDetails(userId);
      setUser(newDetails.data);

      setBoards(newDetails.data.boards);
      setLists(newDetails.data.lists);

      setWishlistJobs(
        newDetails.data.jobs.filter(job =>
          newDetails.data.lists
            .filter(list => list.listName === 'Wishlist')
            .map(list => list._id)
            .includes(job.listId)
        )
      );
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

  const fetchBoard = async () => {
    try {
      const allBoardsResponse = await getAllBoards();
      const userBoards = allBoardsResponse.data.filter(
        board => board.userId === user._id
      );

      setBoards(userBoards);
    } catch (error) {
      console.error('Error fetching board:', error);
    }
  };

  const onEditApplication = async updatedJob => {
    try {
      await editJob(updatedJob._id, updatedJob);
      updateUser(user._id);
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

  return (
    <div className='m-[2%] mt-[30px]'>
      <div className='flex justify-between items-center'>
        <h2
          className={`text-[1.4em] mt-4 mb-6 ${
            darkMode ? 'text-white' : 'text-[#678B85]'
          }`}
        >
          Wishlist
        </h2>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2'>
        {wishlistJobs.map((job, index) => {
          const jobBoard = boards.find(board => board._id === job.boardId);

          return (
            <Card key={index} sx={{ maxWidth: 300, marginBottom: '20px' }}>
              <CardMedia
                component='img'
                alt='job logo'
                height='100'
                image={`https://logo.clearbit.com/${job.domain}`}
                sx={{
                  p: 1,
                  mb: 1,
                  minWidth: 100,
                  maxWidth: 160,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              />
              <CardContent>
                <Typography gutterBottom variant='subtitle2' component='div'>
                  {job.companyName}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {job.roleName}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  size='small'
                  sx={{ color: '#678B85' }}
                  onClick={() => handleEdit(job)}
                >
                  Edit
                </Button>
                {selectedApplication && selectedApplication._id === job._id && (
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
                <Button
                  size='small'
                  sx={{ color: '#678B85' }}
                  onClick={() => handleDelete(job)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
      <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant='body1'>
            Are you sure you want to delete this job?
          </Typography>
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
  );
};

export default Wishlist;
