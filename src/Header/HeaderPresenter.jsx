import React from 'react';
import Styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = Styled.header`
    height : 120px;
    display : flex;
    justify-content : space-between;
`;

const Title = Styled.div`
    font-size : 38px;
    color : #2962ff;
    min-width : 500px;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : flex-start;
    padding : 0px 100px;
    font-family : RocknRoll One;
`;
const Subtitle = Styled.div`
    font-family: 'MaplestoryOTFBold';
    font-size : 16px;
`;

const Menu = Styled.div`
    min-width : 500px;
    display : flex;
    align-items :center;
    justify-content : flex-end;
    padding : 0px 100px;
`;

const StyledLink = Styled(Link)`
    margin : 0px 10px;
    font-size : 14px;
    font-weight : 400;
    text-decoration : none;
    color :#000000;
`;

const Titlediv = Styled.div`
    height: 100%;
    display : flex;
    align-items : center;
`;

const HeaderPresenter = () => {
  return (
    <Header>
      <Titlediv>
        <StyledLink>
          <Title>
            <Subtitle>어디서 볼까?</Subtitle>
            Glowa!
          </Title>
        </StyledLink>
      </Titlediv>
      <Menu>
        <StyledLink to="login">로그인</StyledLink>
        <StyledLink to="join">회원가입</StyledLink>
      </Menu>
    </Header>
  );
};

export default HeaderPresenter;
