import React from 'react';
import { useLocation } from 'react-router-dom';
import DetailPresenter from './DetailPresenter';

const DetailContainer = () => {
  const location = useLocation();
  const props = location.state;
  return <DetailPresenter {...props} />;
};

export default DetailContainer;
