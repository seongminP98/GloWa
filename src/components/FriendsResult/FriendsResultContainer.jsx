import axios from 'axios';
import React from 'react';
import FriendsResultPresenter from './FriendsResultPresenter';
import store from '../../store';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

const FriendsResultContainer = ({ id: req_id, nickname, is_req, isDetailScreen }) => {
  const history = useHistory();
  const location = useLocation();

  const onInviteButtonClick = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/schedule/invite`,
        { schedule_id: location.pathname.slice(-1), friend_id: req_id },
        { withCredentials: true }
      )
      .then((response) => window.alert(response.data.message))
      .catch((err) => console.error(err));
  };
  return (
    <FriendsResultPresenter id={req_id} nickname={nickname} isDetailScreen={isDetailScreen} onInviteButtonClick={onInviteButtonClick} />
  );
};

export default FriendsResultContainer;
