import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AppliSnapIcon from '../assets/AppliSnapIcon.png';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';
import LogInButton from './LogInButton';
import SignUpButton from './SignUpButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import IsAnon from './IsAnon';
import IsPrivate from './IsPrivate';
import AccountMenu from './AccountMenu';

function Navigation() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { loggedIn } = useContext(AuthContext);

  return (
    <div className="m-[2%] flex justify-between items-center">
      <NavLink to="/" className="flex">
        <img
          src={AppliSnapIcon}
          alt="app icon"
          className="w-[50px] h-[50px mr-[10px]"
        />
        <h1
          className={`${
            darkMode ? 'text-white' : 'text-[#678B85]'
          } text-[2rem]`}
        >
          AppliSnap
        </h1>
      </NavLink>

      <div className="flex items-center">
        {!loggedIn && (
          <div className="mr-[10px]">
            <LogInButton />
          </div>
        )}
        {!loggedIn && (
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
