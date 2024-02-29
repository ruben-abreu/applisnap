import { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';
import UserImage from '../components/UserImage';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import DeleteAccountButton from '../components/DeleteAccountButton';
import ChangePasswordButton from '../components/ChangePasswordButton';
import CircularProgress from '@mui/material/CircularProgress';

function Settings() {
  const { darkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="h-full min-h-[60vh] mx-[2%] mt-[10%] flex flex-col">
      <div className="mx-auto">
        <div className="mb-[30px] flex items-center">
          <UserImage />
          <h2 className="ml-[15px]">
            {user ? `${user.firstName} ${user.lastName}` : <CircularProgress />}
          </h2>
        </div>
        <div className="mb-[30px] flex items-center">
          <EmailRoundedIcon
            sx={{
              width: '36px',
              height: '36px',
              marginLeft: '15px',
              marginRight: '15px',
              color: darkMode ? 'white' : '#677f8b',
            }}
          />
          <p className="ml-[15px]">
            {' '}
            {user ? `${user.email}` : <CircularProgress />}
          </p>
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center">
          <div className="mb-[15px] w-[100%]">
            <ChangePasswordButton />
          </div>
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
}

export default Settings;
