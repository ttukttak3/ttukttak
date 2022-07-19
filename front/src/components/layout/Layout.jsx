import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import style from './Layout.style';
import LoginPage from '../../pages/OauthLogin/Login/LoginPage';
import Auth from '../../pages/OauthLogin/Oauth/Auth';
import ProfilePage from '../../pages/OauthLogin/Profile/ProfilePage';
import Chat from '../../pages/Chat/ChatList/ChatPage';
import ChatItem from '../../pages/Chat/ChatItem/ChatItemPage';
import ChatAlertPage from '../../pages/Chat/ChatList/ChatAlert/ChatAlertPage';
import HomePage from '../../pages/Home/HomePage';
import BookDetailPage from '../../pages/Home/DetailList/BookDetailPage';
import UploadBookPage from '../../pages/UploadBook/UploadBookPage';
import AuthCheckRouter from '../../pages/OauthLogin/Login/AuthCheckRouter';
import SearchListPage from '../../pages/Search/SearchListPage';

const Layout = () => {
  const navi = useLocation();
  const { LayoutBox, Section } = style;
  return (
    <LayoutBox>
      <Header />
      <Section className={navi.pathname === '/detailBook' ? 'noMargin' : 'margin'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detailBook" element={<BookDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth2/redirect" element={<Auth />} />
          <Route element={<AuthCheckRouter />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:roomId" element={<ChatItem />} />
            <Route path="chat/alert" element={<ChatAlertPage />} />
            <Route path="upload" element={<UploadBookPage />} />
            <Route path="search" element={<SearchListPage />} />
          </Route>
        </Routes>
      </Section>
      <Footer />
    </LayoutBox>
  );
};

export default Layout;
