import { useContext } from 'react';
import SignUpButton from '../components/SignUpButton';
import { ThemeContext } from '../context/theme.context';

function HomePage() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="h-full min-h-[80vh] w-[100%] flex flex-col justify-center items-center">
      <h1
        className={`${
          darkMode ? 'white' : 'text-[#677f8b]'
        } text-[3rem] mb-[30px]`}
      >
        AppliSnap
      </h1>
      <h2 className="mb-[30px]">Job Application Tracker</h2>
      <SignUpButton />
    </div>
  );
}

export default HomePage;
