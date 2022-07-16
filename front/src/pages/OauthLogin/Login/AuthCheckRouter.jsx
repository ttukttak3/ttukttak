import React, { useEffect, useState } from 'react';
import LoginPage from './LoginPage';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import profileApi from '../../../util/ProfileApi';

const AuthCheckRouter = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const authCheck = async () => {
    try {
      const returnVal = await profileApi.getCurrentUser();
      console.log(returnVal);
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
  }, [location]);

  return <Outlet />;
};

export default AuthCheckRouter;
