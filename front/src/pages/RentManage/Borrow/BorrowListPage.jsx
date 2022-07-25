import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RentListItem from '../RentListItem';

const BorrowListPage = () => {
  const [bookList, setBookList] = useState([]);
  const navigate = useNavigate();
  return (
    <>
      <div>차입</div>
      {bookList.map(item => (
        <RentListItem mode={'borrow'} onClick={() => navigate(`/borrow/${rentId}`)}></RentListItem>
      ))}
    </>
  );
};

export default BorrowListPage;
