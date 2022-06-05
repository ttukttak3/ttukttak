import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
// import thems from './styles/thems';
import { theme } from './styles/theme';
import Login from './pages/Login/LoginPage';
import Chat from './pages/Chat/ChatPage';
import ChatItem from './pages/Chat/ChatItemPage';

import './App.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <Routes>
          <Route index element={<Login />} />
          <Route path="chat" element={<Chat />} />
          <Route path="chat/:chatId" element={<ChatItem />} />
        </Routes>
      </React.StrictMode>
    </ThemeProvider>
  );
};

export default App;
