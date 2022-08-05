/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { setClear } from '../../../app/userSlice';
import profileApi from '../../../util/ProfileApi';

const AuthCheckRouter = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authCheck = async () => {
    try {
      const returnVal = await profileApi.getCurrentUser();
      if (returnVal) {
        //회원가입을 하지 않고 뒤로가기 한 유저의 예외처리
        if (returnVal.role === 'GUEST') {
          dispatch(setClear());
          navigate('/login');
        } else {
          setAuthenticated(true);
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      navigate('/login');
    }
  };

  useEffect(() => {
    authCheck();
  }, [dispatch]);

  return <Outlet />;
};

export default AuthCheckRouter;
