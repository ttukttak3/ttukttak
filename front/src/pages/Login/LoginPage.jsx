import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setId, setName, setPhone } from './loginSlice';

const LoginPage = () => {
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setId('soyeon.kang@gmail.com'));
    dispatch(setName('강소연'));
    dispatch(setPhone('01077281271'));

    return () => {
      // second
    };
  }, [dispatch]);

  return (
    <>
      <div>LoginPage</div>
      <div>{login.id}</div>
      <div>{login.name}</div>
      <div>{login.phone}</div>
    </>
  );
};

export default LoginPage;
