import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FavoritesPresenter from './FavoritesPresenter';

const FavoritesContainer = () => {
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(true);
  const [favList, setFavList] = useState([]);
  const getFavList = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/mypage/favorites/list`, { withCredentials: true })
      .then((response) => {
        setFavList(response.data.result ? response.data.result : []);
        if (favList !== []) getLocation(response.data.result[0].address);
      })
      .catch((err) => console.error(err));
  };

  const getLocation = async (address) => {
    await axios
      .get(`https://dapi.kakao.com/v2/local/search/address.json?analyze_type=exact&page=1&size=10&query=${address}`, {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_REST_API_KEY}`,
        },
      })
      .then(async ({ data: { documents } }) => {
        await setLocation([{ x: documents[0]?.x, y: documents[0]?.y }]);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const onDeleteButtonClick = (e) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/mypage/favorites/delete/${e.target.firstChild.value}`, { withCredentials: true })
      .then((response) => {
        window.alert(response.data.message);
        getFavList();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getFavList();
  }, []);
  return (
    <FavoritesPresenter
      favList={favList}
      location={location}
      loading={loading}
      getLocation={getLocation}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );
};

export default FavoritesContainer;
