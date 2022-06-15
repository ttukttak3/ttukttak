import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBack, setBackHome, setTitle, setLocation, setSearch, setTrash, setFavorite, setAlert } from '../../app/headerSlice';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBack(false));
    dispatch(setBackHome(false));
    dispatch(setTitle('우리집'));
    dispatch(setLocation(true));
    dispatch(setSearch(true));
    dispatch(setTrash(false));
    dispatch(setFavorite(true));
    dispatch(setAlert(true));
    return () => {
      // second;
    };
  }, []);
  return <div>HomePage</div>;
};

export default HomePage;
