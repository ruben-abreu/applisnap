import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProviderWrapper = props => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode =
      localStorage.getItem('darkMode') === 'true' ? true : false;
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    const body = document.body;
    body.style.backgroundColor = darkMode ? '#222' : '#fff';
    body.style.color = darkMode ? '#fff' : '#222';

    return () => {
      body.style.backgroundColor = '';
      body.style.color = '';
    };
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProviderWrapper };
