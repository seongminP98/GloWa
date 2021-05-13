import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Join = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: inter;
`;

const JoinForm = styled.form`
  width: 500px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  box-sizing: border-box;
`;

const JoinTitle = styled.div`
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

const JoinButton = styled.button`
  border: none;
  border-radius: 3px;
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

const AskLoginDiv = styled.div`
  margin-top: 20px;
  display: flex;
`;

const AskLoginTitle = styled.div`
  margin-right: 8px;
  font-size: 15px;
  color: gray;
`;

const LoginLink = styled(Link)`
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

const JoinPresenter = ({ onSubmit, onChange, id, password, nickname, passwordCheck }) => {
  return (
    <Join>
      <JoinForm onSubmit={onSubmit}>
        <JoinTitle>회원가입</JoinTitle>
        <InputContainer>
          <InputLabel for="id">아이디</InputLabel>
          <Input required={true} maxLength={10} value={id} placeholder="ID" id="id" onChange={onChange} />
          <InputLabel for="nickname">닉네임</InputLabel>
          <Input required={true} maxLength={8} value={nickname} placeholder="Nickname" id="nickname" onChange={onChange} />
          <InputLabel for="password">비밀번호</InputLabel>
          <Input
            required={true}
            minLength={6}
            maxLength={13}
            type="password"
            value={password}
            placeholder="Password"
            id="password"
            onChange={onChange}
          />
          <InputLabel for="passwordCheck">비밀번호 확인</InputLabel>
          <Input
            required={true}
            minLength={6}
            maxLength={13}
            type="password"
            value={passwordCheck}
            placeholder="Password Check"
            id="passwordCheck"
            onChange={onChange}
          />
        </InputContainer>
        <JoinButton type="submit">회원가입</JoinButton>
        <AskLoginDiv>
          <AskLoginTitle>이미 계정이 있으신가요?</AskLoginTitle>
          <LoginLink to="/login">
            <LinkInnerSpan>로그인</LinkInnerSpan>
            <LinkInnerSpan>
              <i class="fas fa-chevron-right"></i>
            </LinkInnerSpan>
          </LoginLink>
        </AskLoginDiv>
      </JoinForm>
    </Join>
  );
};

export default JoinPresenter;
