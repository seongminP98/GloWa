import React, { useEffect, useState } from 'react';
import store from '../../store';
import HeaderPresenter from './HeaderPresenter';

const HeaderContainer = () => {
  const [user, setUser] = useState(store.getState().user);
  const sUser = () => setUser(store.getState().user);
  store.subscribe(sUser);
  return <HeaderPresenter user={user} />;
};

export default HeaderContainer;
