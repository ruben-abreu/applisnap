import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Input,
  Switch,
  TextField,
  FormControlLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { styled } from '@mui/material/styles';
import CancelButton from '../components/CancelButton';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddRole from './AddRole';
import { editJob } from '../api/jobs.api';

function EditApplication({ open, onClose, application }) {
  const [companyName, setCompanyName] = useState(application.companyName);
  const [roleName, setRoleName] = useState(application.role);
  const [domain, setDomain] = useState(application.domain);
  const [jobURL, setJobURL] = useState(application.jobURL);
  const [jobDescription, setJobDescription] = useState(
    application.jobDescription
  );
  const [workModel, setWorkModel] = useState(application.workModel);
  const [workLocation, setWorkLocation] = useState(application.workLocation);
  const [notes, setNotes] = useState(application.notes);
  const [customLabel, setCustomLabel] = useState(application.customLabel);
  const [date, setDate] = useState(application.date);
  const [starred, setStarred] = useState(application.starred);
  const [board, setBoard] = useState(application.board);
  const [list, setList] = useState(application.list);

  const { user } = useContext(AuthContext);

  const greenStyle = {
    '.MuiFormLabel-root': {
      color: theme => (theme.palette.mode === 'dark' ? 'white' : '#678B85'),
    },
    '.MuiInputLabel-root': {
      color: theme => (theme.palette.mode === 'dark' ? 'white' : '#678B85'),
    },
    '.MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
      color: '#30b39a',
    },
    '.MuiInput-underline:after': {
      borderBottom: '2px solid #678B85',
    },
    '&:hover': {
      '.MuiInput-underline:after': {
        borderBottom: '2px solid #30b39a',
      },
    },
    '.MuiInput-root': {
      '&.Mui-focused': {
        borderColor: '#30b39a',
      },
    },
    marginBottom: '15px',
  };

  const EditButtonStyled = styled(Button)({
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

  const handleSave = () => {
    let formattedDomain = domain.trim().toLowerCase();
    if (formattedDomain.startsWith('http://')) {
      formattedDomain = formattedDomain.slice(7);
    } else if (formattedDomain.startsWith('https://')) {
      formattedDomain = formattedDomain.slice(8);
    }
    if (formattedDomain.startsWith('www.')) {
      formattedDomain = formattedDomain.slice(4);
    }
    formattedDomain = formattedDomain.split('/')[0];

    const jobData = {
      companyName,
      roleName,
      domain: formattedDomain,
      jobURL,
      jobDescription,
      workModel,
      workLocation,
      notes,
      customLabel,
      date,
      starred,
      board,
      list,
      userId: user._id,
    };

    console.log('Data to be saved:', jobData);
    onClose();
    editJob(application._id, jobData);
  };

  const handleDelete = () => {
    // Perform deletion logic here
    console.log('Deleting application:', application);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Job</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ ...greenStyle, my: 1 }}>
          <InputLabel htmlFor='companyName'>Company Name</InputLabel>
          <Input
            id='companyName'
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
          />
        </FormControl>
        <AddRole
          roleName={roleName}
          setRoleName={setRoleName}
          greenStyle={greenStyle}
        />
        <FormControl fullWidth sx={{ ...greenStyle, my: 1 }}>
          <InputLabel htmlFor='domain'>Domain</InputLabel>
          <Input
            id='domain'
            value={domain}
            onChange={e => setDomain(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...greenStyle, my: 1 }}>
          <InputLabel htmlFor='jobURL'>Job URL</InputLabel>
          <Input
            id='jobURL'
            value={jobURL}
            onChange={e => setJobURL(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...greenStyle, my: 1 }}>
          <InputLabel htmlFor='jobDescription'>Job Description</InputLabel>
          <Input
            id='jobDescription'
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            multiline
            rows={2}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...greenStyle, my: 1 }}>
          <InputLabel htmlFor='workModel'>Work Model</InputLabel>
          <Select
            id='workModel'
            value={workModel}
            onChange={e => setWorkModel(e.target.value)}
          >
            <MenuItem value={'On-Site'}>On-Site</MenuItem>
            <MenuItem value={'Remote'}>Remote</MenuItem>
            <MenuItem value={'Hybrid'}>Hybrid</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ ...greenStyle, my: 1 }}>
          <InputLabel htmlFor='workLocation'>Work Location</InputLabel>
          <Input
            id='workLocation'
            value={workLocation}
            onChange={e => setWorkLocation(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...greenStyle, my: 1 }}>
          <TextField
            id='date'
            label='Date'
            type='date'
            value={date}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...greenStyle, my: 1 }}>
          <InputLabel htmlFor='notes'>Notes</InputLabel>
          <Input
            id='notes'
            value={notes}
            onChange={e => setNotes(e.target.value)}
            multiline
            rows={2}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...greenStyle, my: 1 }}>
          <InputLabel htmlFor='customLabel'>Custom Label</InputLabel>
          <Input
            id='customLabel'
            value={customLabel}
            onChange={e => setCustomLabel(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...greenStyle, my: 1 }}>
          <InputLabel htmlFor='board'>Board</InputLabel>
          <Input
            id='board'
            value={board}
            onChange={e => setBoard(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...greenStyle, my: 1 }}>
          <InputLabel htmlFor='list'>List</InputLabel>
          <Select
            id='list'
            value={list}
            onChange={e => setList(e.target.value)}
          >
            <MenuItem value={'Wishlist'}>Wishlist</MenuItem>
            <MenuItem value={'Applied'}>Applied</MenuItem>
            <MenuItem value={'Interview'}>Interview</MenuItem>
            <MenuItem value={'Offers'}>Offers</MenuItem>
            <MenuItem value={'Rejected'}>Rejected</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={starred}
              onChange={e => setStarred(e.target.checked)}
              name='starred'
              color='primary'
            />
          }
          label='Starred'
        />
      </DialogContent>
      <DialogActions>
        <CancelButton
          setOpen={onClose}
          setCompanyName={setCompanyName}
          setRoleName={setRoleName}
          setDomain={setDomain}
          setJobURL={setJobURL}
          setJobDescription={setJobDescription}
          setWorkModel={setWorkModel}
          setWorkLocation={setWorkLocation}
          setNotes={setNotes}
          setCustomLabel={setCustomLabel}
          setDate={setDate}
          setStarred={setStarred}
          setBoard={setBoard}
          setList={setList}
        />
        <EditButtonStyled onClick={handleSave}>Save</EditButtonStyled>
        <IconButton aria-label='delete' onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}

export default EditApplication;
