import axios from 'axios';
import React, { useEffect, useState } from 'react';
import store from '../../store';
import HeaderPresenter from './HeaderPresenter';

const HeaderContainer = () => {
  const [user, setUser] = useState(store.getState().user);
  const sUser = () => setUser(store.getState().user);
  store.subscribe(sUser);

  const onLogoutClick = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, { withCredentials: true })
      .then(() => {
        store.dispatch({ type: 'LOGOUT' });
        window.location.href = 'http://localhost:3000';
      })
      .catch((error) => console.error(error));
  };

  return <HeaderPresenter user={user} onLogoutClick={onLogoutClick} />;
};

export default HeaderContainer;
