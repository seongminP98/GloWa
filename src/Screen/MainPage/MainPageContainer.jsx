import React, { useEffect, useState } from 'react';
import MainPagePresenter from './MainPagePresenter';
import axios from 'axios';

const MainPageContainer = () => {
  const [isAddress, setIsAddress] = useState();
  const [isZoneCode, setIsZoneCode] = useState();
  const [location, setLocation] = useState([]);
  const [restaurantList, setRestaurantList] = useState();
  const [mode, setMode] = useState('single');
  const [center, setCenter] = useState();
  useEffect(() => {
    getLocation();
  }, [isAddress]);

  useEffect(() => {
    getRestaurant();
  }, [center]);

  useEffect(() => {
    setCenter({ x: getXposAverage(location), y: getYposAverage(location) });
  }, [location]);

  const getXposAverage = (arr) => {
    let result = 0;
    arr.forEach((p) => (result += +p.x));
    return result / arr.length;
  };

  const getYposAverage = (arr) => {
    let result = 0;
    arr.forEach((p) => (result += +p.y));
    return result / arr.length;
  };

  const onToggleButtonClick = (e) => {
    const { id } = e.target;
    setLocation([]);
    setCenter();
    setRestaurantList([]);
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
        switch (mode) {
          case 'single':
            setLocation([{ x: documents[0]?.x, y: documents[0]?.y }]);
            break;
          case 'multi':
            let locationList = removeLocationOverlap([...location, { x: documents[0]?.x, y: documents[0]?.y }]); // 위치 중복을 제거한 위치 배열
            locationList.filter((a) => a.x !== undefined);
            setLocation(locationList);
            break;
        }
      });
  };

  const getRestaurant = async () => {
    if (location[0]?.x === undefined) return;
    await axios
      .get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=15&sort=accuracy&query=%EB%A7%9B%EC%A7%91&x=${center?.x}&y=${
          center?.y
        }&radius=${mode === 'single' ? '1000' : '3000'}&category_group_code=FD6`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_REST_API_KEY}`,
          },
        }
      )
      .then(({ data: { documents } }) => setRestaurantList(documents));
  };

  const removeLocationOverlap = (arr) => {
    // 위치에 중복이 있는 경우 제거 함수
    const temp = new Set(arr);
    const result = [...temp];
    return result;
  };

  return (
    <MainPagePresenter
      handleComplete={handleComplete}
      location={location}
      restaurantList={restaurantList}
      mode={mode}
      center={center}
      onToggleButtonClick={onToggleButtonClick}
    />
  );
};

export default MainPageContainer;
