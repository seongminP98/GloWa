import React from 'react';
import dateF from 'date-and-time';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ScheduleDetailLink = styled(Link)`
  text-decoration: none;
  color: #000000;
`;

const ScheduleItemPresenter = (props) => {
  const { id, schedule_name, date, place } = props;
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
        <ScheduleDetailLink to={{ pathname: `/schedule/detail/${id}`, state: { ...props } }} size="small">
          Learn More
        </ScheduleDetailLink>
      </CardActions>
    </Card>
  );
};

export default ScheduleItemPresenter;
