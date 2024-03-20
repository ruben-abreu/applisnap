import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppliSnapIcon from '../assets/AppliSnapIcon.png';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';
import LogInButton from './LogInButton';
import SignUpButton from './SignUpButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import AccountMenu from './AccountMenu';

function Navigation() {
  const { darkMode, setDarkMode, width } = useContext(ThemeContext);
  const { loggedIn, user } = useContext(AuthContext);

  const [boardId, setBoardId] = useState('');

  useEffect(() => {
    if (user) {
      setBoardId(user.boards[user.boards.length - 1]._id);
    }
  }, [user]);

  return (
    <div className="m-[2%] flex justify-between items-center max-[500px]:mb-[30px]">
      <NavLink
        to={loggedIn ? `/boards/${boardId}` : '/'}
        className="flex items-center"
      >
        <img
          src={AppliSnapIcon}
          alt="app icon"
          className="w-[50px] h-[50px] mr-[10px] max-[350px]:w-[40px] max-[350px]:h-[40px] max-[300px]:w-[30px] max-[300px]:h-[30px]"
        />
        <h1
          className={`${
            darkMode ? 'text-white' : 'text-[#678B85]'
          } text-[2rem] max-[350px]:text-[1.6rem] max-[300px]:text-[1.4rem]`}
        >
          AppliSnap
        </h1>
      </NavLink>

      <div className="flex items-center">
        {!loggedIn && width > 500 && (
          <div className="mr-[10px]">
            <LogInButton />
          </div>
        )}
        {!loggedIn && width > 500 && (
          <div className="mr-[20px]">
            <SignUpButton />
          </div>
        )}

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode === true ? (
            <DarkModeRoundedIcon />
          ) : (
            <LightModeRoundedIcon />
          )}
        </button>

        {loggedIn && <AccountMenu />}
      </div>
    </div>
  );
}

export default Navigation;
