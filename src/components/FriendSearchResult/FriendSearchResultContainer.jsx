import axios from 'axios';
import React from 'react';
import FriendSearchResultPresenter from './FriendSearchResultPresenter';
import store from '../../store';
import { useHistory } from 'react-router';

const FriendSearchResultContainer = ({ id: req_id, nickname, is_req }) => {
  const history = useHistory();

  const onAcceptButtonClick = async (e) => {
    e.preventDefault();
    const user = await store.getState().user;
    if (!user) return;
    const req_id = e.target.parentNode.req_id.value;
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/friend/accept`, { id: user.id, req_id })
      .then(() => console.log('정상적으로 친구 추가되었습니다!'))
      .catch((err) => window.alert('에러가 발생했습니다 !'));
  };

  const FriendAddbuttonClick = async (e) => {
    const user = await store.getState().user;
    if (!user) {
      window.alert('로그인을 해주세요!');
      return history.push({ pathname: '/login' });
    }
    if (user.id === req_id) return window.alert('자기 자신에게는 친구 요청을 할 수 없습니다.');
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/friend/add`, { id: user.id, req_id })
      .then((response) => window.alert(response.data.message))
      .catch((err) => console.error(err.response));
  };

  return (
    <FriendSearchResultPresenter
      id={req_id}
      nickname={nickname}
      FriendAddbuttonClick={FriendAddbuttonClick}
      is_req={is_req}
      onAcceptButtonClick={onAcceptButtonClick}
    />
  );
};

export default FriendSearchResultContainer;
