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
import Footer from './components/Footer';
import ResetPassword from './pages/ResetPassword';

function App() {
  const { darkMode } = useContext(ThemeContext);
  const [creditsPage, setCreditsPage] = useState(false);

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
          <Route
            path="/"
            element={<HomePage setCreditsPage={setCreditsPage} />}
          />
          <Route
            path="/boards"
            element={<BoardLists setCreditsPage={setCreditsPage} />}
          />
          <Route
            path="/boards/:boardId"
            element={<Board setCreditsPage={setCreditsPage} />}
          />
          <Route
            path="/wishlist/:boardId"
            element={<Wishlist setCreditsPage={setCreditsPage} />}
          />
          <Route
            path="/wishlist"
            element={<Wishlist setCreditsPage={setCreditsPage} />}
          />
          <Route
            path="/applications/:boardId"
            element={<Applications setCreditsPage={setCreditsPage} />}
          />
          <Route
            path="/applications"
            element={<Applications setCreditsPage={setCreditsPage} />}
          />
          <Route
            path="/interviews/:boardId"
            element={<Interviews setCreditsPage={setCreditsPage} />}
          />
          <Route
            path="/interviews"
            element={<Interviews setCreditsPage={setCreditsPage} />}
          />
          <Route
            path="/offers/:boardId"
            element={<Offers setCreditsPage={setCreditsPage} />}
          />
          <Route
            path="/offers"
            element={<Offers setCreditsPage={setCreditsPage} />}
          />
          <Route
            path="/rejected/:boardId"
            element={<Rejected setCreditsPage={setCreditsPage} />}
          />
          <Route
            path="/rejected"
            element={<Rejected setCreditsPage={setCreditsPage} />}
          />
          <Route
            path="/insights"
            element={<Insights setCreditsPage={setCreditsPage} />}
          />
          <Route
            path="/insights/:boardId"
            element={<Insights setCreditsPage={setCreditsPage} />}
          />
          <Route
            path="/settings"
            element={<Settings setCreditsPage={setCreditsPage} />}
          />
          <Route
            path="/credits"
            element={<Credits setCreditsPage={setCreditsPage} />}
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="*"
            element={<ErrorPage setCreditsPage={setCreditsPage} />}
          />
        </Routes>
      </div>
      {!creditsPage && <Footer />}
    </ThemeProvider>
  );
}

export default App;
