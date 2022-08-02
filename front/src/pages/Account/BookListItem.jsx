import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import noImg from '../../assets/img/logo/myb_default.svg';
const BookListItem = ({ id, imageUrl, grade }) => {
  const navigate = useNavigate();
  const onDetailBookPage = () => {
    navigate(`/detailBook`, { state: { id: id } });
  };
  const onErrorImg = e => {
    e.target.src = noImg;
  };
  return (
    <li key={id} onClick={onDetailBookPage}>
      <img src={imageUrl} alt="썸네일" onError={onErrorImg} />
      <p>{grade}</p>
    </li>
  );
};

BookListItem.defaultProps = {
  id: 0,
  imageUrl: '',
  grade: 'A',
};

BookListItem.propTypes = {
  id: PropTypes.number,
  imageUrl: PropTypes.string,
  grade: PropTypes.string,
};

export default BookListItem;
