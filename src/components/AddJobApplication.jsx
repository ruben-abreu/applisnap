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
  Select,
  MenuItem,
} from '@mui/material';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import CancelButton from '../components/CancelButton';
import { addJob } from '../api/jobs.api';
import { getList } from '../api/lists.api';
import dayjs from 'dayjs';

function AddJobApplication({
  open,
  setOpen,
  handleClose,
  board,
  list,
  role,
  fetchBoard,
}) {
  const [companyName, setCompanyName] = useState('');
  const [roleName, setRoleName] = useState(role);
  const [domain, setDomain] = useState('');
  const [jobURL, setJobURL] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [workModel, setWorkModel] = useState('On-Site');
  const [workLocation, setWorkLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [starred, setStarred] = useState(false);
  const [listName, setListName] = useState(
    list.listName ? list.listName : 'Wishlist'
  );
  const [dateInput, setDateInput] = useState(dayjs());
  const [dateLabel, setDateLabel] = useState('created');
  const [date, setDate] = useState({});

  const { user } = useContext(AuthContext);
  const { darkMode, formGreenStyle, buttonGreenStyle, greenIconButtonStyle } =
    useContext(ThemeContext);

  useEffect(() => {
    if (list) {
      getData(list);
    }
  }, [list]);

  const getData = async list => {
    try {
      const currentList = await getList(list._id);
      setListName(currentList.listName);
    } catch (error) {
      console.log('Error fetching data');
    }
  };

  const formatDate = unformattedDate =>
    dayjs(unformattedDate).format('DD/MM/YYYY');

  const handleAddDate = async () => {
    if (!dateInput) {
      return;
    }
    let formattedDate = dayjs(dateInput).format('YYYY/MM/DD');
    switch (dateLabel) {
      case 'created':
        setDate({ ...date, created: formattedDate });
        break;
      case 'applied':
        setDate({ ...date, applied: formattedDate });
        break;
      case 'interviews':
        if (date.interviews) {
          setDate({ ...date, interviews: [...date.interviews, formattedDate] });
        } else {
          setDate({ ...date, interviews: [formattedDate] });
        }
        break;
      case 'offer':
        setDate({ ...date, offer: formattedDate });
        break;
      case 'rejected':
        setDate({ ...date, rejected: formattedDate });
        break;
      default:
        setDate({ ...date, created: formattedDate });
    }
  };

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
        date: date,
        starred,
        boardId: board._id,
        listId: list[0]._id,
        userId: user._id,
      };

      console.log('Data to be saved:', jobData);
      const addedJob = await addJob(jobData);
      console.log('Added Job:', addedJob);

      if (fetchBoard) {
        await fetchBoard();
      }

      setCompanyName('');
      setRoleName('');
      setDomain('');
      setJobURL('');
      setJobDescription('');
      setWorkModel('On-Site');
      setWorkLocation('');
      setNotes('');
      setDate({});
      setStarred(false);

      handleClose();
    } catch (error) {
      console.error('Error adding job:', error);
      alert(error.response.data.message);
    }
  };

  const dateTypes = ['created', 'applied', 'interviews', 'offer', 'rejected'];

  return (
    <Dialog open={open}>
      <div className="flex justify-between items-center">
        <DialogTitle>Add Job Application</DialogTitle>
        <button onClick={() => setStarred(!starred)}>
          {starred ? (
            <StarRoundedIcon
              sx={{
                color: darkMode ? '#f9cc71' : '#e8a135',
                width: '30px',
                height: '30px',
                margin: '24px',
              }}
            />
          ) : (
            <StarOutlineRoundedIcon
              sx={{
                color: darkMode ? '#f9cc71' : '#e8a135',
                width: '30px',
                height: '30px',
                margin: '24px',
              }}
            />
          )}
        </button>
      </div>
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
            {board.lists.map(list => (
              <MenuItem key={list._id} value={list.listName}>
                {list.listName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="flex gap-[10px]">
          <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="date"
                label="Date"
                type="date"
                openTo="day"
                views={['year', 'month', 'day']}
                inputFormat="YYYY-MM-DD"
                value={dateInput}
                onChange={newDate => {
                  setDateInput(newDate);
                }}
                defaultValue={dayjs().format('YYYY/MM/DD')}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }}>
            <InputLabel htmlFor="dateLabel" label="Date Label">
              Date Label
            </InputLabel>
            <Select
              id="dateLabel"
              label="Date Label"
              type="text"
              value={dateLabel}
              onChange={e => setDateLabel(e.target.value)}
              defaultValue={dateLabel ? dateLabel : 'created'}
            >
              {dateTypes.map((dateType, index) => (
                <MenuItem key={index} value={dateType}>
                  <p className="capitalize">{dateType}</p>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <button onClick={handleAddDate}>
            <AddCircleOutlineRoundedIcon
              sx={{ ...greenIconButtonStyle, width: '20px', height: '20px' }}
            />
          </button>
        </div>
        {date && (
          <Timeline>
            {date.created && (
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                  Created
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{formatDate(date.created)}</TimelineContent>
              </TimelineItem>
            )}

            {date.applied && (
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                  Applied
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{formatDate(date.applied)}</TimelineContent>
              </TimelineItem>
            )}

            {date.interviews && (
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                  {date.interviews.length === 1 ? 'Interview' : 'Interviews'}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <ul>
                    {date.interviews.map((interview, index) => (
                      <li key={index}>{formatDate(interview)}</li>
                    ))}
                  </ul>
                </TimelineContent>
              </TimelineItem>
            )}

            {date.offer && (
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                  Offer
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{formatDate(date.offer)}</TimelineContent>
              </TimelineItem>
            )}

            {date.rejected && (
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                  Offer
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{formatDate(date.rejected)}</TimelineContent>
              </TimelineItem>
            )}
          </Timeline>
        )}
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
          setDate={setDate}
          setStarred={setStarred}
          setListName={setListName}
          setDateLabel={setDateLabel}
        />
        <Button onClick={handleSave} sx={{ ...buttonGreenStyle }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddJobApplication;
