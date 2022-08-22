/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBack, setAllFalse, setTitle } from '../../../app/headerSlice';
import { setClear } from '../../../app/userSlice';
import ConfirmPopup from '../../../components/Modal/ConfirmPopup';
import { ACCESS_TOKEN } from '../../../util/ApiUtil';
import utils from '../../../util/ProfileApi';
import style from './SettingPage.style';

const SettingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const { deleteUser } = utils;

  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setTitle('설정'));
    //로그인 back history
    localStorage.setItem('url', '/account/setting');
    return () => {};
  }, [dispatch]);

  const logoutContents = [
    {
      message: '취소',
      onClick: () => {
        setLogoutShowing(false);
      },
    },
    {
      message: '확인',
      onClick: () => {
        dispatch(setClear());
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.replace('/');
      },
    },
  ];

  const withdrawalContents = [
    {
      message: '취소',
      onClick: () => {
        setWithdrawalShowing(false);
      },
    },
    {
      message: '확인',
      onClick: () => {
        deleteUser(user.userId).then(result => {
          if (result === false) {
            alert('대여중인 도서가 있습니다. 반납해주세요!');
          } else {
            dispatch(setClear());
            localStorage.removeItem(ACCESS_TOKEN);
            window.location.replace('/');
          }
        });
        setWithdrawalShowing(false);
      },
    },
  ];

  const [logoutShowing, setLogoutShowing] = useState(false);
  const [withdrawalShowing, setWithdrawalShowing] = useState(false);
  const openModal = kind => {
    if (kind === 'logout') {
      setLogoutShowing(true);
      document.body.style.overflow = 'hidden';
    } else if (kind === 'withdrawal') {
      setWithdrawalShowing(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const { SettingBox, VersionBox } = style;
  return (
    <SettingBox>
      <h2>고객센터</h2>
      <ul>
        <li onClick={() => navigate('/account/setting/notice')}>공지사항</li>
        <li onClick={() => navigate('/account/setting/faq')}>FAQ</li>
        <li onClick={() => window.location.replace('mailto:ttukttak@naver.com')}>문의하기</li>
      </ul>
      <h2>이용약관</h2>
      <ul>
        <li onClick={() => navigate('/account/setting/terms')}>서비스 이용약관</li>
        <li onClick={() => navigate('/account/setting/information')}>고객 정보 처리 방침</li>
      </ul>
      <h2>계정 설정</h2>
      <ul>
        <li onClick={() => openModal('logout')}>로그아웃</li>
        <li onClick={() => openModal('withdrawal')}>탈퇴하기</li>
      </ul>
      <VersionBox>
        <span>버전 정보 V0.9</span>
        <span>업데이트 일자 : 2022-07-24</span>
      </VersionBox>
      {logoutShowing && <ConfirmPopup title={'정말 로그아웃 하시겠습니까?'} subtitle={'*로그아웃 시 저장된 캐시는 삭제됩니다.'} contents={logoutContents} />}
      {withdrawalShowing && <ConfirmPopup title={'정말 탈퇴 하시겠습니까?'} subtitle={'*탈퇴시 저장된 데이터는 삭제됩니다.'} contents={withdrawalContents} />}
    </SettingBox>
  );
};

export default SettingPage;
