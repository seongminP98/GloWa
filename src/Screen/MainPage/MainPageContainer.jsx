import React, { useEffect, useState } from 'react';
import MainPagePresenter from './MainPagePresenter';
import axios from 'axios';

const MainPageContainer = () => {
  const [isAddress, setIsAddress] = useState('');
  const [isZoneCode, setIsZoneCode] = useState();
  const [location, setLocation] = useState();
  const [restaurantList, setRestaurantList] = useState();
  const [mode, setMode] = useState('single');

  useEffect(() => {
    getLocation();
  }, [isAddress]);

  useEffect(() => {
    getRestaurant();
  }, [location]);

  const onToggleButtonClick = (e) => {
    const { id } = e.target;
    setMode(id);
  };

  const handleComplete = async (data) => {
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
  };

  const getLocation = async () => {
    await axios
      .get(`https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10&query=${isAddress}`, {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_REST_API_KEY}`,
        },
      })
      .then(({ data: { documents } }) => {
        setLocation({ x: documents[0].x, y: documents[0].y });
      });
  };

  const getRestaurant = async () => {
    await axios
      .get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=15&sort=accuracy&query=%EB%A7%9B%EC%A7%91&x=${location?.x}&y=${location?.y}&radius=500&category_group_code=FD6`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_REST_API_KEY}`,
          },
        }
      )
      .then(({ data: { documents } }) => setRestaurantList(documents));
  };

  return (
    <MainPagePresenter
      handleComplete={handleComplete}
      location={location}
      restaurantList={restaurantList}
      mode={mode}
      onToggleButtonClick={onToggleButtonClick}
    />
  );
};

export default MainPageContainer;
