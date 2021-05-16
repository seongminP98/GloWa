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

const MapContentPresenter = ({ location, restaurantList, mode }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    // 지도 API를 위한 script src
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    switch (mode) {
      case 'single': // 단순 위치 검색
        script.onload = () => {
          kakao.maps.load(() => {
            var positions = restaurantList?.map((restaurant) => {
              return {
                id: restaurant.id,
                address: restaurant.road_address_name,
                distance: restaurant.distance,
                url: restaurant.place_url,
                category: restaurant.category_name.split('>')[1].trim(),
                title: restaurant.place_name,
                latlng: new kakao.maps.LatLng(restaurant.y, restaurant.x),
              };
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

            positions?.forEach((p) => {
              // 마커 이미지의 이미지 크기 입니다
              var imageSize = new kakao.maps.Size(24, 35);

              // 마커 이미지를 생성합니다
              var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

              // 마커를 생성합니다
              var RestaurantMarker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: p.latlng, // 마커를 표시할 위치
                title: p.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage, // 마커 이미지
              });

              // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
              var iwContent = `<div style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; width : 300px">
          <img style="width : 100%; height : 150px"src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
            <div style="padding :9px">
              <div style="display:flex ; justify-content : space-between; align-items : center;">
                <a href=${p.url} target="_blank" style="font-size:19px; text-decoration : none; color : black">${
                  p.title.length > 12 ? p.title.slice(0, 12) + '...' : p.title
                }</a>
                <div style = "font-size : 13px; margin-right : 5px">${p.category}</div>
              </div>

              <div style="font-size : 13px;margin-top : 10px;margin-bottom:6px;">${p.address}</div>

              <div style="font-size : 13px"> 
                <div>${p.distance}m</div>
              </div>

              <div style="display:flex ;align-items:center; margin-top : 5px">
                <a href="#">길찾기</a>
                <form style="margin-left :5px" method="POST"><button type="submit">즐겨찾기 추가</button></form>
              </div>
            </div>
          </div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

              // 인포윈도우를 생성합니다
              var infowindow = new kakao.maps.InfoWindow({
                content: iwContent,
                removable: iwRemoveable,
              });

              // 마커에 클릭이벤트를 등록합니다
              kakao.maps.event.addListener(RestaurantMarker, 'click', function () {
                // 마커 위에 인포윈도우를 표시합니다
                infowindow.open(map, RestaurantMarker);
              });
            });
          });
        };
        break;
      case 'multi':
        script.onload = () => {
          kakao.maps.load(() => {
            var positions = restaurantList?.map((restaurant) => {
              return {
                id: restaurant.id,
                address: restaurant.road_address_name,
                distance: restaurant.distance,
                url: restaurant.place_url,
                category: restaurant.category_name.split('>')[1].trim(),
                title: restaurant.place_name,
                latlng: new kakao.maps.LatLng(restaurant.y, restaurant.x),
              };
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

            positions?.forEach((p) => {
              // 마커 이미지의 이미지 크기 입니다
              var imageSize = new kakao.maps.Size(24, 35);

              // 마커 이미지를 생성합니다
              var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

              // 마커를 생성합니다
              var RestaurantMarker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: p.latlng, // 마커를 표시할 위치
                title: p.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage, // 마커 이미지
              });

              // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
              var iwContent = `<div style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; width : 300px">
              <img style="width : 100%; height : 150px"src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
                <div style="padding :9px">
                  <div style="display:flex ; justify-content : space-between; align-items : center;">
                    <a href=${p.url} target="_blank" style="font-size:19px; text-decoration : none; color : black">${
                  p.title.length > 12 ? p.title.slice(0, 12) + '...' : p.title
                }</a>
                    <div style = "font-size : 13px; margin-right : 5px">${p.category}</div>
                  </div>
    
                  <div style="font-size : 13px;margin-top : 10px;margin-bottom:6px;">${p.address}</div>
    
                  <div style="font-size : 13px"> 
                    <div>${p.distance}m</div>
                  </div>
    
                  <div style="display:flex ;align-items:center; margin-top : 5px">
                    <a href="#">길찾기</a>
                    <form style="margin-left :5px" method="POST"><button type="submit">즐겨찾기 추가</button></form>
                  </div>
                </div>
              </div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

              // 인포윈도우를 생성합니다
              var infowindow = new kakao.maps.InfoWindow({
                content: iwContent,
                removable: iwRemoveable,
              });

              // 마커에 클릭이벤트를 등록합니다
              kakao.maps.event.addListener(RestaurantMarker, 'click', function () {
                // 마커 위에 인포윈도우를 표시합니다
                infowindow.open(map, RestaurantMarker);
              });
            });
          });
        };
        break;
    }
  });
  return <MapContent id="myMap" />;
};

export default MapContentPresenter;
