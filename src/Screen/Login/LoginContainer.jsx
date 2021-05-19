import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import store from '../../store';
import LoginPresenter from './LoginPresenter';

const LoginContainer = () => {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const props = { id, password };
  const history = useHistory();

  const onChange = (e) => {
    const elementId = e.target.id;
    const { value } = e.target;
    if (elementId === 'id') setId(value);
    else if (elementId === 'password') setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, { id, password }).then((response) => {
      store.dispatch({ type: 'LOGIN', user: response.data.data });
      history.push({ pathname: '/' });
    });
  };

  return <LoginPresenter onChange={onChange} {...props} onSubmit={onSubmit} />;
};

export default LoginContainer;
