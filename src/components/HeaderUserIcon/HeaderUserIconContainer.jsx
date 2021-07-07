import axios from 'axios';
import React, { useEffect } from 'react';
import HeaderUserIconPresenter from './HeaderUserIconPresenter';
import store from '../../store';

const HeaderUserIconContainer = (props) => {
  const { user } = props;
  console.log(user);
  const onChange = (e) => {
    const formData = new FormData();
    formData.append('img', e.target.files[0]);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/mypage/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })
      .then((response) => {
        store.dispatch({ type: 'USER_UPDATED', user: { ...user, img: response.data.result } });
      });
  };
  const onImgChangeButtonClick = async () => {
    const realInput = document.querySelector('#real-input');
    realInput.click();
  };
  return <HeaderUserIconPresenter {...props} onImgChangeButtonClick={onImgChangeButtonClick} onChange={onChange} />;
};

export default HeaderUserIconContainer;
