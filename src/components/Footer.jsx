import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  const handleCreditsClick = () => {
    navigate('/credits');
  };

  return (
    <button
      onClick={handleCreditsClick}
      className="w-[100%] my-[30px] text-center"
    >
      Credits
    </button>
  );
}

export default Footer;
