import React from 'react';
import styled from 'styled-components';
import dateF from 'date-and-time';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

const Detail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'MaplestoryOTFBold';
`;

const DetailInfoDiv = styled.div`
  margin-top: 50px;
  box-sizing: border-box;
  border: 1px solid black;
  width: 100%;
  padding: 50px 40px;
`;

const DetailInfoTitle = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
`;

const DetailInfoDate = styled.div`
  font-size: 17px;
  margin-bottom: 8px;
`;

const DetailInfoPlace = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const DetailInfoCreatedAt = styled.div`
  font-size: 13px;
  opacity: 0.4;
  text-align: end;
`;

const ButtonDiv = styled.div`
  margin-top: 13px;
  display: flex;
  justify-content: flex-end;
`;

const ModeToggleToEditButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  width: 80px;
  background-color: #2962ff;
  height: 35px;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  border-radius: 4px;
  &:hover {
    background-color: #0039cb;
  }
`;

const ModeToggleToNormalButton = styled.button`
  border: 1px solid black;
  cursor: pointer;
  outline: none;
  width: 80px;
  background-color: #000000;
  height: 35px;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  border-radius: 4px;
  &:hover {
    background-color: #555555;
  }
`;

const DeleteButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  width: 80px;
  background-color: #dd0000;
  height: 35px;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  border-radius: 4px;
  margin-left: 10px;
  &:hover {
    background-color: red;
  }
`;

const DateTimeDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SaveButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  width: 80px;
  background-color: #2962ff;
  height: 35px;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  border-radius: 4px;
  margin-left: 10px;
  &:hover {
    background-color: #0039cb;
  }
`;

const ParticipantsListTitle = styled.div`
  margin-top: 30px;
  font-size: 23px;
`;

const ParticipantsListDiv = styled.div`
  margin-top: 15px;
  display: flex;
  margin-bottom: 20px;
`;

const ParticipantsList = styled.div`
  margin-left: 5px;
  margin-right: 10px;
`;

const ParticipantsListItemDiv = styled.div`
  display: flex;
  align-items: center;
`;

const DetailPresenter = (props) => {
  const { createdAt, date, id, my_id, place, schedule_name, updatedAt, members, master_nickname } = props;
  const {
    onDeleteButtonClick,
    onModeToggleButtonClick,
    mode,
    editedName,
    editedDate,
    editedTime,
    editedPlace,
    onChange,
    onSubmitButtonClick,
  } = props;

  const switchDateEngToKor = () => {
    // 요일 표기 변경 함수 (영어 -> 한글)
    const d = dateF.format(new Date(date), 'ddd');
    switch (d) {
      case 'Mon':
        return '월요일';
      case 'Tue':
        return '화요일';
      case 'Wed':
        return '수요일';
      case 'Thu':
        return '목요일';
      case 'Fri':
        return '금요일';
      case 'Sat':
        return '토요일';
      case 'Sun':
        return '일요일';
      default:
        break;
    }
  };

  return (
    <Detail>
      {mode === 'normal' && (
        <DetailInfoDiv>
          <DetailInfoTitle>{schedule_name}</DetailInfoTitle>
          <DetailInfoDate>
            <i class="far fa-calendar-alt" style={{ marginRight: 7 }}></i>
            {dateF.format(new Date(date), `YYYY. MM. DD. ${switchDateEngToKor()} HH:MM`)}
          </DetailInfoDate>
          <DetailInfoPlace>
            <i className="fas fa-map-marker-alt" style={{ marginRight: 7 }}></i>
            {place}
          </DetailInfoPlace>
          <Button
            variant="outlined"
            color="primary"
            href={`https://map.naver.com/v5/search/${place}`}
            target="_blank"
            style={{
              color: '#000000',
              fontFamily: 'MaplestoryOTFBold',
            }}
          >
            <i className="fas fa-map-marked-alt" style={{ marginRight: 5 }}></i> 지도에서 검색하기
          </Button>
          <ParticipantsListTitle>참여자 목록</ParticipantsListTitle>
          <ParticipantsListDiv>
            {members.map((m, index) => (
              <ParticipantsListItemDiv>
                <Avatar style={{ height: 30, width: 30 }}>{m.nickname.slice(0, 1).toUpperCase()}</Avatar>
                <ParticipantsList key={index}>{m.nickname}</ParticipantsList>
              </ParticipantsListItemDiv>
            ))}
            {members.map((m, index) => (
              <ParticipantsListItemDiv>
                <Avatar style={{ height: 30, width: 30 }}>{m.nickname.slice(0, 1).toUpperCase()}</Avatar>
                <ParticipantsList key={index}>{m.nickname}</ParticipantsList>
              </ParticipantsListItemDiv>
            ))}
          </ParticipantsListDiv>
          <DetailInfoCreatedAt>{dateF.format(new Date(createdAt), 'YYYY. MM. DD.')}</DetailInfoCreatedAt>
          <ButtonDiv>
            <ModeToggleToEditButton onClick={onModeToggleButtonClick}>수정</ModeToggleToEditButton>
            <DeleteButton onClick={onDeleteButtonClick}>삭제</DeleteButton>
          </ButtonDiv>
        </DetailInfoDiv>
      )}
      {mode === 'edit' && (
        <DetailInfoDiv>
          <TextField
            id="name"
            onChange={onChange}
            defaultValue={schedule_name}
            value={editedName}
            required
            label="제목 추가"
            style={{ width: '100%' }}
          />
          <DateTimeDiv>
            <TextField
              onChange={onChange}
              id="date"
              style={{ width: '48%', marginTop: 20 }}
              label="Date"
              type="date"
              value={editedDate}
              defaultValue={dateF.format(new Date(date), 'YYYY-MM-DD')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="time"
              onChange={onChange}
              style={{ width: '48%', marginTop: 20 }}
              label="Time"
              value={editedTime}
              type="time"
              defaultValue={dateF.format(new Date(date), 'HH:MM')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DateTimeDiv>
          <TextField
            id="place"
            onChange={onChange}
            defaultValue={place}
            value={editedPlace}
            required
            label="장소"
            style={{ width: '100%', marginTop: 5 }}
          />
          <ButtonDiv>
            <ModeToggleToNormalButton onClick={onModeToggleButtonClick}>취소</ModeToggleToNormalButton>
            <SaveButton onClick={onSubmitButtonClick}>저장</SaveButton>
          </ButtonDiv>
        </DetailInfoDiv>
      )}
    </Detail>
  );
};

export default DetailPresenter;
