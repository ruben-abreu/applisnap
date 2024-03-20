import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/theme.context';

function Footer() {
  const navigate = useNavigate();

  const { darkMode } = useContext(ThemeContext);

  const handleCreditsClick = () => {
    navigate('/credits');
  };

  return (
    <div className="w-full bottom-0 left-0 text-center">
      <button
        onClick={handleCreditsClick}
        className={`mx-auto px-[15px] py-[10px] my-[30px] rounded-md ${
          darkMode ? 'hover:text-black' : 'hover:text-white'
        }  ${darkMode ? 'hover:bg-[#ff8956]' : 'hover:bg-[#f06c35]'} ${
          darkMode ? 'bg-[#525252]' : 'bg-[#eaeaea]'
        } ${
          darkMode ? 'shadow-[#6f6f6f]' : 'shadow-[#cfcfcf]'
        } max-[450px]:text-[0.8em]`}
      >
        Credits
      </button>
    </div>
  );
}

export default Footer;
