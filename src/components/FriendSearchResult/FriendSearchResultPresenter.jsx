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

const FriendSearchResultPresenter = ({ id, nickname, image, FriendAddbuttonClick, is_req, onAcceptButtonClick, user, is_my_friend }) => {
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
      {is_req ? (
        <ReqForm>
          <input type="hidden" value={id} id="req_id" />
          <AcceptButton onClick={onAcceptButtonClick}>수락</AcceptButton>
          <RejectButton>거절</RejectButton>
        </ReqForm>
      ) : (
        //본인이 아니거나 친구가 아닌 경우에만 출력
        user?.id !== id &&
        (!is_my_friend || is_my_friend.nickname !== nickname) && <FriendAddButton onClick={FriendAddbuttonClick}>친구 추가</FriendAddButton>
      )}
    </MainDiv>
  );
};

export default FriendSearchResultPresenter;
