import React from 'react';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import Map from '../../components/MapContent';

// 메인 페이지 공간
const MainPage = styled.div`
  min-width: 1000px;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'MaplestoryOTFBold';
`;

// 메인 페이지 타이틀
const Title = styled.div`
  margin: 20px 0px 30px 0px;
  font-size: 25px;
`;

// 우편번호 검색
const postCodeStyle = {
  display: 'block',
  width: '400px',
  height: '600px',
  padding: '7px',
};

const MainDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Post = styled.div`
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainPagePresenter = ({ handleComplete, location, restaurantList }) => {
  return (
    <MainPage>
      <MainDiv>
        <Post>
          <Title>주소를 입력해주세요</Title>
          <DaumPostcode style={postCodeStyle} onComplete={handleComplete} />
        </Post>
        <Map location={location} restaurantList={restaurantList} />
      </MainDiv>
    </MainPage>
  );
};

export default MainPagePresenter;
