import React from 'react';
import dateF from 'date-and-time';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const ScheduleItemPresenter = ({ schedule_name, date, place }) => {
  return (
    <Card style={{ width: 400 }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {schedule_name}
        </Typography>
        <Typography color="textSecondary">{dateF.format(new Date(date), 'YYYY-MM-DD HH:MM:SS')}</Typography>
        <Typography variant="body2" component="p">
          {place}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default ScheduleItemPresenter;
