import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import { ThemeContext } from './context/theme.context';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';

function App() {
  const { darkMode } = useContext(ThemeContext);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
