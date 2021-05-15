import axios from 'axios';
import React, { useState } from 'react';
import LoginPresenter from './LoginPresenter';

const LoginContainer = () => {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const props = { id, password };

  const onChange = (e) => {
    const elementId = e.target.id;
    const { value } = e.target;
    if (elementId === 'id') setId(value);
    else if (elementId === 'password') setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, { id, password }).then((response) => console.log(response.data));
  };

  return <LoginPresenter onChange={onChange} {...props} onSubmit={onSubmit} />;
};

export default LoginContainer;
