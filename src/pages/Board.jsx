import { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';

function Board({ applications }) {
  const [applicationList, setApplicationList] = useState(applications);

  useEffect(() => {
    setApplicationList(applications);
  }, [applications]);

  const onDragStart = (evt, applicationId) => {
    evt.dataTransfer.setData('text/plain', applicationId);
    evt.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = evt => {
    evt.target.classList.remove('dragged');
  };

  const onDragEnter = evt => {
    evt.preventDefault();
    evt.target.classList.add('dragged-over');
  };

  const onDragLeave = evt => {
    evt.target.classList.remove('dragged-over');
  };

  const onDragOver = evt => {
    evt.preventDefault();
  };

  const onDrop = (evt, status) => {
    evt.preventDefault();
    evt.target.classList.remove('dragged-over');
    const applicationId = evt.dataTransfer.getData('text/plain');
    const updatedApplications = applicationList.map(application => {
      if (application.id.toString() === applicationId.toString()) {
        return { ...application, status: status };
      }
      return application;
    });
    setApplicationList(updatedApplications);
  };

  const renderApplications = applications => {
    return applications.map((application, index) => (
      <Paper
        key={application.id.toString() + '-' + index}
        elevation={3}
        draggable
        onDragStart={e => onDragStart(e, application.id)}
        onDragEnd={onDragEnd}
        sx={{ p: 1, mb: 1, cursor: 'move' }}
      >
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <img src={application.image} alt="box" style={{ maxWidth: 35 }} />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body2">{application.companyName}</Typography>
            <Typography variant="body2">{application.role}</Typography>
            <Typography variant="body2" sx={{ textAlign: 'right' }}>
              {application.date}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    ));
  };

  const EmptyDropArea = () => (
    <div
      className="empty-drop-area"
      style={{ width: 250, height: 100, border: '2px dashed #ccc' }}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={e => onDrop(e, 'Placeholder')}
    />
  );

  return (
    <div className="m-[2%] flex justify-between items-center">
      <Grid container spacing={1}>
        <Grid item xs={2.3}>
          <div
            className="drop-area"
            onDragLeave={onDragLeave}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDrop={e => onDrop(e, 'Wishlist')}
          >
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h6">Wishlist</Typography>
              </Grid>
              {applicationList.filter(
                application => application.status === 'Wishlist'
              ).length === 0 && <EmptyDropArea />}
              <Grid item>
                {renderApplications(
                  applicationList.filter(
                    application => application.status === 'Wishlist'
                  )
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>

        <Grid item xs={2.3}>
          <div
            className="drop-area"
            onDragLeave={onDragLeave}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDrop={e => onDrop(e, 'Applied')}
          >
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h6">Applied</Typography>
              </Grid>
              {applicationList.filter(
                application => application.status === 'Applied'
              ).length === 0 && <EmptyDropArea />}
              <Grid item>
                {renderApplications(
                  applicationList.filter(
                    application => application.status === 'Applied'
                  )
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>

        <Grid item xs={2.3}>
          <div
            className="drop-area"
            onDragLeave={onDragLeave}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDrop={e => onDrop(e, 'Interview')}
          >
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h6">Interview</Typography>
              </Grid>
              {applicationList.filter(
                application => application.status === 'Interview'
              ).length === 0 && <EmptyDropArea />}
              <Grid item>
                {renderApplications(
                  applicationList.filter(
                    application => application.status === 'Interview'
                  )
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>

        <Grid item xs={2.3}>
          <div
            className="drop-area"
            onDragLeave={onDragLeave}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDrop={e => onDrop(e, 'Offer')}
          >
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h6">Offer</Typography>
              </Grid>
              {applicationList.filter(
                application => application.status === 'Offer'
              ).length === 0 && <EmptyDropArea />}
              <Grid item>
                {renderApplications(
                  applicationList.filter(
                    application => application.status === 'Offer'
                  )
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>

        <Grid item xs={2.3}>
          <div
            className="drop-area"
            onDragLeave={onDragLeave}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDrop={e => onDrop(e, 'Rejected')}
          >
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h6">Rejected</Typography>
              </Grid>
              {applicationList.filter(
                application => application.status === 'Rejected'
              ).length === 0 && <EmptyDropArea />}
              <Grid item>
                {renderApplications(
                  applicationList.filter(
                    application => application.status === 'Rejected'
                  )
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Board;
