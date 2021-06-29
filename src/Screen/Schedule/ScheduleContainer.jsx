import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SchedulePresenter from './SchedulePresenter';
import store from '../../store';
const ScheduleContainer = () => {
  const [scheduleList, seScheduleList] = useState([]);
  const [isAddress, setIsAddress] = useState();
  const [isZoneCode, setIsZoneCode] = useState();
  const [location, setLocation] = useState([]);
  const [center, setCenter] = useState();

  const user = store.getState().user;

  useEffect(() => {
    getLocation();
  }, [isAddress]);

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

  const removeLocationOverlap = (arr) => {
    // 위치에 중복이 있는 경우 제거 함수
    const temp = new Set(arr);
    const result = [...temp];
    return result;
  };

  const getLocation = async () => {
    await axios
      .get(`https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10&query=${isAddress}`, {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_REST_API_KEY}`,
        },
      })
      .then(({ data: { documents } }) => {
        let locationList = removeLocationOverlap([...location, { x: documents[0]?.x, y: documents[0]?.y }]); // 위치 중복을 제거한 위치 배열
        locationList.filter((a) => a.x !== undefined);
        setLocation(locationList);
      });
  };

  const getScheduleList = async () => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/schedule/list`, { id: user.id }, { withCredentials: true })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
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

  useEffect(() => {
    getScheduleList();
  }, []);

  return <SchedulePresenter handleComplete={handleComplete} location={location} center={center} />;
};

export default ScheduleContainer;
