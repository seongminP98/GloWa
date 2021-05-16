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

const ModeToggleButton = styled.button`
  width: 200px;
  height: 50px;
  font-size: 17px;
  font-family: 'MaplestoryOTFBold';
  background-color: white;
  border: 2px solid black;
  margin: 20px 0;
  cursor: pointer;
`;

const MainPagePresenter = ({ handleComplete, location, restaurantList, mode, onToggleButtonClick }) => {
  return (
    <MainPage>
      <div>
        <ModeToggleButton
          onClick={onToggleButtonClick}
          style={{
            backgroundColor: mode === 'single' ? '#768fff' : 'white',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
            borderRight: 'none',
          }}
          id="single"
        >
          단순 위치 검색
        </ModeToggleButton>
        <ModeToggleButton
          onClick={onToggleButtonClick}
          style={{ backgroundColor: mode === 'multi' ? '#768fff' : 'white', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}
          id="multi"
        >
          다중 위치 검색
        </ModeToggleButton>
      </div>
      <MainDiv>
        {mode === 'single' && (
          <>
            <Post>
              <Title>주소를 입력해주세요</Title>
              <DaumPostcode style={postCodeStyle} onComplete={handleComplete} />
            </Post>
            <Map location={location} restaurantList={restaurantList} mode={mode} />
          </>
        )}
        {mode === 'multi' && (
          <>
            <Post>
              <Title>주소를 입력해주세요2</Title>
              <DaumPostcode style={postCodeStyle} onComplete={handleComplete} />
            </Post>
            <Map location={location} restaurantList={restaurantList} mode={mode} />
          </>
        )}
      </MainDiv>
    </MainPage>
  );
};

export default MainPagePresenter;
