import React from 'react';
import styled from 'styled-components';
import Map from '../../components/MapContent';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

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

const InfoDiv = styled.div``;

const FavoritesPresenter = ({ location, loading, favList, getLocation }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel0');

  const handleChange = (panel, address) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    getLocation(address);
  };

  return (
    !loading && (
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
                  <Typography>{f.restaurant}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <InfoDiv>
                    <Typography>{f.address}</Typography>
                    <Typography>{f.kind}</Typography>
                  </InfoDiv>
                </AccordionDetails>
              </Accordion>
            ))}
          </FavList>
          <Map location={location} center={location[0]} mode="single" />
        </MainDiv>
      </Favorites>
    )
  );
};

export default FavoritesPresenter;
