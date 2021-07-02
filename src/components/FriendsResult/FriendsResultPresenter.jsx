import React from 'react';
import styled from 'styled-components';

const MainDiv = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  margin-top: 5px;
`;

const NickDiv = styled.div``;

const InviteButton = styled.button`
  border: none;
  cursor: pointer;
`;

const FriendsResultPresenter = ({ id, nickname, isDetailScreen }) => {
  return (
    <MainDiv>
      <NickDiv>{nickname}</NickDiv>
      {isDetailScreen && <InviteButton>초대</InviteButton>}
    </MainDiv>
  );
};

export default FriendsResultPresenter;
