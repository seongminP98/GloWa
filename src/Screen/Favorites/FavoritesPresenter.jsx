import React from 'react';
import styled from 'styled-components';
import Map from '../../components/MapContent';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const Favorites = styled.div`
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
  font-family: 'MaplestoryOTFBold';
`;
const Title = styled.div`
  margin: 20px 0px 30px 0px;
  font-size: 25px;
  position: sticky;
`;

const MainDiv = styled.div`
  display: flex;
  align-items: center;
`;

const FavList = styled.div`
  margin-top: 70px;
  height: 600px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  overflow-x: hidden;
`;

const DeleteButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  width: 60px;
  background-color: #dd0000;
  height: 30px;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  border-radius: 4px;
  margin-left: 10px;
  &:hover {
    background-color: red;
  }
  align-self: flex-end;
`;

const InfoDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const EmptyList = styled.div`
  width: 600px;
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const GetDirectionLink = styled.a`
  text-decoration: none;
  margin-top: 20px;
`;

const FavoritesPresenter = ({ location, loading, favList, getLocation, onDeleteButtonClick }) => {
  const [expanded, setExpanded] = React.useState('panel0');

  const handleChange = (panel, address) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    getLocation(address);
  };

  return !loading && favList.length !== 0 ? (
    <Favorites>
      <MainDiv>
        <FavList>
          <Title>내 즐겨찾기 목록</Title>
          {favList.map((f, index) => (
            <Accordion
              key={index}
              style={{ width: 600 }}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`, f.address)}
            >
              <AccordionSummary
                expandIcon={<i className="fas fa-chevron-down" style={{ fontSize: 14 }}></i>}
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
              >
                <Typography style={{ fontFamily: 'MaplestoryOTFBold', fontSize: 19 }}>{f.restaurant}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <InfoDiv>
                  <Typography style={{ fontFamily: 'MaplestoryOTFBold' }}>{f.address}</Typography>
                  <Typography style={{ fontFamily: 'MaplestoryOTFBold' }}>{f.kind}</Typography>
                  <ButtonDiv>
                    <GetDirectionLink href={`https://map.naver.com/v5/search/${f.restaurant}`} target="_blank">
                      길찾기
                    </GetDirectionLink>
                    <DeleteButton onClick={onDeleteButtonClick}>
                      <input id="user_id" type="hidden" value={f.id} />
                      삭제
                    </DeleteButton>
                  </ButtonDiv>
                </InfoDiv>
              </AccordionDetails>
            </Accordion>
          ))}
        </FavList>
        <Map location={location} center={location[0]} mode="single" />
      </MainDiv>
    </Favorites>
  ) : (
    <Favorites>
      <MainDiv>
        <FavList>
          <Title>내 즐겨찾기 목록</Title>
          <EmptyList>즐겨찾기에 추가한 장소가 없습니다.</EmptyList>
        </FavList>
        <Map location={[]} center={[]} mode="single" />
      </MainDiv>
    </Favorites>
  );
};

export default FavoritesPresenter;
