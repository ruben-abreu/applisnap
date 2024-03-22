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
  InputAdornment,
  IconButton,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
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
import dayjs from 'dayjs';

function AddJobApplication({
  list,
  role,
  board,
  fetchBoard,
  defaultList,
  currentBoardName,
  setCurrentBoardName,
  updateUser,
}) {
  const { user } = useContext(AuthContext);
  const {
    darkMode,
    formGreenStyle,
    buttonGreenStyle,
    greenIconButtonStyle,
    greyIconButtonStyle,
  } = useContext(ThemeContext);

  const [open, setOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [roleName, setRoleName] = useState(role ? role : '');
  const [domain, setDomain] = useState('');
  const [jobURL, setJobURL] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [workModel, setWorkModel] = useState('On-Site');
  const [workLocation, setWorkLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [starred, setStarred] = useState(false);
  const [listName, setListName] = useState(
    defaultList ? defaultList : list ? list.listName : 'Wishlist'
  );
  const [jobBoardName, setJobBoardName] = useState(
    currentBoardName && currentBoardName !== 'All Boards'
      ? currentBoardName
      : board.boardName
      ? board.boardName
      : user.boards[user.boards.length - 1].boardName
  );
  const [dateInput, setDateInput] = useState(dayjs());
  const [dateLabel, setDateLabel] = useState(
    listName === 'Applied' || listName === 'Wishlist'
      ? 'applied'
      : listName === 'Interviews'
      ? 'interviews'
      : listName === 'Offers'
      ? 'offer'
      : listName === 'Rejected'
      ? 'rejected'
      : 'applied'
  );
  const [date, setDate] = useState({});

  useEffect(() => {
    if (list._id) {
      getData(list);
    }
    let formattedDate = dayjs(dateInput).format('YYYY/MM/DD');

    if (!date.created) {
      setDate({ ...date, created: formattedDate });
    }

    if (currentBoardName === 'All Boards' && updateUser) {
      setCurrentBoardName('All Boards');
      updateUser(user._id);
    }
  }, [list, currentBoardName]);

  const handleOpenDialog = () => {
    setJobBoardName(
      currentBoardName && currentBoardName !== 'All Boards'
        ? currentBoardName
        : board.boardName
        ? board.boardName
        : user.boards[user.boards.length - 1].boardName
    );
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const getData = async list => {
    try {
      setListName(list.listName);
    } catch (error) {
      console.log('Error fetching data');
    }
  };

  const uniqueLists = [...new Set(user.lists.map(list => list.listName))];

  const formatDate = unformattedDate =>
    dayjs(unformattedDate).format('DD/MM/YYYY');

  const handleAddDate = () => {
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

  const handleRemoveDate = (dateType, dateValue) => {
    if (!dateType) {
      return;
    }

    switch (dateType) {
      case 'created':
        setDate({ ...date, created: null });
        break;
      case 'applied':
        setDate({ ...date, applied: null });
        break;
      case 'interviews':
        if (date.interviews.length > 1) {
          const updatedInterviewDates = date.interviews.filter(
            interview => interview !== dateValue
          );
          setDate({ ...date, interviews: [...updatedInterviewDates] });
        } else {
          setDate({ ...date, interviews: [] });
        }
        break;
      case 'offer':
        setDate({ ...date, offer: null });
        break;
      case 'rejected':
        setDate({ ...date, rejected: null });
        break;
      default:
        setDate({ ...date, created: null });
    }
  };

  const handleSave = async e => {
    e.preventDefault();

    if (companyName.trim() === '') {
      alert('Company name cannot be empty');
      return;
    }

    if (roleName.trim() === '') {
      alert('Role name cannot be empty');
      return;
    }

    let formattedDomain;
    if (domain) {
      formattedDomain = domain.trim().toLowerCase();
      if (formattedDomain.startsWith('http://')) {
        formattedDomain = formattedDomain.slice(7);
      } else if (formattedDomain.startsWith('https://')) {
        formattedDomain = formattedDomain.slice(8);
      }
      if (formattedDomain.startsWith('www.')) {
        formattedDomain = formattedDomain.slice(4);
      }
      formattedDomain = formattedDomain.split('/')[0];
    }

    const selectedBoard = user.boards.filter(
      board => board.boardName === jobBoardName
    );

    const boardLists = user.lists.filter(
      list => list.boardId === selectedBoard[0]._id
    );

    const list = boardLists.filter(list => list.listName === listName);

    let formattedDate = dayjs().format('YYYY/MM/DD');

    const updatedDate = { ...date };

    if (listName === 'Applied' && !updatedDate.applied) {
      updatedDate.applied = formattedDate;
    } else if (listName === 'Interviews') {
      if (updatedDate.interviews) {
        updatedDate.interviews = [...updatedDate.interviews, formattedDate];
      } else {
        updatedDate.interviews = [formattedDate];
      }
    } else if (listName === 'Offers' && !updatedDate.offer) {
      updatedDate.offer = formattedDate;
    } else if (listName === 'Rejected' && !updatedDate.rejected) {
      updatedDate.rejected = formattedDate;
    }

    const jobData = {
      companyName,
      roleName,
      domain: formattedDomain,
      jobURL,
      jobDescription,
      workModel,
      workLocation,
      notes,
      date: updatedDate,
      starred,
      boardId: selectedBoard[0]._id,
      listId: list[0]._id,
      userId: user._id,
    };

    try {
      await addJob(jobData);

      await fetchBoard(selectedBoard[0]._id);

      if (updateUser && currentBoardName == 'All Boards') {
        await updateUser(user._id);
        setCurrentBoardName('All Boards');
      }

      setCompanyName('');
      setRoleName(role ? role : '');
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
    }
  };

  const dateTypes = ['created', 'applied', 'interviews', 'offer', 'rejected'];

  return (
    <div>
      <button onClick={handleOpenDialog} className="w-[20px] h-[20px] ml-[5px]">
        <AddCircleIcon
          sx={{ ...greenIconButtonStyle, width: '20px', height: '20px' }}
        />
      </button>
      <Dialog open={open}>
        <form action="submit" onSubmit={handleSave}>
          <div className="flex justify-between items-center">
            <DialogTitle>Add Job Application</DialogTitle>
            <button type="button" onClick={() => setStarred(!starred)}>
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
              />
            </FormControl>
            <FormControl fullWidth sx={{ ...formGreenStyle, my: 1 }} required>
              <InputLabel htmlFor="roleName" label="Role">
                Role
              </InputLabel>
              <Input
                id="roleName"
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
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      sx={{
                        marginRight: 0,
                        marginLeft: '8px',
                        borderRadius: '5px',
                      }}
                    >
                      {domain && (
                        <a
                          href={
                            !domain.includes('://')
                              ? `http://${domain}`
                              : domain
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`https://logo.clearbit.com/${domain}` || ''}
                            alt=""
                            className="max-h-[20px] rounded-[2px]"
                          />
                        </a>
                      )}
                    </IconButton>
                  </InputAdornment>
                }
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
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      sx={{
                        marginRight: 0,
                        marginLeft: '8px',
                        borderRadius: '50%',
                      }}
                    >
                      {jobURL && (
                        <a
                          href={jobURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkRoundedIcon
                            sx={{ width: '20px', height: '20px' }}
                          />
                        </a>
                      )}
                    </IconButton>
                  </InputAdornment>
                }
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
                {uniqueLists &&
                  uniqueLists.map((list, index) => (
                    <MenuItem key={'AJ-Lists' + index} value={list}>
                      {list}
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
                value={jobBoardName}
                onChange={e => setJobBoardName(e.target.value)}
                defaultValue={jobBoardName}
              >
                {user &&
                  user.boards &&
                  user.boards.map(board => (
                    <MenuItem
                      key={'AJ-User' + board.boardName + board._id}
                      value={board.boardName}
                    >
                      {board.boardName}
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
                  defaultValue={
                    listName === 'Applied' || listName === 'Wishlist'
                      ? 'applied'
                      : listName === 'Interviews'
                      ? 'interviews'
                      : listName === 'Offers'
                      ? 'offer'
                      : listName === 'Rejected'
                      ? 'rejected'
                      : dateLabel
                      ? dateLabel
                      : 'applied'
                  }
                >
                  {dateTypes &&
                    dateTypes.map((dateType, index) => (
                      <MenuItem
                        key={'AJ-User' + dateType + index}
                        value={dateType}
                      >
                        <p className="capitalize">{dateType}</p>
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <button onClick={handleAddDate}>
                <AddCircleOutlineRoundedIcon
                  sx={{
                    ...greenIconButtonStyle,
                    width: '20px',
                    height: '20px',
                  }}
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
                    <TimelineContent>
                      {formatDate(date.created)}
                    </TimelineContent>
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
                    <TimelineContent>
                      <div className="flex items-center gap-[5px]">
                        <p className="w-[100px]">{formatDate(date.applied)}</p>
                        <button
                          className="flex items-center"
                          onClick={() => handleRemoveDate('applied')}
                        >
                          <HighlightOffRoundedIcon
                            sx={{
                              ...greyIconButtonStyle,
                              width: '20px',
                              height: '20px',
                            }}
                          />
                        </button>
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                )}

                {date.interviews && date.interviews.length > 0 && (
                  <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                      {date.interviews.length === 1
                        ? 'Interview'
                        : 'Interviews'}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <ul>
                        {date.interviews.map((interview, index) => (
                          <div
                            key={'AJ-User' + interview + index}
                            className="flex items-center gap-[5px]"
                          >
                            <li className="w-[100px]">
                              {formatDate(interview)}
                            </li>
                            <button
                              className="flex items-center"
                              onClick={() =>
                                handleRemoveDate('interviews', interview)
                              }
                            >
                              <HighlightOffRoundedIcon
                                sx={{
                                  ...greyIconButtonStyle,
                                  width: '20px',
                                  height: '20px',
                                }}
                              />
                            </button>
                          </div>
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
                    <TimelineContent>
                      <div className="flex items-center gap-[5px]">
                        <p className="w-[100px]">{formatDate(date.offer)}</p>
                        <button
                          className="flex items-center"
                          onClick={() => handleRemoveDate('offer')}
                        >
                          <HighlightOffRoundedIcon
                            sx={{
                              ...greyIconButtonStyle,
                              width: '20px',
                              height: '20px',
                            }}
                          />
                        </button>
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                )}

                {date.rejected && (
                  <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                      Rejected
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent>
                      <div className="flex items-center gap-[5px]">
                        <p className="w-[100px]">{formatDate(date.rejected)}</p>
                        <button
                          className="flex items-center"
                          onClick={() => handleRemoveDate('rejected')}
                        >
                          <HighlightOffRoundedIcon
                            sx={{
                              ...greyIconButtonStyle,
                              width: '20px',
                              height: '20px',
                            }}
                          />
                        </button>
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                )}
              </Timeline>
            )}
          </DialogContent>
          <DialogActions>
            <CancelButton
              setOpen={setOpen}
              setCompanyName={setCompanyName}
              setDomain={setDomain}
              setJobURL={setJobURL}
              setJobDescription={setJobDescription}
              setWorkModel={setWorkModel}
              setWorkLocation={setWorkLocation}
              setNotes={setNotes}
              setDate={setDate}
              setStarred={setStarred}
              setDateLabel={setDateLabel}
              listName={listName}
            />
            <Button
              type="submit"
              onClick={handleSave}
              sx={{ ...buttonGreenStyle }}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddJobApplication;
