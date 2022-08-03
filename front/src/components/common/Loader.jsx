import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import style from './Loader.style';

const { LoaderWrap } = style;

const Loading = () => {
  return (
    <LoaderWrap>
      <ClipLoader color="#2948FF" size={40} speedMultiplier={0.8} />
    </LoaderWrap>
  );
};

export default Loading;
