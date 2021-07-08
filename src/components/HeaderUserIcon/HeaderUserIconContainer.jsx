import axios from 'axios';
import React, { useEffect } from 'react';
import HeaderUserIconPresenter from './HeaderUserIconPresenter';
import store from '../../store';

const HeaderUserIconContainer = (props) => {
  return <HeaderUserIconPresenter {...props} />;
};

export default HeaderUserIconContainer;
