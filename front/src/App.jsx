import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/LoginPage';
import './App.css';

const App = () => {
  return (
    <React.StrictMode>
      <Routes>
        <Route index element={<Login />} />
      </Routes>
    </React.StrictMode>
  );
};

export default App;
