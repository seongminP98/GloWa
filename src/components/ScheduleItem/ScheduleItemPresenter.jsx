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
        <Typography variant="h5" component="h2" style={{ fontFamily: 'MaplestoryOTFBold' }}>
          {schedule_name}
        </Typography>
        <Typography color="textSecondary" style={{ fontFamily: 'MaplestoryOTFBold' }}>
          {dateF.format(new Date(date), 'YYYY.MM.DD. HH:MM')}
        </Typography>
        <Typography variant="body2" component="p" style={{ fontFamily: 'MaplestoryOTFBold' }}>
          {place}
        </Typography>
      </CardContent>
      <CardActions style={{ fontFamily: 'MaplestoryOTFBold', marginLeft: 8 }}>
        <ScheduleDetailLink to={{ pathname: `/schedule/detail/${id}`, state: { ...props } }} size="small">
          자세히 보기
        </ScheduleDetailLink>
      </CardActions>
    </Card>
  );
};

export default ScheduleItemPresenter;
