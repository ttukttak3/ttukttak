/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import profileApi from '../../../util/ProfileApi';
import { setUserId, setRole, setNickName, setEmail, setImageFile, setHomeTown } from '../../../app/userSlice';

const AuthCheckRouter = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const history = useSelector(state => state.header.history);
  const authCheck = async () => {
    try {
      const returnVal = await profileApi.getCurrentUser();
      if (returnVal) {
        setAuthenticated(true);
        dispatch(setUserId(returnVal.id));
        dispatch(setRole(returnVal.role));
        dispatch(setNickName(returnVal.nickname));
        dispatch(setEmail(returnVal.email));
        dispatch(setImageFile(returnVal.imageUrl));
        dispatch(setHomeTown(returnVal.homeTown));
        //소셜 로그인 시 user 권한일 경우 history back
        if (returnVal.role === 'USER') {
          //이전 페이지 이동
          navigate(localStorage.getItem('historyUrl'));
        } else {
          navigate(`/profile`);
        }
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
