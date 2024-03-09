import { useState, useEffect, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../context/auth.context';
import { getAllJobs } from '../api/jobs.api';
import { ThemeContext } from '../context/theme.context';

const Wishlist = () => {
  const [wishlistJobs, setWishlistJobs] = useState([]);
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchWishlistJobs();
  }, [user]);

  const fetchWishlistJobs = async () => {
    try {
      if (user && user._id) {
        const userJobsResponse = await getAllJobs();
        const userLists = user.lists || [];
        const wishlistList = userLists.find(
          list => list.listName === 'Wishlist'
        );

        if (wishlistList) {
          const wishlistJobs = userJobsResponse.data.filter(
            job => job.userId === user._id && job.listId === wishlistList._id
          );
          setWishlistJobs(wishlistJobs);
        }
      }
    } catch (error) {
      console.error('Error fetching wishlist jobs:', error);
    }
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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {wishlistJobs.map((job, index) => (
          <Card key={index} sx={{ maxWidth: 150, marginBottom: '20px' }}>
            <CardMedia
              component='img'
              alt='job logo'
              height='100'
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
              <Typography gutterBottom variant='h5' component='div'>
                {job.companyName}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {job.roleName}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small' sx={{ color: '#678B85' }}>
                Share
              </Button>
              <Button size='small' sx={{ color: '#678B85' }}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
