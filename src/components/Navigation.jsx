import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AppliSnapIcon from '../assets/AppliSnapIcon.png';
import { ThemeContext } from '../context/theme.context';
import LogInButton from './LogInButton';
import SignUpButton from './SignUpButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

function Navigation() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div className="m-[2%] flex justify-between items-center">
      <NavLink to="/" className="flex">
        <img
          src={AppliSnapIcon}
          alt="app icon"
          className="w-[50px] h-[50px mr-[10px]"
        />
        <h1 className={`${darkMode ? 'white' : 'text-[#677f8b]'} text-[2rem]`}>
          AppliSnap
        </h1>
      </NavLink>
      <div className="flex items-center">
        <div className="mr-[10px]">
          <LogInButton />
        </div>
        <div className="mr-[20px]">
          <SignUpButton />
        </div>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode === true ? (
            <DarkModeRoundedIcon />
          ) : (
            <LightModeRoundedIcon />
          )}
        </button>
      </div>
    </div>
  );
}

export default Navigation;
