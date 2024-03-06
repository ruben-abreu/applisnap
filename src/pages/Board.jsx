import { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import EditApplication from '../components/EditApplication';
import AddJobButton from '../components/AddJobButton';
import { getAllJobs } from '../api/jobs.api';

const ApplicationList = ({ applications }) => {
  const [applicationList, setApplicationList] = useState(applications);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    try {
      const response = await getAllJobs();
      setApplicationList(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
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

  const handleEdit = applicationId => {
    const selectedApp = applicationList.find(app => app.id === applicationId);
    setSelectedApplication(selectedApp);
  };

  const onDrop = (e, targetRole, targetStatus, dropIndex) => {
    e.preventDefault();
    e.target.classList.remove('dragged-over');
    const applicationId = e.dataTransfer.getData('text/plain');
    const draggedApplication = applicationList.find(
      app => app.id.toString() === applicationId.toString()
    );

    if (draggedApplication.role === targetRole) {
      const updatedApplications = applicationList.filter(
        app => app.id.toString() !== applicationId.toString()
      );
      updatedApplications.splice(dropIndex, 0, {
        ...draggedApplication,
        status: targetStatus,
      });
      setApplicationList(updatedApplications);
    }
  };

  const renderApplications = (role, status) => {
    return (
      <Grid
        container
        spacing={1}
        onDragOver={onDragOver}
        sx={{ flexWrap: 'wrap' }}
      >
        {applicationList
          .filter(application => {
            if (status !== undefined) {
              return application.role === role && application.status === status;
            } else {
              return application.role === role;
            }
          })
          .map((application, index) => (
            <Grid item key={application.id + '-' + index}>
              <Paper
                elevation={3}
                draggable
                onDragStart={e => onDragStart(e, application.id)}
                onDragEnd={onDragEnd}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={e => onDrop(e, role, status, index)}
                onClick={() => handleEdit(application.id)}
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
                        `https://logo.clearbit.com/${application.domain}` || ''
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

  const EmptyDropArea = ({ role, status }) => (
    <div
      className='empty-drop-area'
      style={{
        minHeight: '50px',
        marginBottom: '10px',
      }}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={e => onDrop(e, role, status, 0)}
    />
  );

  const uniqueRoles = [...new Set(applicationList.map(app => app.role))];
  const statuses = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'];

  const handleEditClose = () => {
    setSelectedApplication(null);
  };

  const renderStatusesWithAddButton = role =>
    statuses.map(status => (
      <div key={`${role}-${status}`}>
        <Typography
          variant='subtitle1'
          style={{
            marginBottom: '8px',
            fontWeight: 'bold',
            marginTop: '18px',
            display: 'flex',
          }}
        >
          {status}
          <AddJobButton />
        </Typography>
        {renderApplications(role, status)}
        {applicationList.filter(
          application =>
            application.role === role && application.status === status
        ).length === 0 && <EmptyDropArea role={role} status={status} />}
      </div>
    ));

  return (
    <div className='m-[2%]' style={{ overflowX: 'auto', marginTop: '60px' }}>
      <div style={{ display: 'flex' }}>
        {uniqueRoles.map((role, index) => (
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
              {renderStatusesWithAddButton(role)}
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
  );
};

export default ApplicationList;
