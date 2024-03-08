import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getAllJobs } from '../api/jobs.api';
import { getBoard } from '../api/boards.api';
import { ThemeContext } from '../context/theme.context';
import { Grid, Paper, Typography } from '@mui/material';
import EditApplication from '../components/EditApplication';
import AddJobButton from '../components/AddJobButton';
import AddBoardButton from '../components/AddBoardButton';
import { getAllLists, updateApplicationListInBackend } from '../api/lists.api';

import { AuthContext } from '../context/auth.context';

const ApplicationList = ({ applications }) => {
  const [applicationList, setApplicationList] = useState(applications);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [boardName, setBoardName] = useState('');
  const [lists, setLists] = useState([]);

  const { boardId } = useParams();
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        if (user && user._id) {
          await fetchBoard();
          await fetchAllJobs();
          await fetchLists();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllData();
  }, [user]);

  const fetchAllJobs = async () => {
    try {
      const response = await getAllJobs();
      setApplicationList(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchBoard = async () => {
    try {
      const currentBoard = await getBoard(boardId);
      setBoardName(currentBoard.boardName);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const fetchLists = async () => {
    try {
      const response = await getAllLists(user._id);
      const filteredLists = response.data.filter(
        list => list.userId === user._id
      );
      console.log('Filtered Lists:', filteredLists);
      setLists(filteredLists);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  useEffect(() => {
    console.log('Application List:', applicationList);
  }, [applicationList]);

  useEffect(() => {
    console.log('Selected Application:', selectedApplication);
  }, [selectedApplication]);

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

    console.log('Target List:', targetList);
    console.log('Target List ID:', targetList._id);

    if (
      draggedApplication.role === targetRole &&
      draggedApplication.list !== targetList.listName
    ) {
      const updatedApplications = applicationList.filter(
        app => app._id.toString() !== applicationId.toString()
      );
      draggedApplication.list = targetList.listName;
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
                return application.role === role && application.list === list;
              } else {
                return application.role === role;
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
                    alignItems='center'
                    spacing={1}
                    style={{ flex: '1' }}
                  >
                    <Grid item>
                      <img
                        src={
                          `https://logo.clearbit.com/${application.domain}` ||
                          ''
                        }
                        alt='box'
                        style={{ maxWidth: 25 }}
                      />
                    </Grid>
                    <Grid item xs style={{ flex: '1', textAlign: 'center' }}>
                      <Typography
                        variant='body2'
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
      className='empty-drop-area'
      style={{
        minHeight: '50px',
        marginBottom: '10px',
      }}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={e => onDrop(e, role, list, 0)}
    />
  );

  const uniqueRoles = [...new Set(applicationList.map(app => app.role))];

  const handleEditClose = () => {
    setSelectedApplication(null);
  };

  const renderListsForRole = role => {
    return lists.map(list => (
      <div key={`${role}-${list.listName}`}>
        <Typography
          variant='subtitle1'
          style={{
            marginBottom: '8px',
            fontWeight: 'bold',
            marginTop: '18px',
            display: 'flex',
          }}
        >
          {list.listName}
          <AddJobButton />
        </Typography>
        {renderApplications(role, list)}
        {applicationList.filter(
          application =>
            application.role === role && application.list === list.listName
        ).length === 0 && <EmptyDropArea role={role} list={list} />}{' '}
      </div>
    ));
  };

  return (
    <div className='m-[2%] mt-[30px]'>
      <div className='flex justify-between items-center'>
        <h2
          className={`text-[1.4em] ${
            darkMode ? 'text-white' : 'text-[#677f8b]'
          }`}
        >
          {boardName && boardName}
        </h2>
        <AddBoardButton />
      </div>
      <div style={{ overflowX: 'auto', marginTop: '60px' }}>
        <div style={{ display: 'flex' }}>
          {uniqueRoles &&
            uniqueRoles.map((role, index) => (
              <div
                key={index}
                style={{ minWidth: 300, maxWidth: 500, marginRight: 150 }}
              >
                <Typography
                  variant='h5'
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '8px',
                  }}
                >
                  {role}
                </Typography>
                <Grid container direction='column'>
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
          />
        )}
        {/* temporary to see apps  */}
        {renderApplications(undefined, undefined)}
      </div>
    </div>
  );
};

export default ApplicationList;
