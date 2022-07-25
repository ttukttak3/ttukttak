import React, { useState } from 'react';
import style from './RentMainPage.style';
import RentListPage from './Rent/RentListPage';
import BorrowListPage from './Borrow/BorrowListPage';
const RentMainPage = () => {
  const { Wrapper, TapHeader, Option } = style;
  const [page, setPage] = useState(1);

  return (
    <Wrapper>
      <TapHeader>
        <Option onClick={() => setPage(1)}>대여 내역</Option>
        <Option onClick={() => setPage(2)}>차입내역</Option>
      </TapHeader>
      {page === 1 ? <RentListPage></RentListPage> : <BorrowListPage></BorrowListPage>}
    </Wrapper>
  );
};

export default RentMainPage;
