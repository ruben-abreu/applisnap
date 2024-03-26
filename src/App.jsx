import { useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeContext } from './context/theme.context';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import Wishlist from './pages/Wishlist';
import Applications from './pages/Applications';
import Interviews from './pages/Interviews';
import Offers from './pages/Offers';
import Rejected from './pages/Rejected';
import Insights from './pages/Insights';
import Settings from './pages/Settings';
import BoardLists from './pages/BoardLists';
import Board from './pages/Board';
import ErrorPage from './pages/ErrorPage';
import Credits from './pages/Credits';
import ResetPassword from './pages/ResetPassword';

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
      <div className="min-h-[80vh]">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/boards" element={<BoardLists />} />
          <Route path="/boards/:boardId" element={<Board />} />
          <Route path="/wishlist/:boardId" element={<Wishlist />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/applications/:boardId" element={<Applications />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/interviews/:boardId" element={<Interviews />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/offers/:boardId" element={<Offers />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/rejected/:boardId" element={<Rejected />} />
          <Route path="/rejected" element={<Rejected />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:boardId" element={<Insights />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
