import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import style from './Layout.style';
//import Main from './Main';
import LoginPage from '../../pages/OauthLogin/Login/LoginPage';
import Auth from '../../pages/OauthLogin/Oauth/Auth';
import ProfilePage from '../../pages/OauthLogin/Profile/ProfilePage';
import Chat from '../../pages/Chat/ChatList/ChatPage';
import ChatItem from '../../pages/Chat/ChatItem/ChatItemPage';
import ChatAlertPage from '../../pages/Chat/ChatList/ChatAlert/ChatAlertPage';
import HomePage from '../../pages/Home/HomePage';
const Layout = () => {
  const { LayoutBox, Section } = style;
  return (
    <LayoutBox>
      <Header />
      <Section>
        <Routes>
          {/* <Route path="/main" element={<Main />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth2/redirect" element={<Auth />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="chat" element={<Chat />} />
          <Route path="chat/:chatId" element={<ChatItem />} />
          <Route path="chat/alert" element={<ChatAlertPage />} />
        </Routes>
      </Section>
      <Footer />
    </LayoutBox>
  );
};

export default Layout;
