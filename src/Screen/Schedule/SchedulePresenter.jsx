import React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import dateF from 'date-and-time';
import ScheduleItem from '../../components/ScheduleItem';

const Schedule = styled.div`
  font-family: 'MaplestoryOTFBold';
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  align-items: center;
`;

const ModeToggleButtonDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-self: flex-end;
  margin-right: 200px;
  position: relative;
  bottom: 30px;
`;

const ToggleButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  width: 50px;
  height: 50px;
  background-color: #2962ff;
  height: 40px;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  border-radius: 25px;
  &:hover {
    background-color: #0039cb;
  }
`;

const ScheduleCreateDiv = styled.div`
  min-width: 700px;
  display: flex;
  justify-content: center;
`;

const ScheduleCreateTitle = styled.div`
  margin-bottom: 15px;
  margin-top: 10px;
  font-size: 19px;
`;

const ScheduleCreateForm = styled.div`
  border: 2px solid #004ecb;
  border-radius: 15px;
  width: 100%;
  padding: 20px;
`;
const DateTimeDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  width: 100px;
  background-color: #2962ff;
  height: 40px;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  border-radius: 4px;
  &:hover {
    background-color: #0039cb;
  }
`;

const ScheduleListDiv = styled.div`
  min-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  bottom: 30px;
`;

const ScheduleListTitle = styled.div`
  font-size: 25px;
`;

const ScheduleListContentsDiv = styled.div`
  display: grid;
  margin-top: 50px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
`;

const SchedulePresenter = ({ onChange, name, time, date, place, onSubmitButtonClick, mode, onModeTogglebuttonClick, scheduleList }) => {
  return (
    <Schedule>
      <ModeToggleButtonDiv>
        {mode === 'create' && (
          <ToggleButton onClick={onModeTogglebuttonClick}>
            <i className="fas fa-list"></i>
          </ToggleButton>
        )}
        {mode === 'list' && (
          <ToggleButton onClick={onModeTogglebuttonClick}>
            <i class="fas fa-plus"></i>
          </ToggleButton>
        )}
      </ModeToggleButtonDiv>
      {mode === 'list' && (
        <ScheduleListDiv>
          <ScheduleListTitle>나의 일정</ScheduleListTitle>
          <ScheduleListContentsDiv>
            {scheduleList.map((s, index) => (
              <ScheduleItem key={index} {...s} />
            ))}
          </ScheduleListContentsDiv>
        </ScheduleListDiv>
      )}
      {mode === 'create' && (
        // create 모드
        <ScheduleCreateDiv>
          <ScheduleCreateForm>
            <ScheduleCreateTitle>새로운 일정 추가</ScheduleCreateTitle>
            <TextField id="name" onChange={onChange} value={name} required label="제목 추가" style={{ width: '100%' }} />
            <DateTimeDiv>
              <TextField
                id="date"
                onChange={onChange}
                style={{ width: '48%', marginTop: 20 }}
                label="Date"
                type="date"
                value={date}
                defaultValue={dateF.format(new Date(), 'YYYY-MM-DD')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="time"
                onChange={onChange}
                style={{ width: '48%', marginTop: 20 }}
                label="Time"
                type="time"
                value={time}
                defaultValue={dateF.format(new Date(), 'HH:MM')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DateTimeDiv>
            <TextField id="place" onChange={onChange} value={place} required label="장소" style={{ width: '100%', marginTop: 5 }} />
            <ButtonDiv>
              <SubmitButton type="submit" onClick={onSubmitButtonClick}>
                추가
              </SubmitButton>
            </ButtonDiv>
          </ScheduleCreateForm>
        </ScheduleCreateDiv>
      )}
    </Schedule>
  );
};

export default SchedulePresenter;
