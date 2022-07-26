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
import RentMainPage from '../../pages/RentManage/RentMainPage';
import RentDetailPage from '../../pages/RentManage/Rent/RentDetailPage';
import BorrowDetailPage from '../../pages/RentManage/Borrow/BorrowDetailPage';
const Layout = () => {
  const navi = useLocation();
  const { LayoutBox, Section } = style;
  const [marginState, setMarginState] = useState('margin');

  useEffect(() => {
    if (navi.pathname === '/detailBook') {
      setMarginState('noMagin');
    } else if (navi.pathname === '/search') {
      setMarginState('noMarginTop');
    } else {
      setMarginState('margin');
    }
  }, [navi]);

  return (
    <LayoutBox>
      {navi.pathname !== '/search' && <Header />}
      <Section className={marginState}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="detailBook" element={<BookDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="oauth2/redirect" element={<Auth />} />
          <Route path="location/:townId" element={<LocationPage />} />
          <Route element={<AuthCheckRouter />}>
            <Route path="signUp" element={<SignUpPage />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:roomId" element={<ChatItem />} />
            <Route path="chat/alert" element={<ChatAlertPage />} />
            <Route path="upload" element={<UploadBookPage />} />
            <Route path="search" element={<SearchListPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="account/profile" element={<ProfilePage />} />
            <Route path="rent" element={<RentMainPage />} />
            <Route path="rent/:rentId" element={<RentDetailPage />} />
            <Route path="borrow/:rentId" element={<BorrowDetailPage />} />
          </Route>
        </Routes>
      </Section>
      <Footer />
    </LayoutBox>
  );
};

export default Layout;
