import React from 'react';
import MapContentPresenter from './MapContentPresenter';

const MapContentContainer = ({ location, restaurantList, mode, center, size }) => {
  return <MapContentPresenter location={location} restaurantList={restaurantList} size={size} mode={mode} center={center} />;
};

export default MapContentContainer;
