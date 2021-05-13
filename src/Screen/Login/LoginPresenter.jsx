import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Login = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: inter;
`;

const LoginForm = styled.form`
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  box-sizing: border-box;
`;

const LoginTitle = styled.div`
  margin-top: 10px;
  font-size: 30px;
  font-weight: 600;
`;

const InputContainer = styled.div`
  width: 80%;
  margin-top: 30px;
`;

const Input = styled.input`
  padding: 0px 10px;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 1px solid gray;
  border-radius: 3px;
  transition: border 0.1s ease-in-out;
  outline: none;
  &:hover,
  &:focus {
    border: 2px solid #2962ff;
  }
`;

const PasswordTitleDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PasswordResetLink = styled(Link)`
  color: #0053f4;
  text-decoration: none;
  font-size: 13px;
`;

const InputLabel = styled.label`
  font-size: 13px;
`;

const LoginButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  width: 80%;
  background-color: #2962ff;
  height: 40px;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  &:hover {
    background-color: #0039cb;
  }
`;

const AskJoinDiv = styled.div`
  position: relative;
  top: -60px;
  display: flex;
`;

const AskJoinTitle = styled.div`
  margin-right: 8px;
  font-size: 15px;
  color: gray;
`;

const JoinLink = styled(Link)`
  text-decoration: none;
  color: black;
  position: relative;
  top: -1px;
  transition: all 0.1 ease-in-out;
  &:hover {
    color: #0039cb;
  }
`;

const LinkInnerSpan = styled.span`
  display: box;
  margin-right: 5px;
`;

const LoginPresenter = () => {
  return (
    <Login>
      <LoginForm>
        <LoginTitle>로그인</LoginTitle>
        <InputContainer>
          <InputLabel for="username">아이디</InputLabel>
          <Input placeholder="Username" id="username" />
          <PasswordTitleDiv>
            <InputLabel for="password">비밀번호</InputLabel>
            <PasswordResetLink to="#">비밀번호 재설정</PasswordResetLink>
          </PasswordTitleDiv>
          <Input placeholder="Password" id="password" />
        </InputContainer>
        <LoginButton>로그인 하기</LoginButton>
      </LoginForm>

      <AskJoinDiv>
        <AskJoinTitle>아직 계정이 없으신가요?</AskJoinTitle>
        <JoinLink to="/join">
          <LinkInnerSpan>계정 만들기</LinkInnerSpan>
          <LinkInnerSpan>
            <i class="fas fa-chevron-right"></i>
          </LinkInnerSpan>
        </JoinLink>
      </AskJoinDiv>
    </Login>
  );
};

export default LoginPresenter;
