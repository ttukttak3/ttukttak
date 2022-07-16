import React, { useEffect, useState } from 'react';
import LoginPage from './LoginPage';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import profileApi from '../../../util/ProfileApi';

const AuthCheckRouter = () => {
  const [authenticated, setAuthenticated] = useState();
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const authCheck = async () => {
    try {
      const returnVal = await profileApi.getCurrentUser();
      if (returnVal) {
        if (pathname === '/login' || pathname === '/oauth2/redirect') {
          navigate('/');
        }
        setAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
      navigate('/login');
    }
  };

  useEffect(() => {
    console.log(location.pathname);
    authCheck();
  }, []);

  return authenticated ? <Outlet /> : <LoginPage />;
};

export default AuthCheckRouter;
