import axios from 'axios';
import React, { useEffect, useState } from 'react';
import store from '../../store';
import FriendsListPresenter from './FriendsListPresenter';

const FriendsListContainer = () => {
  const [searchedList, setSearchedList] = useState([]);
  const [mode, setMode] = useState('basic');
  const [friendReqList, setFriendReqList] = useState([]);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    getFriendReq();
    getFriendList();
  }, []);

  const refreshList = () => {
    getFriendReq();
    getFriendList();
  };

  const basicModeToggleButton = (e) => {
    e.preventDefault();
    setMode('basic');
  };

  const friendListModeToggleButton = (e) => {
    e.preventDefault();
    setMode('friendList');
  };

  const getFriendReq = async () => {
    const user = await store.getState().user;
    if (!user) return;
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/friend/req/list`, { id: user.id }, { withCredentials: true })
      .then((response) => setFriendReqList(response.data.result))
      .catch((err) => console.error(err));
  };

  const getFriendList = async () => {
    const user = await store.getState().user;
    if (!user) return;
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/friend/list`, { req_id: user.id }, { withCredentials: true })
      .then((response) => {
        setFriendList(response.data.result);
      })
      .catch((err) => console.error(err));
  };

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    const req_nickname = e.target.req_nickname.value;
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/friend/search`, { req_nickname })
      .then((response) => {
        setSearchedList(response.data.result);
        setMode('search');
      })
      .catch((err) => console.error(err));
  };

  return (
    <FriendsListPresenter
      onSearchSubmit={onSearchSubmit}
      searchedList={searchedList}
      friendList={friendList}
      mode={mode}
      basicModeToggleButton={basicModeToggleButton}
      friendReqList={friendReqList}
      refreshList={refreshList}
    />
  );
};

export default FriendsListContainer;
