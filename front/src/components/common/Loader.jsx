import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import style from './Loader.style';

const { LoaderWrap } = style;

const Loading = () => {
  return (
    <LoaderWrap>
      <ClipLoader color="#2948FF" size={80} speedMultiplier={0.5} />
    </LoaderWrap>
  );
};

export default Loading;
