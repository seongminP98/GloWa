import React from 'react';
import styled from 'styled-components';
import FriendSearchResult from '../FriendSearchResult';

const FriendsListPresenter = ({ onSearchSubmit, searchedList, mode, modeToggleButton, friendReqList }) => {
  const FriendsListMainDiv = styled.div`
    padding: 10px;
    width: 300px;
    border: 1px solid black;
    height: 685px;
    box-sizing: border-box;
  `;

  const FriendsListTitle = styled.div`
    font-size: 19px;
    padding: 10px;
    font-family: 'MaplestoryOTFBold';
    margin-bottom: 10px;
  `;

  const SearchFriendsForm = styled.form`
    display: flex;
    align-items: center;
  `;
  const SearchFriendsInput = styled.input`
    height: 25px;
    border: none;
    border-bottom: 1px solid black;
    width: 180px;
  `;
  const SearchFriendsButton = styled.button`
    height: 28px;
    border: none;
    cursor: pointer;
    background-color: #ffffff;
  `;
  const SearchCancelButton = styled.button`
    height: 28px;
    border: none;
    cursor: pointer;
    background-color: #ffffff;
  `;

  const ButtonDiv = styled.div`
    display: flex;
    width: 120px;
    justify-content: space-around;
  `;

  const EmptyList = styled.div`
    margin-top: 20px;
    margin-left: 5px;
  `;
  const MainDiv = styled.div`
    height: 75%;
  `;

  const ReqDiv = styled.div`
    height: 25%;
  `;

  return (
    <FriendsListMainDiv>
      <MainDiv>
        <FriendsListTitle>친구목록</FriendsListTitle>
        <SearchFriendsForm onSubmit={onSearchSubmit}>
          <SearchFriendsInput id="req_nickname" placeholder="닉네임을 입력해주세요" />
          <ButtonDiv>
            <SearchFriendsButton type="submit">검색</SearchFriendsButton>
            <SearchCancelButton onClick={modeToggleButton}>목록보기</SearchCancelButton>
          </ButtonDiv>
        </SearchFriendsForm>
        {mode === 'basic' ? (
          <EmptyList>친구가 없습니다 ..</EmptyList>
        ) : searchedList.length !== 0 ? (
          <div>
            {searchedList.map((r, index) => (
              <FriendSearchResult key={index} id={r.id} nickname={r.nickname} />
            ))}
          </div>
        ) : (
          <EmptyList>검색 결과가 없습니다.</EmptyList>
        )}
      </MainDiv>
      <ReqDiv>
        <FriendsListTitle>친구 요청 목록</FriendsListTitle>
        {friendReqList.length !== 0 ? (
          friendReqList.map((r, index) => <FriendSearchResult key={index} id={r.id} nickname={r.nickname} is_req={true} />)
        ) : (
          <div>친구 요청이 없습니다.</div>
        )}
      </ReqDiv>
    </FriendsListMainDiv>
  );
};

export default FriendsListPresenter;
