import { useState, useEffect, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../context/auth.context';
import { editJob } from '../api/jobs.api';
import { ThemeContext } from '../context/theme.context';
import EditApplication from '../components/EditApplication';
import { getAllBoards } from '../api/boards.api';
import { getUserDetails } from '../api/auth.api';

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

  useEffect(() => {
    updateUser(storedUserId);
  }, []);

  const updateUser = async userId => {
    try {
      const newDetails = await getUserDetails(userId);
      setUser(newDetails.data);

      setBoards(newDetails.data.boards);

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

  const getListsForBoard = boardId => {
    const boardObj = boards.find(board => board._id === boardId);
    return boardObj ? boardObj.lists : [];
  };

  return (
    <div className="m-[2%] mt-[30px]">
      <div className="flex justify-between items-center">
        <h2
          className={`text-[1.4em] mt-4 mb-6 ${
            darkMode ? 'text-white' : 'text-[#678B85]'
          }`}
        >
          Wishlist
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistJobs.map((job, index) => {
          const jobBoard = boards.find(board => board._id === job.boardId);
          const listsForBoard = getListsForBoard(job.boardId);

          return (
            <Card key={index} sx={{ maxWidth: 150, marginBottom: '20px' }}>
              <CardMedia
                component="img"
                alt="job logo"
                height="100"
                image={`https://logo.clearbit.com/${job.domain}`}
                sx={{
                  p: 1,
                  mb: 1,
                  minWidth: 100,
                  maxWidth: 300,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {job.companyName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.roleName}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
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
                    lists={listsForBoard}
                    boardId={jobBoard ? jobBoard._id : null}
                    onEdit={onEditApplication}
                    updateUser={updateUser}
                  />
                )}
                <Button size="small" sx={{ color: '#678B85' }}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
