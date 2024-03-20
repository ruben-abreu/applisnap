import { useEffect, useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import { Link } from 'react-router-dom';
import FingerprintRoundedIcon from '@mui/icons-material/FingerprintRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Patricia from '../assets/Patrícia.png';
import Ruben from '../assets/Ruben.png';

function Credits({ setCreditsPage }) {
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    setCreditsPage(true);
  }, []);

  return (
    <div className="m-[2%] mt-[30px]">
      <div className="flex items-center gap-[10px]">
        <FingerprintRoundedIcon
          sx={{
            color: darkMode ? 'white' : '#678B85',
            width: '20px',
            height: '20px',
          }}
        />
        <h2
          className={`mr-[10px] text-[1.4em] max-[450px]:text-[1em] font-bold ${
            darkMode ? 'text-white' : 'text-[#678B85]'
          }`}
        >
          Credits
        </h2>
      </div>
      <div
        className={`mt-[40px] mx-auto max-w-[700px] flex justify-center max-[640px]:flex-col max-[640px]:items-center`}
      >
        <div className="text-center w-[50%] max-[640px]:mr-0 max-[640px]:mb-[15px] max-[640px]:w-[95%]">
          <h2
            className={`text-lg font-medium ${
              darkMode ? 'text-white' : 'text-[#678B85]'
            }`}
          >
            Ana Patrícia Gomes
          </h2>
          <img
            src={Patricia}
            alt="Patrícia"
            className="mx-auto w-[100px] mt-[20px] max-[640px]:mt-[15px] max-[640px]:w-[80px]"
          />
          <div className="mt-[30px] max-[640px]:mt-[15px]">
            <a
              href="https://atlasofconquests.netlify.app/country/pt/Portugal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex justify-center items-center gap-[10px]">
                <LocationOnIcon />
                <p>Lisbon, Portugal</p>
              </div>
            </a>
          </div>
          <div className="mt-[30px] max-[640px]:mt-[15px] ">
            <a
              href="https://github.com/anapatriciagomes"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-[70px] max-[250px]:mr-[20px]"
            >
              <GitHubIcon
                sx={{
                  width: '35px',
                  height: '35px',
                }}
                className="hover:translate-y-[-5px]"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/anapatriciagomes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon
                sx={{ width: '35px', height: '35px' }}
                className="hover:translate-y-[-5px]"
              />
            </a>
          </div>
        </div>

        <div className="text-center w-[50%] max-[640px]:ml-0 max-[640px]:mt-[15px] max-[640px]:w-[95%]">
          <h2
            className={`text-lg font-medium ${
              darkMode ? 'text-white' : 'text-[#678B85]'
            }`}
          >
            Ruben Abreu
          </h2>
          <img
            src={Ruben}
            alt="Ruben"
            className="mx-auto w-[100px] mt-[20px] max-[640px]:mt-[15px] max-[640px]:w-[80px]"
          />
          <div className="mt-[30px] max-[640px]:mt-[15px]">
            <a
              href="https://atlasofconquests.netlify.app/country/pt/Portugal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex justify-center items-center gap-[10px]">
                <LocationOnIcon />
                <p>Lisbon, Portugal</p>
              </div>
            </a>
          </div>
          <div className="mt-[30px] max-[640px]:mt-[20px]">
            <a
              href="https://github.com/ruben-abreu"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-[70px] max-[250px]:mr-[20px]"
            >
              <GitHubIcon
                sx={{ width: '35px', height: '35px' }}
                className="hover:translate-y-[-5px]"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/ruben-abreu1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon
                sx={{ width: '35px', height: '35px' }}
                className="hover:translate-y-[-5px]"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Credits;
