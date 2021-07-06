import axios from 'axios';
import React, { useEffect, useState } from 'react';
import dateF from 'date-and-time';
import SchedulePresenter from './SchedulePresenter';
import { useHistory } from 'react-router-dom';

const ScheduleContainer = () => {
  const [scheduleList, setScheduleList] = useState([]);
  const [scheduleInviteList, setScheduleInviteList] = useState([]);
  const [place, setPlace] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState(dateF.format(new Date(), 'YYYY-MM-DD'));
  const [time, setTime] = useState(dateF.format(new Date(), 'HH:mm'));
  const [mode, setMode] = useState('list');
  const [isValidationChecked, setIsValidationChecked] = useState(false);
  const history = useHistory();

  const onChange = (e) => {
    const value = e.target.value;
    const elemntId = e.target.id;
    setIsValidationChecked(false); // form 검사 이후에 다시 value를 변경하였을 때 다시 검사를 해야하므로 false로 변경
    if (elemntId === 'name') setName(value);
    else if (elemntId === 'date') setDate(value);
    else if (elemntId === 'time') setTime(value);
    else setPlace(value);
    checkValidation();
  };

  const onModeTogglebuttonClick = () => {
    if (mode === 'list') setMode('create');
    else if (mode === 'create') setMode('list');
  };

  const getScheduleList = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/schedule/list`, { withCredentials: true })
      .then((response) => setScheduleList(response.data.result))
      .catch((err) => console.error(err));
  };

  const checkValidation = () => {
    if (name !== '' && place !== '') setIsValidationChecked(true);
  };

  const reqCreateSchedule = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/schedule/makeSchedule`,
        { name, place, date: `${date + ' ' + time}` },
        { withCredentials: true }
      )
      .then((response) => {
        window.alert('일정이 추가되었습니다!');
        getScheduleList();
        setMode('list');
      })
      .catch((err) => console.error(err));
  };

  const onSubmitButtonClick = async (e) => {
    if (isValidationChecked) reqCreateSchedule();
    else {
      if (name === '') return window.alert('일정 제목을 입력해주세요');
      if (place === '') return window.alert('장소를 입력해주세요');
    }
  };

  const getInviteList = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/schedule/invite/list`, { withCredentials: true })
      .then((response) => setScheduleInviteList(response.data.result ? response.data.result : []))
      .catch((err) => console.error(err)); //Error처리 변경 필요
  };

  const onInvAcceptButtonClick = (schedule_id, friend_id) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/schedule/accept`, { schedule_id, friend_id }, { withCredentials: true })
      .then(() => {
        getScheduleList();
        getInviteList();
        window.alert('일정에 참가되었습니다');
      })
      .catch((err) => console.error(err));
  };

  const onInvRejectButtonClick = (schedule_id, friend_id) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/schedule/reject`, { schedule_id, friend_id }, { withCredentials: true })
      .then((response) => {
        getScheduleList();
        getInviteList();
        window.alert('일정 초대를 거절하였습니다');
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getScheduleList();
    getInviteList();
  }, []);

  return (
    <SchedulePresenter
      onChange={onChange}
      mode={mode}
      name={name}
      time={time}
      place={place}
      date={date}
      onSubmitButtonClick={onSubmitButtonClick}
      onModeTogglebuttonClick={onModeTogglebuttonClick}
      scheduleList={scheduleList}
      scheduleInviteList={scheduleInviteList}
      onInvAcceptButtonClick={onInvAcceptButtonClick}
      onInvRejectButtonClick={onInvRejectButtonClick}
    />
  );
};

export default ScheduleContainer;
