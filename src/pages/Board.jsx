import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { getBoard } from '../api/boards.api';
import { updateApplicationListInBackend } from '../api/lists.api';
import { editJob } from '../api/jobs.api';
import { ThemeContext } from '../context/theme.context';
import {
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import EditApplication from '../components/EditApplication';
import AddJobButton from '../components/AddJobButton';
import AddBoardButton from '../components/AddBoardButton';
import SearchBar from '../components/SearchBar';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ContentPasteSearchRoundedIcon from '@mui/icons-material/ContentPasteSearchRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import Avatar from '@mui/material/Avatar';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';

function Board() {
  const [applicationList, setApplicationList] = useState([]);
  const [showApplicationList, setShowApplicationList] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [board, setBoard] = useState('');
  const [boardName, setBoardName] = useState('');
  const [lists, setLists] = useState([]);

  const { boardId } = useParams();

  const { darkMode, formGreenStyle } = useContext(ThemeContext);
  const { loggedIn, user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  const searchedCompany = query => {
    const filteredApplicationList = applicationList.filter(application => {
      return application.companyName
        .toLowerCase()
        .includes(query.toLowerCase());
    });
    setShowApplicationList(filteredApplicationList);
  };

  const handleBoardSelection = e => {
    setBoardName(e.target.value);
    const selectedBoard = user.boards.filter(
      board => board.boardName === e.target.value
    )[0];
    navigate(`/boards/${selectedBoard._id}`);
  };

  const fetchBoard = async () => {
    try {
      const currentBoard = await getBoard(boardId);
      setBoard(currentBoard);
      setBoardName(currentBoard.boardName);
      setApplicationList(currentBoard.jobs);
      setShowApplicationList(currentBoard.jobs);
      setLists(currentBoard.lists);
      console.log('currentBoard:', currentBoard);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const onDragStart = (e, applicationId) => {
    e.dataTransfer.setData('text/plain', applicationId);
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('dragged');
  };

  const onDragEnd = e => {
    e.target.classList.remove('dragged');
  };

  const onDragEnter = e => {
    e.preventDefault();
    e.target.classList.add('dragged-over');
  };

  const onDragLeave = e => {
    e.target.classList.remove('dragged-over');
  };

  const onDragOver = e => {
    e.preventDefault();
  };

  const handleEdit = application => {
    setSelectedApplication(application);
  };

  const onDrop = async (e, targetRole, targetList, dropIndex) => {
    e.preventDefault();
    e.target.classList.remove('dragged-over');
    const applicationId = e.dataTransfer.getData('text/plain');

    const draggedApplication = showApplicationList.find(
      app => app._id.toString() === applicationId.toString()
    );

    console.log('draggedApplication:', draggedApplication);
    console.log('Target List:', targetList);
    console.log('Target List ID:', targetList._id);
    console.log('Target Role:', targetRole);

    try {
      if (
        draggedApplication.roleName === targetRole &&
        draggedApplication.listId !== targetList._id
      ) {
        const updatedApplications = showApplicationList.filter(
          app => app._id.toString() !== applicationId.toString()
        );
        draggedApplication.listId = targetList._id;
        updatedApplications.splice(dropIndex, 0, draggedApplication);

        setApplicationList(updatedApplications);
        setShowApplicationList(updatedApplications);

        await updateApplicationListInBackend(applicationId, targetList._id);
      }

      const {
        companyName,
        domain,
        jobURL,
        jobDescription,
        workModel,
        workLocation,
        notes,
        customLabel,
        date,
        starred,
        userId,
        boardId,
      } = draggedApplication;

      const updatedJob = {
        companyName,
        domain,
        jobURL,
        jobDescription,
        workModel,
        workLocation,
        notes,
        customLabel,
        date,
        starred,
        userId,
        boardId,
        listId: targetList._id,
        roleName: targetRole,
      };

      await editJob(applicationId, updatedJob);
      fetchBoard();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const renderApplications = (role, list) => {
    return (
      <Grid
        container
        spacing={1}
        onDragOver={onDragOver}
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          maxWidth: '340px',
          marginRight: '8px',
        }}
      >
        {showApplicationList &&
          showApplicationList
            .filter(application => {
              if (list !== undefined) {
                return (
                  application.roleName === role &&
                  application.listId === list._id
                );
              } else {
                return application.roleName === role;
              }
            })
            .map((application, index) => (
              <Grid
                item
                key={application._id + '-' + index}
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <Paper
                  elevation={3}
                  draggable
                  onDragStart={e => onDragStart(e, application._id)}
                  onDragEnd={onDragEnd}
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDrop={e => onDrop(e, role, list, index)}
                  onClick={() => handleEdit(application)}
                  sx={{
                    backgroundColor: darkMode ? '#6e6e6e' : '#cfcfcf',
                    padding: '5px',
                    cursor: 'pointer',
                    minWidth: 100,
                    maxWidth: 340,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow:
                      '0px 3px 3px -2px rgba(55, 89, 84, 0.2),0px 3px 4px 0px rgba(55, 89, 84,0.14),0px 1px 8px 0px rgba(55, 89, 84,0.12)',
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    width="145px"
                    minHeight="56px"
                  >
                    <Grid item>
                      <Avatar
                        sx={{
                          fontSize: '14px',
                          borderRadius: '2px',
                          maxHeight: '20px',
                          maxWidth: '20px',
                          width: 'auto',
                          height: 'auto',
                          backgroundColor: 'transparent',
                          color: darkMode ? 'white' : 'black',
                        }}
                        src={
                          `https://logo.clearbit.com/${application.domain}` ||
                          ''
                        }
                      >
                        {application.companyName &&
                        application.companyName.split(' ').length > 1
                          ? application.companyName
                              .split(' ')
                              .map(word => word[0])
                              .slice(0, 2)
                              .join('')
                          : application.companyName.split(' ').length === 1
                          ? application.companyName[0]
                          : ''}
                      </Avatar>
                    </Grid>
                    <Grid item xs style={{ flex: '1', textAlign: 'center' }}>
                      <p className="text-xs text-left p-0">
                        {application.companyName || ''}
                      </p>
                    </Grid>
                    {application.jobURL && (
                      <Grid item>
                        <a
                          href={application.jobURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkRoundedIcon
                            sx={{ width: '15px', height: '15px' }}
                          />
                        </a>
                      </Grid>
                    )}
                  </Grid>
                </Paper>
              </Grid>
            ))}
      </Grid>
    );
  };

  const EmptyDropArea = ({ role, list }) => (
    <div
      className="empty-drop-area min-h-[66px] hover:bg-[#c3e1dc] rounded-md"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={e => onDrop(e, role, list, 0)}
    />
  );

  const uniqueRoles = [
    ...new Set(
      showApplicationList
        .map(app => app.roleName)
        .sort((a, b) => a.localeCompare(b))
    ),
  ];

  console.log('uniqueRoles:', uniqueRoles);

  const handleEditClose = () => {
    setSelectedApplication(null);
  };

  const renderListsForRole = role => {
    return lists.map(list => (
      <div key={`${role}-${list.listName}`}>
        <div className="mt-[18px] mb-[8px] font-bold flex items-center text-[#30b39a]">
          {list.listName === 'Wishlist' ? (
            <AutoAwesomeRoundedIcon
              fontSize="small"
              sx={{
                color: '#30b39a',
                marginRight: '10px',
              }}
            />
          ) : list.listName === 'Applied' ? (
            <SendRoundedIcon
              fontSize="small"
              sx={{
                color: '#30b39a',
                marginRight: '10px',
              }}
            />
          ) : list.listName === 'Interviews' ? (
            <ContentPasteSearchRoundedIcon
              fontSize="small"
              sx={{
                color: '#30b39a',
                marginRight: '10px',
              }}
            />
          ) : list.listName === 'Offers' ? (
            <EmojiEventsRoundedIcon
              fontSize="small"
              sx={{
                color: '#30b39a',
                marginRight: '10px',
              }}
            />
          ) : list.listName === 'Rejected' ? (
            <ThumbDownAltRoundedIcon
              fontSize="small"
              sx={{
                color: '#30b39a',
                marginRight: '10px',
              }}
            />
          ) : (
            ''
          )}
          <p>{list.listName}</p>

          <AddJobButton
            board={board}
            list={list}
            role={role}
            fetchBoard={fetchBoard}
            boardId={boardId}
          />
        </div>
        {renderApplications(role, list)}
        {showApplicationList &&
          showApplicationList.filter(
            application =>
              application.roleName === role && application.listId === list._id
          ).length === 0 && <EmptyDropArea role={role} list={list} />}{' '}
      </div>
    ));
  };

  return (
    <div className="m-[2%] mt-[30px] pb-[30px]">
      {loggedIn ? (
        <div>
          <div className="flex flex-wrap gap-[10px] justify-between items-center">
            {user && user.boards.length === 1 && boardName && (
              <h2
                className={`text-[1.4em] ${
                  darkMode ? 'text-white' : 'text-[#678B85]'
                }`}
              >
                {boardName}
              </h2>
            )}
            {user && user.boards.length > 1 && boardName && (
              <form>
                <FormControl sx={{ ...formGreenStyle, my: 1 }}>
                  <InputLabel htmlFor="board" label="Board">
                    Board
                  </InputLabel>
                  <Select
                    id="board"
                    label="Board"
                    type="text"
                    value={boardName}
                    onChange={e => handleBoardSelection(e)}
                    defaultValue={
                      boardName
                        ? boardName
                        : user.boards[user.boards.length - 1].boardName
                    }
                  >
                    {user.boards.map(board => (
                      <MenuItem key={board._id} value={board.boardName}>
                        {board.boardName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </form>
            )}
            <AddBoardButton />
          </div>
          {board && (
            <div className="flex items-center mt-[30px]">
              <h3
                className={`text-[16px] ${
                  darkMode ? 'text-white' : 'text-[black]'
                } font-bold`}
              >
                {board.jobs.length === 0
                  ? 'Add your first job application'
                  : 'Add new job application'}
              </h3>
              <AddJobButton
                board={board}
                list="Wishlist"
                role=""
                fetchBoard={fetchBoard}
                boardId={boardId}
              />
            </div>
          )}
          {applicationList && applicationList.length > 0 && (
            <div className="flex justify-start mt-[30px]">
              <SearchBar searchedCompany={searchedCompany} />
            </div>
          )}
          <div className="overflow-visible mt-[30px]">
            <div className="flex gap-[20px]">
              {uniqueRoles &&
                uniqueRoles.map((role, index) => (
                  <div
                    key={index}
                    className={`min-w-[200px] max-w-[340px] ${
                      darkMode ? 'bg-[#525252]' : 'bg-[#eaeaea]'
                    } ${
                      darkMode ? 'shadow-[#6f6f6f]' : 'shadow-[#cfcfcf]'
                    } rounded-xl shadow-sm  py-[20px] pl-[18px] pr-[12px]`}
                  >
                    <h5
                      className={`font-bold mb-[8px] text-xl ${
                        darkMode ? 'text-[#ff8956]' : 'text-[#f06c35]'
                      }`}
                    >
                      {role}
                    </h5>
                    <Grid container direction="column" style={{ margin: 0 }}>
                      {renderListsForRole(role)}
                    </Grid>
                  </div>
                ))}
            </div>
            {selectedApplication && (
              <EditApplication
                open={Boolean(selectedApplication)}
                onClose={handleEditClose}
                application={selectedApplication}
                board={board}
                fetchBoard={fetchBoard}
                lists={lists}
                boardId={boardId}
              />
            )}
          </div>
        </div>
      ) : (
        <p className="text-center mt-[50px] font-bold text-xl">
          Please log in to view this page
        </p>
      )}
    </div>
  );
}

export default Board;
