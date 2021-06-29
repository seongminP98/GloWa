import React, { useState } from 'react';
import styled from 'styled-components';
import SchedulePresenter from './SchedulePresenter';
const ScheduleContainer = () => {
  const [scheduleList, seScheduleList] = useState([]);
  const getScheduleList = () => {};
  return <SchedulePresenter />;
};

export default ScheduleContainer;
