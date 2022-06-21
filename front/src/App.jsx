import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/layout/Layout';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <GlobalStyle />
        <Layout />
      </React.StrictMode>
    </ThemeProvider>
  );
};

export default App;
