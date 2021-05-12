import React from 'react';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import Map from '../MapContent';

// 메인 페이지 공간
const MainPage = styled.div`
  min-width: 1000px;
  height: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'MaplestoryOTFBold';
`;

// 메인 페이지 타이틀
const Title = styled.div`
  margin: 20px 0px;
  font-size: 25px;
`;

// 우편번호 검색
const postCodeStyle = {
  display: 'block',
  top: '50%',
  width: '400px',
  height: '600px',
  padding: '7px',
};

const MainPagePresenter = ({ handleComplete, location }) => {
  return (
    <MainPage>
      <Title>주소를 입력해주세요</Title>
      <span>
        <DaumPostcode style={postCodeStyle} onComplete={handleComplete} />
      </span>
      <Map location={location} />
    </MainPage>
  );
};

export default MainPagePresenter;
