import { useEffect } from 'react';

function Credits({ setCreditsPage }) {
  useEffect(() => {
    setCreditsPage(true);
  }, []);

  return <div>Credits</div>;
}

export default Credits;
