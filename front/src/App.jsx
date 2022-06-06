import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/layout/Layout';
import Login from './pages/Login/LoginPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        {/* <Routes> */}
        <GlobalStyle />
        {/* layout component */}
        {/* <Layout>
            <Route index element={<Login />} />
          </Layout> */}
        <Layout />
        {/* </Routes> */}
      </React.StrictMode>
    </ThemeProvider>
  );
};

export default App;
