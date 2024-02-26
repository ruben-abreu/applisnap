import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeContext } from './context/theme.context';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import Board from './pages/Board';

function App() {
  const { darkMode } = useContext(ThemeContext);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
        typography: {
          fontFamily: 'Lexend',
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
