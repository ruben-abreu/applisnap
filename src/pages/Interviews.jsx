import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/theme.context';

function Interviews() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="m-[2%] mt-[30px]">
      <h2
        className={`text-[1.4em] font-bold mt-[30px] mb-[10px] ${
          darkMode ? 'text-white' : 'text-[#678B85]'
        }`}
      >
        Interviews
      </h2>
    </div>
  );
}

export default Interviews;
