import { useState, useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import { signup } from '../api/auth.api';
import { addBoard } from '../api/boards.api';
import { addList } from '../api/lists.api';
import { addJob } from '../api/jobs.api';
import demoApplications from '../assets/demoApplications.json';
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CancelButton from './CancelButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';

function SignUpButton() {
  const [open, setOpen] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { darkMode, buttonGreenStyle, formGreenStyle } =
    useContext(ThemeContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleFirstNameChange = event => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = event => {
    setLastName(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value.trim());
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = event => {
    event.preventDefault();
    setShowPassword(show => !show);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  };

  const isStrongPassword = password => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);

    return (
      password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit
    );
  };

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }

  const handleSignUp = async () => {
    if (firstName.trim() === '') {
      alert('First name cannot be empty');
      return;
    }

    if (lastName.trim() === '') {
      alert('Last name cannot be empty');
      return;
    }

    if (!isValidEmail) {
      alert('Invalid email format');
      return;
    }

    if (password.trim() === '') {
      alert('Password cannot be empty');
      return;
    }

    if (!isStrongPassword(password)) {
      alert(
        'Password is not strong enough. Please follow the password requirements.'
      );
      return;
    }

    const user = { firstName, lastName, email, password };

    setIsLoading(true);

    try {
      const userResponse = await signup(user);

      const firstBoard = {
        boardName: `${getMonthName(
          new Date().toJSON().slice(5, 7)
        )} ${new Date().toJSON().slice(0, 4)} Demo Board`,
        userId: userResponse.data._id,
      };

      const boardResponse = await addBoard(firstBoard);

      const firstWishlist = {
        listName: 'Wishlist',
        userId: userResponse.data._id,
        boardId: boardResponse.data._id,
      };

      const firstAppliedList = {
        listName: 'Applied',
        userId: userResponse.data._id,
        boardId: boardResponse.data._id,
      };

      const firstInterviewsList = {
        listName: 'Interviews',
        userId: userResponse.data._id,
        boardId: boardResponse.data._id,
      };

      const firstOffersList = {
        listName: 'Offers',
        userId: userResponse.data._id,
        boardId: boardResponse.data._id,
      };

      const firstRejectedList = {
        listName: 'Rejected',
        userId: userResponse.data._id,
        boardId: boardResponse.data._id,
      };

      const wishlistResponse = await addList(firstWishlist);
      const appliedListResponse = await addList(firstAppliedList);
      const interviewsListResponse = await addList(firstInterviewsList);
      const offerListResponse = await addList(firstOffersList);
      const rejectedListResponse = await addList(firstRejectedList);

      demoApplications.forEach(application => {
        const list = () => {
          if (application.date.rejected) {
            return rejectedListResponse.data._id;
          } else if (application.date.offer) {
            return offerListResponse.data._id;
          } else if (application.date.interviews[0]) {
            return interviewsListResponse.data._id;
          } else if (application.date.applied) {
            return appliedListResponse.data._id;
          } else {
            return wishlistResponse.data._id;
          }
        };

        const jobData = {
          companyName: application.companyName,
          roleName: application.roleName,
          domain: application.domain,
          jobURL: application.jobURL,
          jobDescription: application.jobDescription,
          workModel: application.workModel,
          workLocation: application.workLocation,
          notes: application.notes,
          date: application.date,
          starred: application.starred,
          boardId: boardResponse.data._id,
          listId: list(),
          userId: userResponse.data._id,
        };

        const addDemoJob = async () => {
          try {
            const addedJob = await addJob(jobData);
            console.log('Added Job:', addedJob);
          } catch (error) {
            console.error('Error adding job:', error);
          }
        };

        addDemoJob();
      });

      setIsLoading(false);
      alert('Your registration was successful, please log in.');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      handleClose();
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };

  const SignUpDialogTitle = styled(DialogTitle)({
    color: darkMode ? 'white' : '#678B85',
  });

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} sx={{ ...buttonGreenStyle }}>
        Sign Up
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
        }}
      >
        <SignUpDialogTitle>Sign Up</SignUpDialogTitle>
        <DialogContent>
          <FormControl
            variant="standard"
            required
            fullWidth
            sx={{ ...formGreenStyle }}
          >
            <InputLabel htmlFor="standard-adornment-email">
              First name
            </InputLabel>
            <Input
              id="standard-adornment-firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              type="text"
              label="First name"
            />
          </FormControl>

          <FormControl
            variant="standard"
            required
            fullWidth
            sx={{ ...formGreenStyle }}
          >
            <InputLabel htmlFor="standard-adornment-email">
              Last name
            </InputLabel>
            <Input
              id="standard-adornment-lastName"
              value={lastName}
              onChange={handleLastNameChange}
              type="text"
              label="Last name"
            />
          </FormControl>

          <FormControl
            variant="standard"
            required
            fullWidth
            sx={{ ...formGreenStyle }}
          >
            <InputLabel htmlFor="standard-adornment-email">
              Email Address
            </InputLabel>
            <Input
              id="standard-adornment-email"
              value={email}
              onChange={handleEmailChange}
              onBlur={validateEmail}
              error={!isValidEmail}
              type="email"
              label="Email Address"
            />
          </FormControl>

          <FormControl
            variant="standard"
            required
            fullWidth
            sx={{ ...formGreenStyle }}
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              value={password}
              onChange={handlePasswordChange}
              type={showPassword ? 'text' : 'password'}
              autoComplete="on"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{
                      marginRight: 0,
                      marginLeft: '8px',
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <CancelButton
            setOpen={setOpen}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            setPassword={setPassword}
          />
          <div className="mr-[16px]">
            <Button
              onClick={handleSignUp}
              sx={{ ...buttonGreenStyle }}
              startIcon={
                isLoading && (
                  <CircularProgress sx={{ color: 'white' }} size={16} />
                )
              }
            >
              Sign Up
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default SignUpButton;
