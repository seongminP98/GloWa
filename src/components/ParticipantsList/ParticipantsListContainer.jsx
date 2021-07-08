import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router-dom';
import ParticipantsListPresenter from './ParticipantsListPresenter';

const ParticipantsListContainer = (props) => {
  const { user_id, user_nickname, reqScheduleDetail, master_id, image } = props;
  const location = useLocation();
  const onMandateButtonClick = () => {
    const answer = window.confirm(`정말로 ${user_nickname}님께 권한을 위임하시겠습니까?`);

    if (answer)
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/schedule/transferSchedule`,
          { schedule_id: location.pathname.slice(-1), friend_id: user_id },
          { withCredentials: true }
        )
        .then((response) => {
          reqScheduleDetail();
          window.alert(response.data.message);
        });
  };

  const onKickButtonClick = () => {
    const answer = window.confirm(`정말로 ${user_nickname}님을 일정에서 제외하시겠습니까?`);
    if (answer)
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/schedule/kick`,
          { schedule_id: location.pathname.slice(-1), target_id: user_id },
          { withCredentials: true }
        )
        .then((response) => {
          reqScheduleDetail();
          window.alert(response.data.message);
        });
  };
  return (
    <ParticipantsListPresenter
      user_id={user_id}
      user_nickname={user_nickname}
      onMandateButtonClick={onMandateButtonClick}
      onKickButtonClick={onKickButtonClick}
      master_id={master_id}
      image={image}
    />
  );
};

export default ParticipantsListContainer;
