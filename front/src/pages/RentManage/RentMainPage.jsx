import React from 'react';
import style from './RentMainPage.style';
const RentMainPage = () => {
  const { Wrapper } = style;

  return (
    <Wrapper>
      <div>차입내역</div>
      <div>대여 내역</div>
    </Wrapper>
  );
};

export default RentMainPage;
