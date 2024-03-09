import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { ThemeContext } from '../context/theme.context';
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
import CancelButton from '../components/CancelButton';
import { addJob } from '../api/jobs.api';
import { addRole } from '../api/role.api';

function AddJobApplication({
  open,
  setOpen,
  handleClose,
  board,
  fetchBoard,
  list,
  role,
}) {
  const [companyName, setCompanyName] = useState('');
  const [roleName, setRoleName] = useState(role);
  const [domain, setDomain] = useState('');
  const [jobURL, setJobURL] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [workModel, setWorkModel] = useState('On-Site');
  const [workLocation, setWorkLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [customLabel, setCustomLabel] = useState('');
  const [date, setDate] = useState('');
  const [starred, setStarred] = useState(false);
  const [listName, setListName] = useState(
    list.listName ? list.listName : 'Wishlist'
  );
  const [lists, setLists] = useState(board.lists);
  const [boardId, setBoardId] = useState(board._id);

  const { user } = useContext(AuthContext);
  const { formGreenStyle, buttonGreenStyle } = useContext(ThemeContext);

  useEffect(() => {
    setLists(board.lists);
    setBoardId(board._id);
  }, []);

  const handleSave = async () => {
    try {
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

      console.log('listName', listName);
      console.log('board.lists', board.lists);

      const list = board.lists.filter(list => list.listName === listName);

      console.log('list:', list);

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
        boardId: boardId,
        listId: list[0]._id,
        userId: user._id,
      };

      console.log('Data to be saved:', jobData);
      const addedJob = await addJob(jobData);
      console.log('Added Job:', addedJob);

      const { jobId } = addedJob.data._id;

      const role = {
        roleName,
        userId: user._id,
        boardId,
        listId: list[0]._id,
        jobId,
      };
      const addedRole = await addRole(role);
      console.log('Added Role:', addedRole);

      fetchBoard();
      handleClose();
    } catch (error) {
      console.error('Error adding job:', error);
      alert(error.response.data.message);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add Job Application</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }} required>
          <InputLabel htmlFor="companyName" label="Company Name">
            Company Name
          </InputLabel>
          <Input
            id="companyName"
            value={companyName}
            type="text"
            label="Company Name"
            onChange={e => setCompanyName(e.target.value)}
            required
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }}>
          <InputLabel htmlFor="companyName" label="Role">
            Role
          </InputLabel>
          <Input
            id="role"
            value={roleName}
            type="text"
            label="Role"
            onChange={e => setRoleName(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }}>
          <InputLabel htmlFor="domain" label="Company Website">
            Company Website
          </InputLabel>
          <Input
            id="domain"
            type="text"
            label="Company Website"
            value={domain}
            placeholder=""
            onChange={e => setDomain(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }}>
          <InputLabel htmlFor="jobURL" label="Job URL">
            Job URL
          </InputLabel>
          <Input
            id="jobURL"
            value={jobURL}
            type="text"
            label="Job URL"
            onChange={e => setJobURL(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }}>
          <InputLabel htmlFor="jobDescription" label="Job Description">
            Job Description
          </InputLabel>
          <Input
            id="jobDescription"
            value={jobDescription}
            type="text"
            label="Job Description"
            onChange={e => setJobDescription(e.target.value)}
            multiline
            rows={6}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }}>
          <InputLabel htmlFor="workLocation" label="Work Location">
            Work Location
          </InputLabel>
          <Input
            id="workLocation"
            value={workLocation}
            type="text"
            label="Work Location"
            onChange={e => setWorkLocation(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }}>
          <InputLabel htmlFor="workModel" label="Work Model">
            Work Model
          </InputLabel>
          <Select
            id="workModel"
            label="Work Model"
            type="text"
            value={workModel}
            defaultValue="On-Site"
            onChange={e => setWorkModel(e.target.value)}
          >
            <MenuItem value={'On-Site'}>On-Site</MenuItem>
            <MenuItem value={'Remote'}>Remote</MenuItem>
            <MenuItem value={'Hybrid'}>Hybrid</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }}>
          <TextField
            id="date"
            label="Date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }}>
          <InputLabel htmlFor="list" label="List">
            List
          </InputLabel>
          <Select
            id="list"
            label="List"
            type="text"
            value={listName}
            onChange={e => setListName(e.target.value)}
            defaultValue={listName ? listName : 'Wishlist'}
          >
            {lists.map(list => (
              <MenuItem key={list._id} value={list.listName}>
                {list.listName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }}>
          <InputLabel htmlFor="notes" label="Notes">
            Notes
          </InputLabel>
          <Input
            id="notes"
            value={notes}
            type="text"
            label="Notes"
            onChange={e => setNotes(e.target.value)}
            multiline
            rows={2}
          />
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={starred}
              onChange={e => setStarred(e.target.checked)}
              name="starred"
              color="primary"
            />
          }
          label="Starred"
        />
      </DialogContent>
      <DialogActions>
        <CancelButton
          setOpen={setOpen}
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
          setListName={setListName}
        />
        <Button onClick={handleSave} sx={{ ...buttonGreenStyle }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddJobApplication;
