import { useContext } from 'react';
import SignUpButton from '../components/SignUpButton';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';

function HomePage() {
  const { darkMode } = useContext(ThemeContext);
  const { loggedIn } = useContext(AuthContext);

  return (
    <div className="h-full min-h-[80vh] mx-[2%] flex flex-col justify-center items-center">
      <h1
        className={`${
          darkMode ? 'white' : 'text-[#677f8b]'
        } text-[3rem] mb-[30px]`}
      >
        AppliSnap
      </h1>
      <h2 className="mb-[30px]">Job Application Tracker</h2>
      {!loggedIn && <SignUpButton />}
    </div>
  );
}

export default HomePage;
