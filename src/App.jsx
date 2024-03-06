import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeContext } from './context/theme.context';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import Board from './pages/Board';
import Wishlist from './pages/Wishlist';
import Applications from './pages/Applications';
import Interviews from './pages/Interviews';
import Offers from './pages/Offers';
import Rejected from './pages/Rejected';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ResetPassword from './pages/ResetPassword';
import { APPLICATIONS } from './assets/json';

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
        <Route
          path="/boards/:boardId"
          element={<Board applications={APPLICATIONS} />}
        />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/interviews" element={<Interviews />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/rejected" element={<Rejected />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
