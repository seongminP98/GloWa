/*global kakao*/
import React, { useEffect } from 'react';
import styled from 'styled-components';

// 지도를 위한 div
const MapContent = styled.div`
  min-width: 600px;
  height: 600px;
  position: relative;
  top: 40px;
`;

const MapContentPresenter = ({ location, restaurantList }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    // 지도 API를 위한 script src
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        var positions = restaurantList?.map((restaurant) => {
          return { title: restaurant.place_name, latlng: new kakao.maps.LatLng(restaurant.y, restaurant.x) };
        });

        let container = document.getElementById('myMap');
        let options = {
          center: new kakao.maps.LatLng(location ? location?.y : 37.5759040910202, location ? location?.x : 126.976842133821),
          level: 4,
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

        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

        for (var i = 0; i < positions?.length; i++) {
          // 마커 이미지의 이미지 크기 입니다
          var imageSize = new kakao.maps.Size(24, 35);

          // 마커 이미지를 생성합니다
          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

          // 마커를 생성합니다
          var markerR = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
          });
        }
      });
    };
  });
  return <MapContent id="myMap" />;
};

export default MapContentPresenter;
