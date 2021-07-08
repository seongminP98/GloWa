import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import store from '../../store';
import JoinPresenter from './JoinPresenter';

const JoinContainer = () => {
  const [id, setId] = useState();
  const [nickname, setNickname] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const history = useHistory();
  const user = store.getState().user;
  if (user) history.push({ pathname: '/' });

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
    await isIdAvailable();

    //nickname 중복확인
    await isNicknameAvailable();

    //회원가입 요청
    await requestJoin();
  };

  const isPasswordSame = () => {
    return password === passwordCheck;
  };

  const isIdAvailable = async () => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/join/id`, { id })
      .then((response) => {
        // 정상
        if (response.data.code === 200) return 1;
      })
      .catch((err) => {
        // 중복
        if (err.response.data.code === 400) return window.alert('이미 사용중인 아이디입니다.');
        //오류
        else return window.alert('오류가 발생하였습니다.');
      });
  };

  const isNicknameAvailable = async () => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/join/nick`, { nickname })
      .then((response) => {
        // 정상
        if (response.data.code === 200) return 1;
      })
      .catch((err) => {
        // 중복
        if (err.response.data.code === 400) return window.alert('이미 사용중인 닉네임입니다.');
        //오류
        else return window.alert('오류가 발생하였습니다.');
      });
  };

  const requestJoin = async () => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/join`, { user_id: id, password, nickname })
      .then(async (response) => {
        await store.dispatch({ type: 'LOGIN', user: response.data.dataValues });
        window.alert('정상적으로 회원가입 되었습니다!');
        history.push({ pathname: '/' });
      })
      .catch((err) => window.alert('에러가 발생하였습니다!'));
  };

  return <JoinPresenter onChange={onChange} onSubmit={onSubmit} {...props} />;
};

export default JoinContainer;
