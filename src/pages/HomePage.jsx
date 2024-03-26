import { useContext } from 'react';
import SignUpButton from '../components/SignUpButton';
import Footer from '../components/Footer';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';
import board from '../assets/board.png';
import boardDarkMode from '../assets/boardDarkMode.png';
import boardMobile from '../assets/boardMobile.png';
import boardMobileDarkMode from '../assets/boardMobileDarkMode.png';
import chart1 from '../assets/chart1.png';
import chart1DarkMode from '../assets/chart1DarkMode.png';
import chart2 from '../assets/chart2.png';
import chart2DarkMode from '../assets/chart2DarkMode.png';
import LogInButton from '../components/LogInButton';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

function HomePage() {
  const { darkMode, width } = useContext(ThemeContext);
  const { loggedIn } = useContext(AuthContext);

  return (
    <div
      className={`h-full min-h-[100vh] ${
        darkMode
          ? 'bg-gradient-to-t from-[#003228] via-[#16836e] to-[#369f8b]'
          : 'bg-gradient-to-b from-[#369f8b] via-[#30b39a] to-[#09ecc1]'
      }`}
    >
      <div className="mx-[2%] flex flex-col justify-center items-center">
        <h1 className="my-[30px] text-2xl text-[white] drop-shadow-lg text-wrap text-center leading-loose">
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

        <ul className="my-[20px] p-[20px] flex flex-col gap-[20px] max-[685px]:gap-[10px] max-[620px]:max-w-[500px] text-white drop-shadow">
          <li>
            <b
              className={`${
                darkMode ? 'text-[#ff8956]' : 'text-[#ff5005]'
              } text-lg ${
                darkMode
                  ? 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]'
                  : 'drop-shadow-[0_1px_4px_rgba(255,255,255,0.85)]'
              }`}
            >
              Job Hunt Made Easy
            </b>
            <br />
            <CheckRoundedIcon
              className={`mr-[5px] ${
                darkMode ? 'text-[#ff8956]' : 'text-[#ff5005]'
              } text-lg ${
                darkMode
                  ? 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]'
                  : 'drop-shadow-[0_1px_4px_rgba(255,255,255,0.85)]'
              }`}
            />
            Your Personal Application Command Center!
          </li>
        </ul>
        <img
          src={
            width < 500 && darkMode
              ? boardMobileDarkMode
              : width < 500
              ? boardMobile
              : darkMode
              ? boardDarkMode
              : board
          }
          alt="board preview"
          className="rounded max-w-[600px] max-[620px]:max-w-[500px] max-[500px]:max-w-[200px]"
        />

        <ul className="my-[20px] p-[20px] flex flex-col gap-[20px] max-[685px]:gap-[10px] max-[620px]:max-w-[500px] text-white drop-shadow">
          <li>
            <b
              className={`${
                darkMode ? 'text-[#ff8956]' : 'text-[#ff5005]'
              } text-lg ${
                darkMode
                  ? 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]'
                  : 'drop-shadow-[0_1px_4px_rgba(255,255,255,0.85)]'
              }`}
            >
              Take Control
            </b>
            <br />
            <CheckRoundedIcon
              className={`mr-[5px] ${
                darkMode ? 'text-[#ff8956]' : 'text-[#ff5005]'
              } text-lg ${
                darkMode
                  ? 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]'
                  : 'drop-shadow-[0_1px_4px_rgba(255,255,255,0.85)]'
              }`}
            />
            Organize, Track, and Conquer Your Job Search!
          </li>
        </ul>

        <div className="max-w-[600px] max-[620px]:max-w-[500px] p-[20px] flex flex-col gap-[30px]">
          <div className="flex justify-center items-center gap-[30px]">
            <img
              src={darkMode ? chart1DarkMode : chart1}
              alt="board preview"
              className="rounded w-[50%]"
            />
            <ul className="flex flex-col gap-[20px] max-[685px]:gap-[10px] text-white drop-shadow">
              <li>
                <b
                  className={`${
                    darkMode ? 'text-[#ff8956]' : 'text-[#ff5005]'
                  } text-lg ${
                    darkMode
                      ? 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]'
                      : 'drop-shadow-[0_1px_4px_rgba(255,255,255,0.85)]'
                  }`}
                >
                  Never Miss a Beat
                </b>
                <br />
                <CheckRoundedIcon
                  className={`mr-[5px] ${
                    darkMode ? 'text-[#ff8956]' : 'text-[#ff5005]'
                  } text-lg ${
                    darkMode
                      ? 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]'
                      : 'drop-shadow-[0_1px_4px_rgba(255,255,255,0.85)]'
                  }`}
                />
                Instant Insights into Your Job Applications!
              </li>
            </ul>
          </div>

          <div className="flex justify-center items-center gap-[30px]">
            <ul className="flex flex-col gap-[20px] max-[685px]:gap-[10px] text-white drop-shadow">
              <li>
                <b
                  className={`${
                    darkMode ? 'text-[#ff8956]' : 'text-[#ff5005]'
                  } text-lg ${
                    darkMode
                      ? 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]'
                      : 'drop-shadow-[0_1px_4px_rgba(255,255,255,0.85)]'
                  }`}
                >
                  Job Search 2.0
                </b>
                <br />
                <CheckRoundedIcon
                  className={`mr-[5px] ${
                    darkMode ? 'text-[#ff8956]' : 'text-[#ff5005]'
                  } text-lg ${
                    darkMode
                      ? 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]'
                      : 'drop-shadow-[0_1px_4px_rgba(255,255,255,0.85)]'
                  }`}
                />
                Power Up Your Hunt with Seamless Tracking!
              </li>
            </ul>

            <img
              src={darkMode ? chart2DarkMode : chart2}
              alt="board preview"
              className="rounded w-[50%]"
            />
          </div>
        </div>

        <div className="text-[#369f8b] my-[30px]">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
