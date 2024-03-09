import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getBoard } from '../api/boards.api';
import { ThemeContext } from '../context/theme.context';
import { Grid, Paper, Typography } from '@mui/material';
import EditApplication from '../components/EditApplication';
import AddJobButton from '../components/AddJobButton';
import AddBoardButton from '../components/AddBoardButton';
import { updateApplicationListInBackend } from '../api/lists.api';
import { AuthContext } from '../context/auth.context';

function Board() {
  const [applicationList, setApplicationList] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [board, setBoard] = useState('');
  const [boardName, setBoardName] = useState('');
  const [lists, setLists] = useState([]);
  const { boardId } = useParams();
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchBoard();
  }, []);

  const fetchBoard = async () => {
    try {
      const currentBoard = await getBoard(boardId);
      setBoard(currentBoard);
      console.log('currentBoard', currentBoard);
      setBoardName(currentBoard.boardName);
      console.log('boardName:', currentBoard.boardName);
      setApplicationList(currentBoard.jobs);
      console.log('applicationList:', currentBoard.jobs);
      setLists(currentBoard.lists);
      console.log('lists:', currentBoard.lists);
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

  const onDrop = (e, targetRole, targetList, dropIndex) => {
    e.preventDefault();
    e.target.classList.remove('dragged-over');
    const applicationId = e.dataTransfer.getData('text/plain');

    const draggedApplication = applicationList.find(
      app => app._id.toString() === applicationId.toString()
    );

    console.log('draggedApplication:', draggedApplication);
    console.log('Target List:', targetList);
    console.log('Target List ID:', targetList._id);

    if (
      draggedApplication.roleName === targetRole &&
      draggedApplication.listId !== targetList._id
    ) {
      const updatedApplications = applicationList.filter(
        app => app._id.toString() !== applicationId.toString()
      );
      draggedApplication.listId = targetList._id;
      updatedApplications.splice(dropIndex, 0, draggedApplication);

      setApplicationList(updatedApplications);

      updateApplicationListInBackend(applicationId, targetList._id);
    }
  };

  const renderApplications = (role, list) => {
    return (
      <Grid
        container
        spacing={1}
        onDragOver={onDragOver}
        sx={{ flexWrap: 'wrap' }}
      >
        {applicationList &&
          applicationList
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
              <Grid item key={application._id + '-' + index}>
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
                    p: 1,
                    mb: 1,
                    cursor: 'pointer',
                    minWidth: 100,
                    maxWidth: 300,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    style={{ flex: '1' }}
                  >
                    <Grid item>
                      <img
                        src={
                          `https://logo.clearbit.com/${application.domain}` ||
                          ''
                        }
                        alt="box"
                        style={{ maxWidth: 25 }}
                      />
                    </Grid>
                    <Grid item xs style={{ flex: '1', textAlign: 'center' }}>
                      <Typography
                        variant="body2"
                        style={{
                          fontSize: `${Math.max(
                            12,
                            20 -
                              (application.companyName
                                ? application.companyName.length / 2
                                : 0)
                          )}px`,
                        }}
                      >
                        {application.companyName || ''}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
      </Grid>
    );
  };

  const EmptyDropArea = ({ role, list }) => (
    <div
      className="empty-drop-area"
      style={{
        minHeight: '50px',
        marginBottom: '10px',
      }}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={e => onDrop(e, role, list, 0)}
    />
  );

  const uniqueRoles = [
    ...new Set(
      applicationList
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
        <Typography
          variant="subtitle1"
          style={{
            marginBottom: '8px',
            fontWeight: 'bold',
            marginTop: '18px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {list.listName}

          <AddJobButton board={board} list={list} role={role} />
        </Typography>
        {renderApplications(role, list)}
        {applicationList &&
          applicationList.filter(
            application =>
              application.roleName === role && application.listId === list._id
          ).length === 0 && <EmptyDropArea role={role} list={list} />}{' '}
      </div>
    ));
  };

  return (
    <div className="m-[2%] mt-[30px]">
      <div className="flex justify-between items-center">
        <h2
          className={`text-[1.4em] ${
            darkMode ? 'text-white' : 'text-[#678B85]'
          }`}
        >
          {boardName && boardName}
        </h2>
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
          <AddJobButton board={board} list="" role="" fetchBoard={fetchBoard} />
        </div>
      )}
      <div style={{ overflowX: 'auto', marginTop: '60px' }}>
        <div style={{ display: 'flex' }}>
          {uniqueRoles &&
            uniqueRoles.map((role, index) => (
              <div
                key={index}
                style={{ minWidth: 300, maxWidth: 500, marginRight: 150 }}
              >
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '8px',
                  }}
                >
                  {role}
                </Typography>
                <Grid container direction="column">
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
          />
        )}
      </div>
    </div>
  );
}

export default Board;
