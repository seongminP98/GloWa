import React, { useState } from 'react';
import MainPagePresenter from './MainPagePresenter';
import axios from 'axios';

const MainPageContainer = () => {
  const [isAddress, setIsAddress] = useState('');
  const [isZoneCode, setIsZoneCode] = useState();
  const [location, setLocation] = useState();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setIsZoneCode(data.zonecode);
    setIsAddress(fullAddress);
    getPosition();
  };

  const getPosition = async () => {
    await axios
      .get(`https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10&query=${isAddress}`, {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_REST_API_KEY}`,
        },
      })
      .then(({ data: { documents } }) => setLocation({ x: documents[0].x, y: documents[0].y }))
      .then(() => console.log(location));
  };

  return <MainPagePresenter handleComplete={handleComplete} location={location} />;
};

export default MainPageContainer;
