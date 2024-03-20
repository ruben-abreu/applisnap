import { useEffect } from 'react';
import ErrorPageImage from '../assets/ErrorPageImage.png';

function ErrorPage({ setCreditsPage }) {
  useEffect(() => {
    setCreditsPage(false);
  }, []);

  return (
    <div>
      <img
        src={ErrorPageImage}
        alt="Confused Cat"
        className="w-[100%] mx-auto"
      />
    </div>
  );
}

export default ErrorPage;
