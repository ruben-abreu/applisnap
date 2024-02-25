import { NavLink } from 'react-router-dom';
import AppliSnapIcon from '../assets/AppliSnapIcon.png';
import LogInButton from './LogInButton';
import SignUpButton from './SignUpButton';

function Navigation() {
  return (
    <div className="m-[2%] flex justify-between items-center">
      <NavLink to="/" className="flex">
        <img
          src={AppliSnapIcon}
          alt="app icon"
          className="w-[50px] h-[50px mr-[10px]"
        />
        <h1 className="text-[#677f8b] text-[2rem]">AppliSnap</h1>
      </NavLink>
      <div className="flex items-center">
        <LogInButton />
        <SignUpButton />
      </div>
    </div>
  );
}

export default Navigation;
