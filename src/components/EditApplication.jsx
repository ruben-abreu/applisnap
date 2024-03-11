import { useEffect, useState } from 'react';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { ThemeContext } from '../context/theme.context';
import CancelButton from '../components/CancelButton';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { addJob, editJob, deleteJob } from '../api/jobs.api';
import { getList } from '../api/lists.api';
import { getBoard } from '../api/boards.api';
import dayjs from 'dayjs';

function EditApplication({
  open,
  onClose,
  application,
  board,
  fetchBoard,
  lists,
  boardId,
}) {
  const [companyName, setCompanyName] = useState(application.companyName);
  const [roleName, setRoleName] = useState(application.roleName);
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
  const [list, setList] = useState(application.listId);
  const [listName, setListName] = useState(
    list.listName ? list.listName : 'Wishlist'
  );
  const [boardName, setBoardName] = useState('');
  const [boards, setBoards] = useState([]);
  const [dateLabel, setDateLabel] = useState('');

  const { user } = useContext(AuthContext);
  const { darkMode, formGreenStyle, buttonGreenStyle } =
    useContext(ThemeContext);

  console.log('application:', application);
  console.log('application.listId:', application.listId);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const list = await getList(application.listId);
      setListName(list.listName);
      setBoardName(board.boardName);
      setBoards(user.boards);
    } catch (error) {
      console.log('Error fetching data');
    }
  };

  const handleSave = async () => {
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

    const newBoard = boards.filter(board => board.boardName === boardName)[0];
    console.log('newBoard:', newBoard);

    const newBoardDetails = await getBoard(newBoard._id);
    console.log('newBoardDetails', newBoardDetails);

    const newList = newBoardDetails.lists.filter(
      list => list.listName === listName
    )[0];

    console.log('newList:', newList);

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
      boardId: newBoard._id,
      listId: newList._id,
      userId: user._id,
    };
    console.log('Data to be saved:', jobData);
    try {
      if (boardId === newBoard._id) {
        console.log('application.boardId', application.boardId);
        console.log('newBoard._id', newBoard._id);
        await editJob(application._id, jobData);
      } else {
        await addJob(jobData);
        await deleteJob(application._id);
      }

      await fetchBoard();
      onClose();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteJob(application._id);

      await fetchBoard();
      onClose();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const dateTypes = ['created', 'applied', 'interviews', 'offer', 'rejected'];

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="flex justify-between items-center">
        <DialogTitle>Edit Job</DialogTitle>
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
        <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }}>
          <InputLabel htmlFor="companyName" label="Company Name">
            Company Name
          </InputLabel>
          <Input
            id="companyName"
            value={companyName}
            type="text"
            label="Company Name"
            onChange={e => setCompanyName(e.target.value)}
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
            onChange={e => setDomain(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }}>
          <InputLabel htmlFor="jobURL" label="Job URL">
            Job URL
          </InputLabel>
          <Input
            id="jobURL"
            type="text"
            label="Job URL"
            value={jobURL}
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
            type="text"
            label="Work Location"
            value={workLocation}
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
            onChange={e => setWorkModel(e.target.value)}
          >
            <MenuItem value={'On-Site'}>On-Site</MenuItem>
            <MenuItem value={'Remote'}>Remote</MenuItem>
            <MenuItem value={'Hybrid'}>Hybrid</MenuItem>
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
                format="YYYY-MM-DD"
                value={date}
                onChange={e => setDate(e.target.value)}
                defaultValue={dayjs()}
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
        </div>
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
            defaultValue={listName}
          >
            {lists.map(list => (
              <MenuItem key={list._id} value={list.listName}>
                {list.listName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }}>
          <InputLabel htmlFor="board" label="Board">
            Board
          </InputLabel>
          <Select
            id="board"
            label="Board"
            type="text"
            value={boardName}
            onChange={e => setBoardName(e.target.value)}
            defaultValue={boardName}
          >
            {boards.map(board => (
              <MenuItem key={board._id} value={board.boardName}>
                {board.boardName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }}>
          <InputLabel htmlFor="notes">Notes</InputLabel>
          <Input
            id="notes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            multiline
            rows={2}
          />
        </FormControl>
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
          setList={setList}
        />
        <Button onClick={handleSave} sx={{ ...buttonGreenStyle }}>
          Save
        </Button>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}

export default EditApplication;
