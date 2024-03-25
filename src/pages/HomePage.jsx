import { useContext, useEffect } from 'react';
import SignUpButton from '../components/SignUpButton';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';
import boardPreview from '../assets/boardPreview.png';
import boardPreviewDarkMode from '../assets/boardPreviewDarkMode.png';
import boardPreviewMobile from '../assets/boardPreviewMobile.png';
import boardPreviewDarkModeMobile from '../assets/boardPreviewDarkModeMobile.png';
import insightsPreview from '../assets/insightsPreview.png';
import insightsPreviewDarkMode from '../assets/insightsPreviewDarkMode.png';
import insightsPreviewMobile from '../assets/insightsPreviewMobile.png';
import insightsPreviewDarkModeMobile from '../assets/insightsPreviewDarkModeMobile.png';
import LogInButton from '../components/LogInButton';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

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

      <div className="flex max-[500px]:flex-col justify-center items-center gap-[30px] max-[685px]:gap-[15px] max-[500px]:gap-[30px]">
        <ul className="flex flex-col gap-[20px] max-[685px]:gap-[10px]">
          <li>
            <b className="text-[#ff8956] text-lg">Job Hunt Made Easy</b>
            <br />
            <CheckRoundedIcon className="mr-[5px] text-[#ff8956]" /> Your
            Personal Application Command Center!
          </li>
          <li>
            <b className="text-[#ff8956] text-lg">Take Control</b>
            <br />
            <CheckRoundedIcon className="mr-[5px] text-[#ff8956]" /> Organize,
            Track, and Conquer Your Job Search!
          </li>
          <li>
            <b className="text-[#ff8956] text-lg">Never Miss a Beat</b>
            <br />
            <CheckRoundedIcon className="mr-[5px] text-[#ff8956]" /> Instant
            Insights into Your Job Applications!
          </li>
          <li>
            <b className="text-[#ff8956] text-lg">Job Search 2.0</b>
            <br />
            <CheckRoundedIcon className="mr-[5px] text-[#ff8956]" /> Power Up
            Your Hunt with Seamless Tracking!
          </li>
        </ul>
        <div className="w-[40%] max-w-[550px] max-[685px]:w-[60%] max-[500px]:w-[70%] p-[20px] flex flex-col gap-[10px] border-solid border-8 border-[#ff8956] rounded-md">
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
            className=""
          />
          <img
            src={
              width < 500 && darkMode
                ? insightsPreviewDarkModeMobile
                : width < 500
                ? insightsPreviewMobile
                : darkMode
                ? insightsPreviewDarkMode
                : insightsPreview
            }
            alt="board preview"
            className=""
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
