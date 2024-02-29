import { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';
import Avatar from '@mui/material/Avatar';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import DeleteAccountButton from '../components/DeleteAccountButton';
import ChangePasswordButton from '../components/ChangePasswordButton';

function Settings() {
  const { darkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="h-full min-h-[60vh] mx-[2%] mt-[10%] flex flex-col">
      <div className="mx-auto">
        <div className="mb-[30px] flex items-center">
          <Avatar
            sx={{
              width: '50px',
              height: '50px',
              backgroundColor: darkMode ? 'white' : '#677f8b',
            }}
          />
          <h2 className="ml-[15px]">{`${user.firstName} ${user.lastName}`}</h2>
        </div>
        <div className="mb-[30px] flex items-center">
          <EmailRoundedIcon
            sx={{
              width: '30px',
              height: '30px',
              marginLeft: '10px',
              marginRight: '10px',
              color: darkMode ? 'white' : '#677f8b',
            }}
          />
          <p className="ml-[15px]">{user.email}</p>
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center">
          <div className="mb-[15px]">
            <ChangePasswordButton />
          </div>

          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
}

export default Settings;
