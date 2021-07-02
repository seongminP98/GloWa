import React from 'react';
import styled from 'styled-components';
import dateF from 'date-and-time';
import Button from '@material-ui/core/Button';

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

const ParticipantsListDiv = styled.div`
  margin-top: 20px;
`;

const ParticipantsListTitle = styled.div`
  font-size: 23px;
  margin-bottom: 15px;
`;

const ParticipantsList = styled.div``;

const DetailPresenter = (props) => {
  const { createdAt, date, id, my_id, place, schedule_name, updatedAt } = props;

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
        <DetailInfoCreatedAt>{dateF.format(new Date(createdAt), 'YYYY. MM. DD.')}</DetailInfoCreatedAt>
      </DetailInfoDiv>
      <ParticipantsListDiv>
        <ParticipantsListTitle>참여자 목록</ParticipantsListTitle>
        <ParticipantsList>{my_id}</ParticipantsList>
      </ParticipantsListDiv>
    </Detail>
  );
};

export default DetailPresenter;
