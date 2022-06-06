import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation, setTitle } from '../../app/headerSlice';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //chatting 방 정보 api
    dispatch(setTitle(''));
    dispatch(setLocation(true));

    return () => {
      // second;
    };
  }, []);
  return <div>HomePage</div>;
};

export default HomePage;
