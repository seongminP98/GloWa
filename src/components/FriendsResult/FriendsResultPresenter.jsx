import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

const MainDiv = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  margin-top: 5px;
`;

const NickDiv = styled.div`
  display: flex;
  align-items: center;
`;

const NicknameDiv = styled.div`
  margin-left: 5px;
`;

const InviteButton = styled.button`
  border: none;
  cursor: pointer;
`;

const FriendsResultPresenter = ({ id, nickname, isDetailScreen, onInviteButtonClick, image }) => {
  return (
    <MainDiv>
      <NickDiv>
        <Avatar style={{ height: 30, width: 30 }}>
          {image ? (
            <img src={`${process.env.REACT_APP_SERVER_URL}${image}`} style={{ height: 30, width: 30 }} alt="profile" />
          ) : (
            nickname.slice(0, 1).toUpperCase()
          )}
        </Avatar>
        <NicknameDiv>{nickname}</NicknameDiv>
      </NickDiv>
      {isDetailScreen && <InviteButton onClick={onInviteButtonClick}>초대</InviteButton>}
    </MainDiv>
  );
};

export default FriendsResultPresenter;
