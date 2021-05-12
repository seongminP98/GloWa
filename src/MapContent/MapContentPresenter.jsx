/*global kakao*/
import React, { useEffect } from 'react';
import styled from 'styled-components';

// 지도를 위한 div
const MapContent = styled.div`
  min-width: 700px;
  height: 50%;
`;

const MapContentPresenter = ({ location }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    console.log(location);
    // 지도 API를 위한 script src
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById('myMap');
        let options = {
          center: new kakao.maps.LatLng(location?.y, location?.x),
          level: 7,
        };

        const map = new window.kakao.maps.Map(container, options);

        //마커가 표시 될 위치
        let markerPosition = new kakao.maps.LatLng(location?.y, location?.x);

        // 마커를 생성
        let marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커를 지도 위에 표시
        location && marker.setMap(map);
      });
    };
  });
  return <MapContent id="myMap" />;
};

export default MapContentPresenter;
