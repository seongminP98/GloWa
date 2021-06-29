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

const FriendAddButton = styled.button`
  border: none;
  cursor: pointer;
`;

const AcceptButton = styled.button`
  border: none;
  cursor: pointer;
  margin-right: 10px;
`;

const RejectButton = styled.button`
  border: none;
  cursor: pointer;
`;

const ReqForm = styled.form``;

const FriendsResultPresenter = ({ id, nickname, FriendAddbuttonClick, is_req, onAcceptButtonClick, user }) => {
  return (
    <MainDiv>
      <NickDiv>{nickname}</NickDiv>
    </MainDiv>
  );
};

export default FriendsResultPresenter;
