import React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import date from 'date-and-time';
import Map from '../../components/MapContent';

const Schedule = styled.div`
  font-family: 'MaplestoryOTFBold';
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  align-items: center;
`;

const ScheduleCreateTitle = styled.div`
  margin-bottom: 15px;
  margin-top: 10px;
  font-size: 19px;
`;

const ScheduleCreateDiv = styled.div`
  min-width: 700px;
  display: flex;
  justify-content: center;
`;

const ScheduleCreateForm = styled.div`
  border: 2px solid #004ecb;
  border-radius: 15px;
  padding: 20px;
`;
const SearchMapDiv = styled.div`
  display: flex;
  align-items: center;
`;
const postCodeStyle = {
  display: 'block',
  width: '400px',
  height: '500px',
  padding: '7px',
  margin: '10px',
};

const SchedulePresenter = ({ handleComplete, location, center }) => {
  return (
    <Schedule>
      <ScheduleCreateDiv>
        <ScheduleCreateForm>
          <ScheduleCreateTitle>새로운 일정 추가</ScheduleCreateTitle>
          <TextField required label="제목 추가" style={{ width: '100%' }} />
          <TextField
            style={{ width: '100%', marginTop: 20 }}
            id="date"
            label="Date"
            type="date"
            defaultValue={date.format(new Date(), 'YYYY-MM-DD')}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <SearchMapDiv>
            <DaumPostcode style={postCodeStyle} onComplete={handleComplete} />
            <Map location={location} center={center} mode="multi" size="small" />
          </SearchMapDiv>
        </ScheduleCreateForm>
      </ScheduleCreateDiv>
    </Schedule>
  );
};

export default SchedulePresenter;
