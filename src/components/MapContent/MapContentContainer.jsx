import React from 'react';
import MapContentPresenter from './MapContentPresenter';

const MapContentContainer = ({ location, restaurantList, mode }) => {
  return <MapContentPresenter location={location} restaurantList={restaurantList} mode={mode} />;
};

export default MapContentContainer;
