/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import style from './Layout.style';
import LoginPage from '../../pages/OauthLogin/Login/LoginPage';
import Auth from '../../pages/OauthLogin/Oauth/Auth';
import SignUpPage from '../../pages/OauthLogin/SignUp/SignUpPage';
import Chat from '../../pages/Chat/ChatList/ChatPage';
import ChatItem from '../../pages/Chat/ChatItem/ChatItemPage';
import ChatAlertPage from '../../pages/Chat/ChatList/ChatAlert/ChatAlertPage';
import HomePage from '../../pages/Home/HomePage';
import BookDetailPage from '../../pages/Home/DetailList/BookDetailPage';
import UploadBookPage from '../../pages/UploadBook/UploadBookPage';
import AuthCheckRouter from '../../pages/OauthLogin/Login/AuthCheckRouter';
import SearchListPage from '../../pages/Search/SearchListPage';
import AccountPage from '../../pages/Account/AccountPage';
import ProfilePage from '../../pages/Account/Profile/ProfilePage';
import LocationPage from '../../pages/Location/LocationPage';
import SettingPage from '../../pages/Account/Setting/SettingPage';
import ContentsPage from '../../pages/Account/Setting/ContentsPage';
import UpdateBookPage from '../../pages/UpdateBook/UpdateBookPage';
import RentMainPage from '../../pages/RentManage/RentMainPage';
import UserAccountPage from '../../pages/Account/UserAccountPage';
import RentDetail from '../../pages/RentManage/Rent/RentDetail';
import BorrowDetail from '../../pages/RentManage/Borrow/BorrowDetail';

const Layout = () => {
  const navi = useLocation();
  const { LayoutBox, Section } = style;
  const [marginState, setMarginState] = useState('margin');

  useEffect(() => {
    if (navi.pathname === '/login' || navi.pathname === '/signup' || navi.pathname === '/detailBook') {
      setMarginState('marginT');
    } else if (navi.pathname === '/rent') {
      setMarginState('marginB');
    } else {
      setMarginState('marginTB');
    }
  }, [navi]);

  return (
    <LayoutBox>
      <Header />
      <Section className={marginState}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="detailBook" element={<BookDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="oauth2/redirect" element={<Auth />} />
          <Route path="location" element={<LocationPage />} />
          {/* 가입하기 전 상태임으로 AuthCheckRouter 체크 제외 */}
          <Route path="signup" element={<SignUpPage />} />
          <Route path="account/setting/:contents" element={<ContentsPage />} />
          <Route path="userAccount" element={<UserAccountPage />} />
          <Route element={<AuthCheckRouter />}>
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:roomId" element={<ChatItem />} />
            <Route path="chat/alert" element={<ChatAlertPage />} />
            <Route path="upload" element={<UploadBookPage />} />
            <Route path="search" element={<SearchListPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="account/profile" element={<ProfilePage />} />
            <Route path="account/setting" element={<SettingPage />} />
            <Route path="update" element={<UpdateBookPage />} />
            <Route path="rent" element={<RentMainPage />} />
            <Route path="rent/:rentId" element={<RentDetail />} />
            <Route path="borrow/:rentId" element={<BorrowDetail />} />
          </Route>
        </Routes>
      </Section>
      <Footer />
    </LayoutBox>
  );
};

export default Layout;
