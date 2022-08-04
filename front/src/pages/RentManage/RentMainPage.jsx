/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import style from './RentMainPage.style';
import RentListPage from './Rent/RentListPage';
import BorrowListPage from './Borrow/BorrowListPage';
const RentMainPage = () => {
  //-------------- tab --------------
  const [activeIndex, setActiveIndex] = useState(0);
  const tabClickHandler = index => {
    setActiveIndex(index);
  };
  const tabContArr = [
    {
      tabTitle: (
        <h2 key={0} className={activeIndex === 0 ? 'on' : ''} onClick={() => tabClickHandler(0)}>
          대여 내역
        </h2>
      ),
      tabCont: <RentListPage></RentListPage>,
    },
    {
      tabTitle: (
        <h2 key={1} className={activeIndex === 1 ? 'on' : ''} onClick={() => tabClickHandler(1)}>
          차입내역
        </h2>
      ),
      tabCont: <BorrowListPage></BorrowListPage>,
    },
  ];

  const { RentMainBox, TabBox } = style;

  return (
    <RentMainBox>
      <TabBox>
        {tabContArr.map(section => {
          return section.tabTitle;
        })}
      </TabBox>
      {tabContArr[activeIndex].tabCont}
    </RentMainBox>
  );
};

export default RentMainPage;
