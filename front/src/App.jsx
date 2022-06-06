import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/layout/Layout';

const App = () => (
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      {/* reset css */}
      <GlobalStyle />
      {/* layout component */}
      <Layout />
    </React.StrictMode>
  </ThemeProvider>
);

export default App;
