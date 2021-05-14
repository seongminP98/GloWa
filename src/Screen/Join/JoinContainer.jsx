import axios from 'axios';
import React, { useState } from 'react';
import JoinPresenter from './JoinPresenter';

const JoinContainer = () => {
  const [id, setId] = useState();
  const [nickname, setNickname] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();

  const props = { id, nickname, password, passwordCheck };

  const onChange = (e) => {
    const elementId = e.target.id;
    const { value } = e.target;
    if (elementId === 'id') setId(value);
    else if (elementId === 'password') setPassword(value);
    else if (elementId === 'passwordCheck') setPasswordCheck(value);
    else if (elementId === 'nickname') setNickname(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    //비밀번호 일치 여부 확인
    if (!isPasswordSame()) return window.alert('비밀번호가 서로 같지 않습니다.');

    //id 중복확인
    const idCheckResult = await isIdAvailable();
    if (idCheckResult === 2) return window.alert('이미 사용중인 아이디입니다.');
    if (idCheckResult === 3) return window.alert('오류가 발생하였습니다.');

    //nickname 중복확인
    const nicknameCheckResult = await isNicknameAvailable();
    if (nicknameCheckResult === 2) return window.alert('이미 사용중인 아이디입니다.');
    if (nicknameCheckResult === 3) return window.alert('오류가 발생하였습니다.');

    //회원가입 요청
    await requestJoin();
  };

  const isPasswordSame = () => {
    return password === passwordCheck;
  };

  const isIdAvailable = async () => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/join/id`, { id }).then((response) => {
      // 정상
      if (response.data.code === '200') return 1;
      // 중복
      else if (response.data.code === '400') return 2;
      //오류
      else return 3;
    });
  };

  const isNicknameAvailable = async () => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/join/nick`, { nickname }).then((response) => {
      // 정상
      if (response.data.code === '200') return 1;
      // 중복
      else if (response.data.code === '400') return 2;
      //오류
      else return 3;
    });
  };

  const requestJoin = async () => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/join/id`, { id, password, nickname });
  };

  return <JoinPresenter onChange={onChange} onSubmit={onSubmit} {...props} />;
};

export default JoinContainer;
