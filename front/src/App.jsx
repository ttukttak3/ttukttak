import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/layout/Layout';
import Login from './pages/Login/LoginPage';
import Chat from './pages/Chat/ChatPage';
import ChatItem from './pages/Chat/ChatItemPage';

import './App.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <Routes>
        <GlobalStyle />
          {/* layout component */}
          <Layout>
          <Route index element={<Login />} />
          <Route path="chat" element={<Chat />} />
          <Route path="chat/:chatId" element={<ChatItem />} />
            </Layout>
        </Routes>
      </React.StrictMode>
    </ThemeProvider>
  );
};

