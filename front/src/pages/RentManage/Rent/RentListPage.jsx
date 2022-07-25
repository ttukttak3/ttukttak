import React, { useState } from 'react';
import RentListItem from '../RentListItem';

const RentListPage = () => {
  const [bookList, setBookList] = useState([]);

  return (
    <>
      <div>대여</div>
      {bookList.map(item => (
        <RentListItem mode={'rent'} onClick={() => navigate(`/rent/${rentId}`)}></RentListItem>
      ))}
    </>
  );
};

export default RentListPage;
