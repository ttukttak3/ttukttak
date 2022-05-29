import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/OauthLogin/Login/LoginPage';
import Main from './layout/Main';
import ProfilePage from './pages/OauthLogin/Profile/ProfilePage';
import Auth from './pages/OauthLogin/Oauth/Auth';
import './App.css';

const App = () => (
  <React.StrictMode>
    <Routes>
      {/* <Route index element={<Login />} /> */}
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth2/redirect" element={<Auth />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  </React.StrictMode>
);

export default App;
