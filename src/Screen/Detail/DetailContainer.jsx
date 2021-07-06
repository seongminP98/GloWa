import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import DetailPresenter from './DetailPresenter';
import dateF from 'date-and-time';
import store from '../../store';

const DetailContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const [props, setProps] = useState();
  const [loading, setLoading] = useState(true);
  const reqScheduleDetail = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/schedule/${location.pathname.slice(-1)}`, { withCredentials: true })
      .then(async (response) => {
        console.log(response);
        setProps(response.data.result);
        setEditedName(response.data.result.schedule_name);
        setEditedDate(dateF.format(new Date(response.data.result.date), 'YYYY-MM-DD'));
        setEditedTime(dateF.format(new Date(response.data.result.date), 'HH:mm'));
        setEditedPlace(response.data.result.place);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => reqScheduleDetail(), []);
  const user = store.getState().user;
  const [mode, setMode] = useState('normal');
  const [isValidationChecked, setIsValidationChecked] = useState(true);
  const [editedName, setEditedName] = useState();
  const [editedDate, setEditedDate] = useState();
  const [editedTime, setEditedTime] = useState();
  const [editedPlace, setEditedPlace] = useState();

  const checkValidation = () => {
    // 일정 추가 form 검사 함수 (제목 및 장소 입력 확인)
    if (editedName === '') return window.alert('일정 제목을 입력해주세요');
    if (editedPlace === '') return window.alert('장소를 입력해주세요');
    setIsValidationChecked(true);
    return isValidationChecked;
  };

  const onChange = (e) => {
    const value = e.target.value;
    const elementId = e.target.id;
    setIsValidationChecked(false); // form 검사 이후에 다시 value를 변경하였을 때 다시 검사를 해야하므로 false로 변경
    if (elementId === 'name') setEditedName(value);
    else if (elementId === 'date') setEditedDate(value);
    else if (elementId === 'time') setEditedTime(value);
    else setEditedPlace(value);
    checkValidation();
  };

  const onModeToggleButtonClick = () => {
    if (mode === 'normal') setMode('edit');
    else {
      if (confirmToLeave()) {
        setMode('normal');
        setEditedName(props?.schedule_name);
        setEditedDate(dateF.format(new Date(props?.date), 'YYYY-MM-DD'));
        setEditedTime(dateF.format(new Date(props?.date), 'HH:MM'));
        setEditedPlace(props?.place);
      }
    }
  };

  const onDeleteButtonClick = (e) => {
    const answer = window.confirm('정말로 삭제하시겠습니까?');
    if (answer) {
      axios
        .delete(`${process.env.REACT_APP_SERVER_URL}/schedule/delete/${props?.id}`, { withCredentials: true })
        .then((response) => {
          window.alert('정상적으로 삭제되었습니다!');
          history.push({ pathname: '/schedule' });
        })
        .catch((err) => console.error(err));
    }
  };

  const confirmToLeave = () => {
    if (
      editedName !== props?.schedule_name ||
      editedDate !== dateF.format(new Date(props?.date), 'YYYY-MM-DD') ||
      editedTime !== dateF.format(new Date(props?.date), 'HH:MM') ||
      editedPlace !== props?.place
    ) {
      return window.confirm(`변경하신 내용중에 저장되지 않은 내용이 있습니다.\n정말로 나가시겠습니까?`);
    }
  };

  const reqModifySchedule = () => {
    if (!isValidationChecked) return;
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/schedule/modify`,
        { schedule_id: props?.id, name: editedName, place: editedPlace, date: `${editedDate + ' ' + editedTime}` },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.message === '일정 수정이 완료되었습니다.') {
          setProps({ ...props, schedule_name: editedName, place: editedPlace, date: new Date(`${editedDate + ' ' + editedTime}:00`) });
          setMode('normal');
          setIsValidationChecked(false);
          window.alert('성공적으로 수정되었습니다.');
        }
      })
      .catch((err) => console.error(err));
  };

  const onSubmitButtonClick = () => {
    if (isValidationChecked) reqModifySchedule();
  };

  const onExitButtonClick = () => {
    const answer = window.confirm('정말로 일정에서 나가시겠습니까? ');
    if (answer)
      axios
        .delete(`${process.env.REACT_APP_SERVER_URL}/schedule/exit/${location.pathname.slice(-1)}`, { withCredentials: true })
        .then((response) => {
          window.alert(response.data.message);
          history.push({ pathname: '/schedule' });
        })
        .catch((err) => console.error(err));
  };

  return (
    <DetailPresenter
      {...props}
      onDeleteButtonClick={onDeleteButtonClick}
      onModeToggleButtonClick={onModeToggleButtonClick}
      mode={mode}
      editedName={editedName}
      editedDate={editedDate}
      editedTime={editedTime}
      editedPlace={editedPlace}
      onChange={onChange}
      onSubmitButtonClick={onSubmitButtonClick}
      loading={loading}
      reqScheduleDetail={reqScheduleDetail}
      user={user}
      onExitButtonClick={onExitButtonClick}
    />
  );
};

export default DetailContainer;
