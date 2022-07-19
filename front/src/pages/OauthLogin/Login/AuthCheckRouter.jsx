/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import profileApi from '../../../util/ProfileApi';

const AuthCheckRouter = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authCheck = async () => {
    try {
      const returnVal = await profileApi.getCurrentUser();
      if (returnVal) {
        setAuthenticated(true);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      if (error === 'No access token set.') {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    authCheck();
  }, [dispatch]);

  return <Outlet />;
};

export default AuthCheckRouter;
