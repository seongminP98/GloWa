import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dateF from 'date-and-time';
import SchedulePresenter from './SchedulePresenter';
import store from '../../store';

const ScheduleContainer = () => {
  const [scheduleList, setScheduleList] = useState([]);
  const [place, setPlace] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState(dateF.format(new Date(), 'YYYY-MM-DD'));
  const [time, setTime] = useState(dateF.format(new Date(), 'HH:MM'));
  const [mode, setMode] = useState('list');
  const [isValidationChecked, setIsValidationChecked] = useState(false);
  const user = store.getState().user;

  const onChange = (e) => {
    const value = e.target.value;
    const elemntId = e.target.id;
    setIsValidationChecked(false); // form 검사 이후에 다시 value를 변경하였을 때 다시 검사를 해야하므로 false로 변경
    if (elemntId === 'name') setName(value);
    else if (elemntId === 'date') setDate(value);
    else if (elemntId === 'time') setTime(value);
    else setPlace(value);
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
    // 일정 추가 form 검사 함수 (제목 및 장소 입력 확인)
    if (name === '') return window.alert('일정 제목을 입력해주세요');
    if (place === '') return window.alert('장소를 입력해주세요');
    setIsValidationChecked(true);
    return isValidationChecked;
  };

  const reqCreateSchedule = () => {
    if (!isValidationChecked) return;
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/schedule/makeSchedule`,
        { name, place, date: `${date + ' ' + time}` },
        { withCredentials: true }
      )
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const onSubmitButtonClick = async (e) => {
    if (checkValidation()) reqCreateSchedule();
  };

  useEffect(() => {
    getScheduleList();
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
    />
  );
};

export default ScheduleContainer;
