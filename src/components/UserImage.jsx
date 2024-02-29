import { useState, useContext } from 'react';
import { upload, updateUser } from '../api/auth.api';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CancelButton from './CancelButton';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import CircularProgress from '@mui/material/CircularProgress';

function UserImage() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState();
  const [uploadedImageURL, setUploadedImageURL] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const { darkMode } = useContext(ThemeContext);
  const { user, authenticateUser } = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImage = ({ target }) => {
    setImage(target.files[0]);
  };

  const updateUserDetails = async imgURL => {
    try {
      const userDetails = { imgURL: imgURL, _id: user._id };

      await updateUser(userDetails);
      await authenticateUser();

      setIsLoading(false);
      alert('Your image was successfully uploaded.');

      handleClose();
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };

  const uploadImage = async e => {
    e.preventDefault();

    try {
      const uploadData = new FormData();
      uploadData.append('file', image);

      setIsLoading(true);

      const response = await upload(uploadData);
      console.log(response.data);

      setUploadedImageURL(response.data.imgURL);
      return response.data.imgURL;
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };

  const handleUploadImage = async e => {
    const response = await uploadImage(e);

    updateUserDetails(response);
  };

  const UploadImageDialogTitle = styled(DialogTitle)({
    color: darkMode ? 'white' : '#678B85',
  });

  const UploadImageButtonStyled = styled(Button)({
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

  const StyledAvatar = styled(Avatar)(() => ({
    width: '50px',
    height: '50px',
    backgroundColor: isHovered ? 'transparent' : darkMode ? 'white' : '#677f8b',
  }));

  return user ? (
    <React.Fragment>
      <button onClick={handleClickOpen}>
        <IconButton
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <StyledAvatar src={user.imgURL && user.imgURL} />
          {isHovered && (
            <CloudUploadRoundedIcon
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
        </IconButton>
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
        }}
      >
        <UploadImageDialogTitle>Upload Image</UploadImageDialogTitle>
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
              '.MuiInput': {
                height: '1.5rem',
                borderBottom: '0',
                outline: '0',
              },
              '.MuiInput-underline:after': {
                borderBottom: '0',
              },
              '&:hover': {
                '.MuiInput-underline:after': {
                  borderBottom: '0',
                },
              },
              '.MuiInput-root': {
                '&.Mui-focused': {
                  borderBottom: '0',
                  borderColor: 'none',
                },
              },
            }}
          >
            <InputLabel htmlFor="standard-adornment-image">Image:</InputLabel>
            <Input
              id="standard-adornment-image"
              onChange={handleImage}
              type="file"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <div className="mr-[6px]">
            {isLoading && (
              <CircularProgress
                sx={{ color: darkMode ? 'white' : '#678B85' }}
              />
            )}
          </div>
          <CancelButton setOpen={setOpen} />
          <div className="mr-[16px]">
            <UploadImageButtonStyled
              onClick={handleUploadImage}
              startIcon={<CloudUploadRoundedIcon />}
            >
              Upload Image
            </UploadImageButtonStyled>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  ) : (
    <CircularProgress />
  );
}

export default UserImage;
