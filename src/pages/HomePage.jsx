import { useContext, useEffect } from 'react';
import SignUpButton from '../components/SignUpButton';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';
import boardPreview from '../assets/boardPreview.png';
import boardPreviewDarkMode from '../assets/boardPreviewDarkMode.png';
import boardPreviewMobile from '../assets/boardPreviewMobile.png';
import boardPreviewDarkModeMobile from '../assets/boardPreviewDarkModeMobile.png';
import LogInButton from '../components/LogInButton';

function HomePage({ setCreditsPage }) {
  const { darkMode, width } = useContext(ThemeContext);
  const { loggedIn } = useContext(AuthContext);

  useEffect(() => {
    setCreditsPage(false);
  }, []);

  return (
    <div className="h-full min-h-[80vh] mx-[2%] flex flex-col justify-center items-center">
      <h1 className="mb-[20px] text-2xl text-wrap text-center leading-loose">
        Chart Your Course, Track Your Success!
        <br />
        Effortlessly Navigate Your Job Search with Our{' '}
        <b>Application Tracker!</b>
      </h1>
      <div className="mb-[30px]">
        {!loggedIn && (
          <div className="flex gap-[15px]">
            {width > 500 ? '' : <LogInButton />}
            <SignUpButton />
          </div>
        )}
      </div>
      <img
        src={
          width < 500 && darkMode
            ? boardPreviewDarkModeMobile
            : width < 500
            ? boardPreviewMobile
            : darkMode
            ? boardPreviewDarkMode
            : boardPreview
        }
        alt="board preview"
        className="w-[70%] border-solid border-8 border-[#ff8956] rounded-md"
      />
    </div>
  );
}

export default HomePage;
