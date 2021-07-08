import React from 'react';
import { Avatar } from '@material-ui/core';
import styled from 'styled-components';
const HeaderUserIconPresenter = ({ user }) => {
  const ParticipantsList = styled.div`
    margin-left: 5px;
    margin-right: 10px;
  `;

  const ParticipantsListItemDiv = styled.div`
    display: flex;
    font-family: 'MaplestoryOTFBold';
    align-items: center;
  `;

  return (
    <div>
      <ParticipantsListItemDiv>
        <Avatar style={{ height: 30, width: 30 }}>{user.nickname.slice(0, 1).toUpperCase()}</Avatar>
        <ParticipantsList>{user.nickname}</ParticipantsList>
      </ParticipantsListItemDiv>
    </div>
  );
};

export default HeaderUserIconPresenter;
