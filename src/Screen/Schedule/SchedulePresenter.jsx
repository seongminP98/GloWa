import React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import dateF from 'date-and-time';
import ScheduleItem from '../../components/ScheduleItem';
import { Popover, List, ListSubheader, ListItem, ListItemText, Badge } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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

const ListButtonDiv = styled.div`
  display: flex;
`;

const InviteListDiv = styled.div`
  margin-left: 10px;
  height: 40px;
`;

const ToggleButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  width: 50px;
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
  // Popover를 위한  setting
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const _id = open ? 'simple-popover' : undefined;

  //List를 위한 setting
  const [checked, setChecked] = React.useState(['wifi']);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Schedule>
      <ModeToggleButtonDiv>
        {mode === 'create' && (
          <ToggleButton onClick={onModeTogglebuttonClick}>
            <i className="fas fa-list"></i>
          </ToggleButton>
        )}
        {mode === 'list' && (
          <ListButtonDiv>
            <ToggleButton onClick={onModeTogglebuttonClick}>
              <i className="fas fa-plus"></i>
            </ToggleButton>
            {/* 일정 초대 목록 보여주기 */}
            <InviteListDiv>
              <Badge badgeContent={4} color="error" style={{ height: 40 }}>
                <Button
                  color="primary"
                  style={{ height: '100%', fontSize: 19 }}
                  aria-describedby={_id}
                  variant="contained"
                  onClick={handleClick}
                >
                  <i className="far fa-bell"></i>
                </Button>
              </Badge>
              <Popover
                id={_id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <List
                  style={{ fontFamily: 'MaplestoryOTFBold' }}
                  subheader={<ListSubheader style={{ fontFamily: 'MaplestoryOTFBold' }}>일정 초대 목록</ListSubheader>}
                >
                  <ListItem>
                    <ListItemText primary="Hello"></ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Hello"></ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Hello"></ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Hello"></ListItemText>
                  </ListItem>
                </List>
              </Popover>
            </InviteListDiv>
          </ListButtonDiv>
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
