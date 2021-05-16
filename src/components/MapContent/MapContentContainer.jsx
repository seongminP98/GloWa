import React from 'react';
import MapContentPresenter from './MapContentPresenter';

const MapContentContainer = ({ location, restaurantList, mode, center }) => {
  return <MapContentPresenter location={location} restaurantList={restaurantList} mode={mode} center={center} />;
};

export default MapContentContainer;
