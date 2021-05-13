import React, { useState } from 'react';
import JoinPresenter from './JoinPresenter';

const JoinContainer = () => {
  const [id, setId] = useState();
  const [nickname, setNickname] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();

  const props = { id, nickname, password, passwordCheck };

  const onChange = (e) => {
    e.preventDefault();
    const elementId = e.target.id;
    const { value } = e.target;
    if (elementId === 'id') setId(value);
    else if (elementId === 'password') setPassword(value);
    else if (elementId === 'passwordCheck') setPasswordCheck(value);
    else if (elementId === 'nickname') setNickname(value);
  };

  return <JoinPresenter onChange={onChange} {...props} />;
};

export default JoinContainer;
