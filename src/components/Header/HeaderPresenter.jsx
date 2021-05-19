import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = styled.header`
  height: 120px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled(Link)`
  font-size: 38px;
  color: #2962ff;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 100px;
  font-family: RocknRoll One;
  text-decoration: none;
`;
const Subtitle = styled.div`
  font-family: 'MaplestoryOTFBold';
  font-size: 16px;
`;

const Menu = styled.div`
  min-width: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 100px;
`;

const StyledLink = styled(Link)`
  margin: 0px 10px;
  font-size: 14px;
  font-weight: 400;
  text-decoration: none;
  color: #000000;
`;

const LogoutButton = styled.button`
  margin: 0px 10px;
  font-size: 14px;
  font-weight: 400;
  border: none;
  cursor: pointer;
  background-color: #ffffff;
`;

const Titlediv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const HeaderPresenter = ({ user, onLogoutClick }) => {
  return (
    <Header>
      <Titlediv>
        <StyledLink>
          <Title to="/">
            <Subtitle>어디서 볼까?</Subtitle>
            Glowa!
          </Title>
        </StyledLink>
      </Titlediv>
      <Menu>
        {user ? (
          <LogoutButton onClick={onLogoutClick}>로그아웃</LogoutButton>
        ) : (
          <>
            <StyledLink to="login">로그인</StyledLink>
            <StyledLink to="join">회원가입</StyledLink>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default HeaderPresenter;
