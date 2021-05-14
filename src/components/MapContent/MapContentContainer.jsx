import React from 'react';
import MapContentPresenter from './MapContentPresenter';

const MapContentContainer = ({ location, restaurantList }) => {
  return <MapContentPresenter location={location} restaurantList={restaurantList} />;
};

export default MapContentContainer;
