import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import style from './Layout.style';
//import Main from './Main';
import LoginPage from '../../pages/OauthLogin/Login/LoginPage';
import Auth from '../../pages/OauthLogin/Oauth/Auth';
import ProfilePage from '../../pages/OauthLogin/Profile/ProfilePage';
import Chat from '../../pages/Chat/ChatPage';
import ChatItem from '../../pages/Chat/ChatItemPage';

const Layout = () => {
  const { LayoutBox, Section } = style;
  return (
    <LayoutBox>
      <Header />
      <Section>
        <Routes>
          {/* <Route path="/main" element={<Main />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth2/redirect" element={<Auth />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="chat" element={<Chat />} />
          <Route path="chat/:chatId" element={<ChatItem />} />
        </Routes>
      </Section>
      <Footer />
    </LayoutBox>
  );
};

export default Layout;
